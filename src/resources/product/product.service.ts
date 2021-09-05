import { Product } from './product.schema';
import { products } from './product.mock';

export default class ProductService {
  static async find(): Promise<Product[]> {
    return products;
  }

  static async findById(id: string): Promise<Product> {
    return products.find(product => product.id === id);
  }
}