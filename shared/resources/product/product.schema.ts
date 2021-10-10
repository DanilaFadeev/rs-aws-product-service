import type { FromSchema } from 'json-schema-to-ts';

const schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    artists: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1
    },
    coveruri: { type: 'string' },
    type: {
      type: 'string',
      enum: ['single', 'album']
    },
    duration: {
      type: 'number'
    },
    price: {
      type: 'number'
    },
    discount: {
      type: 'number'
    },
    releasedate: {
      type: 'string',
      format: 'date-time'
    },
    genre: {
      type: 'string'
    },
    lyrics: {
      type: 'string'
    }
  },
  required: ['title', 'type', 'artists', 'price']
} as const;

export type Product = FromSchema<typeof schema>;

export enum ProductType {
  Single = 'single',
  Album = 'album'
}

export default schema;
