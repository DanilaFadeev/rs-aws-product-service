import type { AWS } from '@serverless/typescript';

import * as functions from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '2',
  useDotenv: true,
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
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: '${env:PG_HOST}',
      PG_PORT: '${env:PG_PORT}',
      PG_USER: '${env:PG_USER}',
      PG_PASSWORD: '${env:PG_PASSWORD}',
      PG_DATABASE: '${env:PG_DATABASE}',
      SNS_CREATE_PRODUCT_TOPIC: {
        Ref: 'createProductTopic'
      }
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
      },
      {
        Effect: 'Allow',
        Action: [
          'SQS:SendMessage'
        ],
        Resource: [
          { 'Fn::GetAtt': ['catalogItemsQueue', 'Arn'] }
        ]
      },
      {
        Effect: 'Allow',
        Action: [
          'SNS:Publish'
        ],
        Resource: [
          { Ref: 'createProductTopic' }
        ]
      }
    ]
  },
  resources: {
    Resources: {
      catalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalog-items-queue'
        }
      },
      createProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'create-product-topic'
        }
      },
      createProductSubscriptionSuccess: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          TopicArn: {
            Ref: 'createProductTopic'
          },
          Protocol: 'email',
          Endpoint: 'demidovich.daniil@gmail.com',
          FilterPolicy: '{ "failedCount": [{ "numeric": ["=", 0] }] }'
        }
      },
      createProductSubscriptionFailed: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          TopicArn: {
            Ref: 'createProductTopic'
          },
          Protocol: 'email',
          Endpoint: 'demidovich.daniil+importfailed@gmail.com',
          FilterPolicy: '{ "failedCount": [{ "numeric": [">", 0] }] }'
        }
      }
    }
  },
  functions
};

module.exports = serverlessConfiguration;
