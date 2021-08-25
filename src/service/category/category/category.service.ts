import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ){}

    findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

}
