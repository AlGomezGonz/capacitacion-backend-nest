import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    const human = await this.humansRepository.findOne({
      where: { id },
      relations: ['pets'],
    });
    if (!human) {
      throw new NotFoundException('Human not found');
    }
    return human;
  }

  async update(id: number, body: Human) {
    const human = await this.humansRepository.findOne({ where: { id } });
    this.humansRepository.merge(human, body);
    return this.humansRepository.update(id, human);
  }

  async remove(id: number) {
    const deletedHuman = this.humansRepository.findOne({ where: { id } });
    await this.humansRepository.delete(id);
    return deletedHuman;
  }
}
