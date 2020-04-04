import * as cdk from '@aws-cdk/core';


export interface ClientStackProps extends cdk.StackProps {
    certArn: string;
    domainName: string;
    route53ZoneDomainName: string;
    tagKey: string;
    tagValue: string;
}
