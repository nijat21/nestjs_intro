import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './products.servise';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  addProduct(
    @Body() completeBody: { title: string; description: string; price: number },
  ) {
    const generatedId = this.productService.insertProduct(
      completeBody.title,
      completeBody.description,
      completeBody.price,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productService.retrieveProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.retrieveProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDecription: string,
    @Body('price') prodPrice: number,
  ) {
    this.productService.updateProduct(
      prodId,
      prodTitle,
      prodDecription,
      prodPrice,
    );
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this.productService.deleteProduct(prodId);
    return null;
  }
}
