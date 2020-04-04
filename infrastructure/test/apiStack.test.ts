#!/usr/bin/env node
import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import Infrastructure = require('../lib/aws-ionic-starter-api-stack');
import { apiStackProps } from '../bin/api-stack-props';

test('Lambda Function Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Infrastructure.AwsIonicStarterApiStack(app, 'MyTestApiStack', apiStackProps);
    // THEN
    expectCDK(stack).to(haveResource("AWS::Lambda::Function"));
});

test('Api Gateway Rest Api Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Infrastructure.AwsIonicStarterApiStack(app, 'MyTestApiStack', apiStackProps);
  // THEN
  expectCDK(stack).to(haveResource("AWS::ApiGateway::RestApi"));
});
