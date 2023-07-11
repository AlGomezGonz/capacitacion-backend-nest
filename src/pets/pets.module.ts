import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { HumansModule } from 'src/humans/humans.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), HumansModule],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
