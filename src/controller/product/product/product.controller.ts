import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from 'src/dto/productDto';
import { UserDto } from 'src/dto/UserDto';
import { Product } from 'src/entity/product';
import { User } from 'src/entity/user';
import { ProductService } from 'src/service/product/product/product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('photo'))
    uploadSingleFileWithPost(@UploadedFile() photo, @Body() body) {
        console.log(photo);
        console.log(body.product);
        let product = JSON.parse(body.product);
        this.productService.addProduct(product, photo);
        // console.log(photo);
        // console.log(body.product);
    }

    @Post('productsOfUser')
    async productsOfUser(@Body() user: UserDto): Promise<ProductDto[]> {
        console.log(user.firstName);
        return await this.productService.productsOfUser(user);
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<ProductDto> {
        return await this.productService.findOne(id);
    }

}
