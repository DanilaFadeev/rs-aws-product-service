import ProductSchema, { Product } from './product.schema';
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

  public async createBulkProducts(productsData: Product[]): Promise<void> {
    await this.dbClient.execute('BEGIN');

    try {
      const productIds = await this.createProducts(productsData);
      await this.createStocks(productIds);

      await this.dbClient.execute('COMMIT');
    } catch (error) {
      await this.dbClient.execute('ROLLBACK');
      throw new Error(error.message);
    }
  }

  private async createProduct(data: Product): Promise<string> {
    const fields = Object.keys(ProductSchema.properties);
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

  private async createProducts(productsData: Product[]): Promise<string[]> {
    const fields = Object.keys(ProductSchema.properties);
    const query = `
      INSERT INTO ${ProductService.table}
        (${fields.map((f) => `"${f}"`).join(", ")})
      VALUES
        ${productsData
          .map(
            (data) => `(${fields.map((f) => val(data[f] as any)).join(", ")})`
          )
          .join(",\n")}
      RETURNING
        "id"
    `;

    const result = await this.dbClient.execute<{ id: string }>(query);
    return result.map(({ id }) => id);
  }

  private async createStock(productId: string, count = 1): Promise<void> {
    const query = `INSERT INTO stocks ("product_id", "count") VALUES ('${productId}', ${count})`;
    await this.dbClient.execute<{ id: string }>(query);
  }

  private async createStocks(productIds: string[], count = 1): Promise<void> {
    const values = productIds.map(productId => `('${productId}', ${count})`);
    const query = `INSERT INTO stocks ("product_id", "count") VALUES ${values.join(', ')}`;

    await this.dbClient.execute<{ id: string }>(query);
  }
}