import * as cdk from '@aws-cdk/core';

export interface ApiStackProps extends cdk.StackProps {
  apiDomainName: string;
  certArn: string;
  clientDomainName: string;
  cognitoCallbackRoute: string;
  cognitoClientId: string;
  cognitoDomain: string;
  cognitoLogoutRoute: string;
  route53ARecordName: string;
  route53ZoneDomainName: string;
  tagKey: string;
  tagValue: string;
}
