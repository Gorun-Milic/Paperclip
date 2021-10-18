import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/entity/city';
import { Country } from 'src/entity/country';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) {}

    async findCities(countryName: string): Promise<City[]> {
        const res = await this.cityRepository.find({
            where: {
                country: {
                    name: countryName
                }
            },
            relations: ['country']
        });
        if (!res) {
            throw new HttpException(
                ExceptionMessageEnum.NO_CITY,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            return res;
        }
    }

}
