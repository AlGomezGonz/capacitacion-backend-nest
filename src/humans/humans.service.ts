import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Human } from './entities/human.entity';

@Injectable()
export class HumansService {
  constructor(
    @InjectRepository(Human) private humansRepository: Repository<Human>,
  ) {}

  create(body: Human) {
    const human = this.humansRepository.create(body);
    return this.humansRepository.save(human);
  }

  findAll() {
    return this.humansRepository.find({ relations: ['pets'] });
  }

  async update(id: number, body: Human, human: Human) {
    const newHuman = this.humansRepository.merge(human, body);
    await this.humansRepository.update(id, newHuman);
    return newHuman;
  }

  async remove(id: number, human: Human) {
    await this.humansRepository.delete(id);
    return human;
  }
}
