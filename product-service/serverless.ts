import type { AWS } from '@serverless/typescript';
import documentation from './serverless.doc';
import * as functions from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    documentation
  },
  plugins: [
    'serverless-webpack',
    '@conqa/serverless-openapi-documentation'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    memorySize: 256,
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
          FilterPolicy: '{ "isFailed": ["False"] }] }'
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
          FilterPolicy: '{ "isFailed": ["True"] }'
        }
      }
    }
  },
  // variables from ".env" files will be automatically loaded into the serverless build process
  useDotenv: true,
  functions
};

module.exports = serverlessConfiguration;
