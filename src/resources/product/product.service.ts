import { Product } from './product.schema';
import DatabaseClient from '../../libs/DatabaseClient';

const val = (value: string | number | Array<string>): string => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'undefined') {
    return 'NULL';
  }
  if (Array.isArray(value)) {
    return `'{${(value as Array<string> || []).join(', ')}}'`;
  }
  return value.toString();
}

export default class ProductService {
  constructor(
    private readonly dbClient: DatabaseClient
  ) {}

  static readonly table = 'products';

  async find(): Promise<Product[]> {
    const query = `SELECT * FROM ${ProductService.table} JOIN stocks AS st ON (st.product_id = ${ProductService.table}.id)`;
    return this.dbClient.execute<Product>(query);
  }

  async findById(id: string): Promise<Product> {
    const query = `SELECT * FROM ${ProductService.table} WHERE id='${id}'`;
    const [product] = await this.dbClient.execute<Product>(query);

    return product;
  }

  async create(data: Product): Promise<string> {
    const fields = ['title', 'artists', 'coveruri', 'type', 'duration', 'price', 'discount', 'releasedate', 'genre', 'lyrics'];
    const query = `
      INSERT INTO ${ProductService.table}
        (${fields.map(f => `"${f}"`).join(', ')})
      VALUES
        (${fields.map(f => val(data[f] as any)).join(', ')})
      RETURNING
        "id"
    `;

    const [{ id }] = await this.dbClient.execute<{ id: string }>(query);
    return id;
  }

  async createStock(productId: string, count = 0): Promise<void> { // TODO move out
    const query = `INSERT INTO stocks ("product_id", "count") VALUES ('${productId}', ${count})`;
    await this.dbClient.execute<{ id: string }>(query);
  }
}