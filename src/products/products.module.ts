import { Module } from '@nestjs/common';
import { ProductController } from './prducts.controller';
import { ProductService } from './products.servise';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}
