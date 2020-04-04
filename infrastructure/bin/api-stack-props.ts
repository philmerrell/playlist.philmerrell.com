import * as cdk from '@aws-cdk/core';

export interface ApiStackProps extends cdk.StackProps {
  apiDomainName: string;
  certArn: string;
  clientDomainName: string;
  cognitoCallbackRoute: string;
  cognitoClientId: string;
  cognitoDomain: string;
  cognitoLogoutRoute: string;
  route53ZoneDomainName: string;
  tagKey: string;
  tagValue: string;
}

export const apiStackProps = {
  env: {
    account: '878042393904',
    region: 'us-west-2'
  },
  stackName: 'AwsIonicStarterApiStack',
  description: 'A stack for hosting the client side assets.',
  certArn: 'arn:aws:acm:us-east-1:878042393904:certificate/56a74ab7-e2f4-4da2-88ed-d6e832ad0946',
  clientDomainName: 'starter.philmerrell.com',
  cognitoDomain: 'auth-starter',
  cognitoCallbackRoute: '/callback',
  cognitoClientId: '2vqrk0fshi0u41aolc7ve9jvp8',
  cognitoLogoutRoute: '/logout',
  apiDomainName: 'starter-api.philmerrell.com',
  route53ZoneDomainName: 'philmerrell.com',
  tagKey: 'Stack',
  tagValue: 'Aws-Starter-Api-Stack'
}