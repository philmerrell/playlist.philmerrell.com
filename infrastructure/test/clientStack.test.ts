#!/usr/bin/env node
import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import Infrastructure = require('../lib/aws-ionic-starter-client-stack');
import { clientStackProps } from '../bin/client-stack-props';


test('Route53 Alias Record Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Infrastructure.AwsIonicStarterClientStack(app, 'MyTestApiStack', clientStackProps);
    // THEN
    expectCDK(stack).to(haveResource("AWS::Route53::RecordSet", {
      Type: 'A'
    }));
});

test('Cloudfront Distribution Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Infrastructure.AwsIonicStarterClientStack(app, 'MyTestApiStack', clientStackProps);
  // THEN
  expectCDK(stack).to(haveResource("AWS::CloudFront::Distribution"));
});
