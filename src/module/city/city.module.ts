import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from 'src/controller/city/city.controller';
import { City } from 'src/entity/city';
import { CityService } from 'src/service/city/city.service';

@Module({
    imports: [TypeOrmModule.forFeature([City])],
    controllers: [CityController],
    providers: [CityService],
    exports: [CityService]
})
export class CityModule {}
