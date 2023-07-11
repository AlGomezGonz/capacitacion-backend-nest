import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HumansService } from './humans.service';
import { HumansController } from './humans.controller';
import { Human } from './entities/human.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Human])],
  exports: [TypeOrmModule],
  controllers: [HumansController],
  providers: [HumansService],
})
export class HumansModule {}
