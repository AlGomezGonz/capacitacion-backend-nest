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

@Controller('humans/:id/pets')
export class PetsController {
  constructor(private petsService: PetsService) {}

  @Post()
  create(@Body() body: Pet, @Param('id') human_id: number) {
    return this.petsService.create(body, human_id);
  }

  @Get()
  findAll(@Param('id') human_id: number) {
    return this.petsService.findAll(human_id);
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
