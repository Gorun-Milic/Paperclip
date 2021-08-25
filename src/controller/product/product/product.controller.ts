import { Body, Controller, Post } from '@nestjs/common';
import { Product } from 'src/entity/product';
import { ProductService } from 'src/service/product/product/product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post()
    async registration(@Body() product: Product): Promise<Product> {
        return await this.productService.addProduct(product);
    }

}
