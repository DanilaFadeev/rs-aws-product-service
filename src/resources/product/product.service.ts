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

  private static readonly table = 'products';

  public async find(): Promise<Product[]> {
    const query = `SELECT * FROM ${ProductService.table} JOIN stocks AS st ON (st.product_id = ${ProductService.table}.id)`;
    return this.dbClient.execute<Product>(query);
  }

  public async findById(id: string): Promise<Product> {
    const query = `SELECT * FROM ${ProductService.table} LEFT JOIN stocks AS st ON (st.product_id = ${ProductService.table}.id) WHERE id='${id}'`;
    const [product] = await this.dbClient.execute<Product>(query);

    return product;
  }

  public async createStockProduct(data: Product): Promise<string> {
    let productId: string;
    await this.dbClient.execute('BEGIN');

    try {
      productId = await this.createProduct(data);
      await this.createStock(productId);

      await this.dbClient.execute('COMMIT');
    } catch (error) {
      console.log(error);

      await this.dbClient.execute('ROLLBACK');
      throw new Error(error.message);
    }

    return productId;
  }

  private async createProduct(data: Product): Promise<string> {
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

  private async createStock(productId: string, count = 1): Promise<void> {
    const query = `INSERT INTO stocks ("product_id", "count") VALUES ('${productId}', ${count})`;
    await this.dbClient.execute<{ id: string }>(query);
  }
}