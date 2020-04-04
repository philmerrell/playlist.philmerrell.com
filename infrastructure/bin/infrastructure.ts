#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { AwsIonicStarterClientStack } from '../lib/aws-ionic-starter-client-stack';
import { AwsIonicStarterApiStack } from '../lib/aws-ionic-starter-api-stack';
import { clientStackProps } from './client-stack-props';
import { apiStackProps } from './api-stack-props';

const app = new cdk.App();

new AwsIonicStarterClientStack(app, 'AwsIonicStarterClientStack', clientStackProps);
// new AwsIonicStarterApiStack(app, 'AwsIonicStarterApiStack', apiStackProps);