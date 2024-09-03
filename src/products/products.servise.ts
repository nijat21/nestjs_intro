import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { uuidv7 as uid } from 'uuidv7';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = uid();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  retrieveProducts() {
    // We are actually returning a reference to the memory
    // return this.products;
    return [...this.products];
  }

  private findProduct(productId: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (prod) => prod.id === productId,
    );
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException(`Couldn't find the product`);
    }
    return [product, productIndex];
  }

  retrieveProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(
    productId: string,
    title?: string,
    desc?: string,
    price?: number,
  ) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = {
      ...product,
      title: title ?? product.title,
      description: desc ?? product.description,
      price: price ?? product.price,
    };
    this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);
  }
}
