import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/entity/country';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {

    constructor(
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
    ) {}

    async findCountries(): Promise<Country[]> {
        const res = await this.countryRepository.find();
        if (!res) {
            throw new HttpException(
                ExceptionMessageEnum.NO_COUNTRIES,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            return res;
        }
    }

}
