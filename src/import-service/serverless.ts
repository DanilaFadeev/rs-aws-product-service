import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/import-products-file';
import importFileParser from '@functions/import-file-parser';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          's3:GetObject',
          's3:PutObject',
          's3:DeleteObject'
        ],
        Resource: [
          'arn:aws:s3:::rs-import-service/uploaded/*',
          'arn:aws:s3:::rs-import-service/parsed/*'
        ]
      }
    ]
  },
  functions: {
    importProductsFile,
    importFileParser
  }
};

module.exports = serverlessConfiguration;
