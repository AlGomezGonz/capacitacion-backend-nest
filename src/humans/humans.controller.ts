import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HumansService } from './humans.service';
import { Human } from './entities/human.entity';
import { HumanDecorator } from 'src/decorators/human.decorator';
import { CreateHumanDto } from './dto/create-human.dto';
import { UpdateHumanDto } from './dto/update-human.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('humans')
@Controller('humans')
export class HumansController {
  constructor(private humansService: HumansService) {}

  @Post()
  create(@Body() body: CreateHumanDto) {
    return this.humansService.create(body);
  }

  @Get()
  findAll() {
    return this.humansService.findAll();
  }

  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  findOne(@HumanDecorator('human') human: Human) {
    return human;
  }

  @ApiParam({ name: 'id', type: Number })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body: UpdateHumanDto,
    @HumanDecorator('human') human: Human,
  ) {
    return this.humansService.update(id, body, human);
  }

  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  remove(@Param('id') id: number, @HumanDecorator('human') human: Human) {
    return this.humansService.remove(id, human);
  }
}
