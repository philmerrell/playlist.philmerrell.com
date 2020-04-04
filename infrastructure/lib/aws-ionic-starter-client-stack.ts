import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as targets from '@aws-cdk/aws-route53-targets';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import { ClientStackProps } from '../bin/client-stack-props';



export class AwsIonicStarterClientStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: ClientStackProps) {
    super(scope, id, props);

    const domain = props.domainName;
    const sslCertArn = props.certArn;

    // this tag gets applied to all resources declared in this construct
    this.node.applyAspect(new cdk.Tag(props.tagKey, props.tagValue));

    // this should use the accountID to perform the lookup so it gets the sand zoneID and not the prod
    const zone = route53.HostedZone.fromLookup(this, 'GetHostedZone', {
      domainName: props.route53ZoneDomainName,
    });

    // creates the site link as a output after the cf template runs
    new cdk.CfnOutput(this, 'Site', {
      value: 'https://' + domain
    });

    // Content bucket for the site - empty
    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      bucketName: domain,
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,

      // The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
      // the new bucket, and it will remain in your account until manually deleted. By setting the policy to
      // DESTROY, cdk destroy will attempt to delete the bucket, but will error if the bucket is not empty.
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });
    new cdk.CfnOutput(this, 'Bucket', { value: siteBucket.bucketName });

    // CloudFront distribution that provides HTTPS
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'SiteDistribution', {
      defaultRootObject: 'index.html',
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      aliasConfiguration: {
        acmCertRef: sslCertArn,
        names: [domain]
      },
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: siteBucket
          },
          behaviors: [{ isDefaultBehavior: true }],
        }
      ],
      errorConfigurations: [
        {
          errorCode: 404,
          errorCachingMinTtl: 300,
          responseCode: 200,
          responsePagePath: '/index.html'
        },
        {
          errorCode: 403,
          errorCachingMinTtl: 300,
          responseCode: 200,
          responsePagePath: '/index.html'
        }
      ]
    });

    new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });

    // Route53 alias record for the CloudFront distribution
    new route53.ARecord(this, 'SiteAliasRecord', {
      recordName: domain,
      target: route53.AddressRecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      zone
    });

    // Deploy site contents to S3 bucket
    new s3Deploy.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [s3Deploy.Source.asset('../client/www')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
    });
  }
}