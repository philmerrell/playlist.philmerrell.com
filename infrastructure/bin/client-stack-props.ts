import * as cdk from '@aws-cdk/core';


export interface ClientStackProps extends cdk.StackProps {
    certArn: string;
    domainName: string;
    route53ZoneDomainName: string;
    tagKey: string;
    tagValue: string;
}


export const clientStackProps = {
    env: {
        account: '878042393904',
        region: 'us-west-2'
    },
    stackName: 'AwsIonicStarterClientStack',
    description: 'A stack for hosting the client side assets.',
    certArn: 'arn:aws:acm:us-east-1:878042393904:certificate/56a74ab7-e2f4-4da2-88ed-d6e832ad0946',
    domainName: 'starter.philmerrell.com',
    route53ZoneDomainName: 'philmerrell.com',
    tagKey: 'Stack',
    tagValue: 'AWS-Ionic-Starter-Client'
}