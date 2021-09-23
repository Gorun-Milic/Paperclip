import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaveController } from 'src/controller/save/save.controller';
import { Save } from 'src/entity/save';
import { SaveService } from 'src/service/save/save.service';

@Module({
    imports: [TypeOrmModule.forFeature([Save])],
    controllers: [SaveController],
    providers: [SaveService],
    exports: [SaveService]
})
export class SaveModule {}
