import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { AWSTokenAuthorizerEvent } from '../../../../shared/types';

const basicAuthorizer = async (event: AWSTokenAuthorizerEvent) => {
	console.log(event);

	let username, password;
	try {
		const token = (event.authorizationToken.match(/^Basic\s(.*)$/) || []).slice(-1)[0];
		console.log(`Injected token: ${token}`);

		const decodedToken = Buffer.from(token, 'base64').toString('utf8');
		console.log(`Decoded token: ${decodedToken}`);

		[username, password] = decodedToken.split(':');
	} catch (error) {
		console.error(error.message);
	}

	const effect = (username && process.env[username] === password) ? 'Allow' : 'Deny';
  return generatePolicy('user', effect, event.methodArn);
}

// Help function to generate an IAM policy
const generatePolicy = (principalId: string, effect: 'Allow' | 'Deny', resource: string) =>
	({
		principalId,
		policyDocument: {
			Version: '2012-10-17',
			Statement: [{
				Action: 'execute-api:Invoke',
				Effect: effect,
				Resource: resource
			}]
		}
	});

export const main = middyfy(basicAuthorizer);
