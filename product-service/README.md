# Serverless - Product service

Product service API build with AWS API Gateway and AWS Lambda.

## Deployment
| Environment | Url |
| --- | --- |
| Development | https://oxgr1oja31.execute-api.eu-west-1.amazonaws.com/dev |

## Routes
| Lambda Function | Path | Method | Description |
| --- | --- | --- | --- |
| getProductsList | [/products](https://oxgr1oja31.execute-api.eu-west-1.amazonaws.com/dev/products) | `GET` | List of products |
| getProductsById | [/products/:id](https://oxgr1oja31.execute-api.eu-west-1.amazonaws.com/dev/products/1) | `GET` | Product by id |

For more details see the [Swagger Definition](./swagger.yml).

## Installation / Deployment

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`, Yarn package manager

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn deploy` to deploy this stack to AWS

## Running Locally

### Locally

In order to test the hello function locally, run the following command:

```bash
yarn invoke:local:product:list # local invocation of getProductsList
yarn invoke:local:product:get # local invocation of getProductsById
```

## Test your service

There are unit tests in the current repo, that are done using Jest testing framework.

```bash
yarn test
```

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas
- `resources` - containing domain resources of the services

```
.
├── src
│   ├── functions                    # Lambda configuration and source code folder
│   │   ├── hello
|   |   |   ├── __tests__           
|   |   |   |   └── handler.test.ts  # `Hello` lambda handler unit tests
│   │   │   ├── handler.ts           # `Hello` lambda source code
│   │   │   ├── index.ts             # `Hello` lambda Serverless configuration
│   │   │   ├── mock.json            # `Hello` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts            # `Hello` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts                 # Import/export of all lambda configuration
|   |
|   ├── resources                    # Domain resources
│   |   └── hello
│   |       ├── hello.mock.ts        # `Hello` resource mock data
│   |       ├── hello.schema.ts      # `Hello` resource schema and typings
│   |       └── hello.service.ts     # `Hello` resource service
|   |
│   └── libs                         # Lambda shared code
│       └── apiGateway.ts            # API Gateway specific helpers
│       └── handlerResolver.ts       # Sharable library for resolving lambda handlers
│       └── lambda.ts                # Lambda middleware
│
├── package.json
├── swagger.yml                      # Swagger definition for service API
├── serverless.ts                    # Serverless service file
├── tsconfig.json                    # Typescript compiler configuration
├── tsconfig.paths.json              # Typescript paths
└── webpack.config.js                # Webpack configuration
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

