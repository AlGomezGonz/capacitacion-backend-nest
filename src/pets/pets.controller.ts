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
import { HumanDecorator } from 'src/decorators/human.decorator';
import { Human } from 'src/humans/entities/human.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwtAuth.guard';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('pets')
@ApiBearerAuth()
@Controller('humans/:id/pets')
export class PetsController {
  constructor(private petsService: PetsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiParam({ name: 'id', type: Number })
  create(@Body() body: CreatePetDto, @HumanDecorator('human') human: Human) {
    return this.petsService.create(body, human);
  }

  @Get()
  @ApiParam({ name: 'id', type: Number })
  findAll(@HumanDecorator('human') human: Human) {
    return this.petsService.findAll(human);
  }

  @Get(':petId')
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('petId') petId: number) {
    return this.petsService.findOne(petId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @Patch(':petId')
  update(@Param('petId') petId: number, @Body() body: UpdatePetDto) {
    return this.petsService.update(petId, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @Delete(':petId')
  remove(@Param('petId') petId: number) {
    return this.petsService.remove(petId);
  }
}
