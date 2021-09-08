import { Client } from 'pg';

export default class DatabaseClient {
  private readonly client: Client;

  constructor() {
    this.client = new Client({
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,

      connectionTimeoutMillis: 2000
    });
  }

  public async connect(): Promise<void> {
    console.log(`Connecting to ${this.client.database} database...`);
    await this.client.connect();
  }

  public async disconnect(): Promise<void> {
    console.log(`Disconnecting from ${this.client.database} database...`);
    await this.client.end();
  }

  public async transaction(fn: (client: Client) => Promise<void>) {
    console.log('hey', fn)
    await this.client.query('BEGIN');
    try {
      console.log(1)
      await fn(this.client);
      console.log(2)
      await this.client.query('COMMIT');
      console.log(3)
    } catch (error) {
      await this.client.query('ROLLBACK');
      throw error;
    }
  }

  public async execute<T = any>(query: string): Promise<T[]> {
    console.log(query);
    const { rows } = await this.client.query(query);
    return rows;
  }
}