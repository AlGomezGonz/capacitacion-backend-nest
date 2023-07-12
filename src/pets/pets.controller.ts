import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { HumanDecorator } from 'src/decorators/human.decorator';
import { Human } from 'src/humans/entities/human.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwtAuth.guard';

@Controller('humans/:id/pets')
export class PetsController {
  constructor(private petsService: PetsService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: Partial<Pet>) {
    return this.petsService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.petsService.remove(id);
  }
}
