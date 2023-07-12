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

@Controller('humans')
export class HumansController {
  constructor(private humansService: HumansService) {}

  @Post()
  create(@Body() body: Human) {
    return this.humansService.create(body);
  }

  @Get()
  findAll() {
    return this.humansService.findAll();
  }

  @Get(':id')
  findOne(@HumanDecorator('human') human: Human) {
    return human;
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body,
    @HumanDecorator('human') human: Human,
  ) {
    return this.humansService.update(id, body, human);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @HumanDecorator('human') human: Human) {
    return this.humansService.remove(id, human);
  }
}
