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
  findOne(@Param('id') id: number) {
    return this.humansService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.humansService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.humansService.remove(id);
  }
}
