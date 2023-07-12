import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { Human } from 'src/humans/entities/human.entity';
import { Repository } from 'typeorm';

@Injectable()
export class humanMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Human) private humansRepository: Repository<Human>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const human = await this.humansRepository.findOne({
      where: { id: +req.params.id },
    });

    if (!human) {
      throw new NotFoundException('Human not found');
    }

    res.locals.human = human;

    next();
  }
}
