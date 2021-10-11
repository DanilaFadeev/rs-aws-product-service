export type SQSRecord = {
  messageId: string;
  receiptHandle: string;
  body: string;
  attributes: {
    ApproximateReceiveCount: string;
    SentTimestamp: string;
    SenderId: string;
    ApproximateFirstReceiveTimestamp: string;
  };
  messageAttributes: Record<string, any>;
  md5OfBody: string;
  eventSource: string;
  eventSourceARN: string;
  awsRegion: string;
};

export type S3Record = {
  eventSource: 'aws:s3' | string;
  s3: {
    object: {
      key: string;
      size: number;
    };
  };
};

export type AWSEvent<T> = { Records: T[]; };

export type AWSTokenAuthorizerEvent = {
	type: 'TOKEN',
	methodArn: string,
	authorizationToken: string
};
