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
      S3_IMPORT_SERVICE_BUCKET: 'rs-import-service',
      SQS_CATALOG_ITEMS_QUEUE: 'https://sqs.eu-west-1.amazonaws.com/734757367619/catalog-items-queue'
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
        Resource: 'arn:aws:sqs:eu-west-1:734757367619:catalog-items-queue'
      }
    ]
  },
	resources: {
		Resources: {
			GatewayResponseDefault4XX: {
				Type: 'AWS::ApiGateway::GatewayResponse',
				Properties: {
					ResponseParameters: {
						'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
						'gatewayresponse.header.Access-Control-Allow-Headers': "'*'"
					},
					ResponseType: 'DEFAULT_4XX',
					RestApiId: {
						Ref: 'ApiGatewayRestApi'
					}
				}
			}
		}
	},
  functions
};

module.exports = serverlessConfiguration;
