import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { HumanDecorator } from 'src/decorators/human.decorator';
import { Human } from 'src/humans/entities/human.entity';

@Controller('humans/:id/pets')
export class PetsController {
  constructor(private petsService: PetsService) {}

  @Post()
  create(@Body() body: Pet, @HumanDecorator('human') human: Human) {
    return this.petsService.create(body, human);
  }

  @Get()
  findAll(@HumanDecorator('human') human: Human) {
    return this.petsService.findAll(human);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.petsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.petsService.remove(id);
  }
}
