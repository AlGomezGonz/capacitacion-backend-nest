import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { Human } from 'src/humans/entities/human.entity';

@Injectable({})
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    @InjectRepository(Human) private humansRepository: Repository<Human>,
  ) {}

  async create(body: Pet, human_id: number) {
    const human = await this.humansRepository.findOne({
      where: { id: human_id },
    });

    if (!human) {
      throw new NotFoundException('Human not found');
    }

    const newPet = this.petsRepository.create(body);
    newPet.human = human;

    return this.petsRepository.save(newPet);
  }

  async findAll(human_id: number) {
    const human = await this.humansRepository.findOne({
      where: { id: human_id },
    });
    if (!human) {
      throw new NotFoundException('Human not found');
    }
    return this.petsRepository.find({
      where: { human: { id: human_id } },
    });
  }

  findOne(id: number) {
    return this.petsRepository.findOne({ where: { id }, relations: ['human'] });
  }

  async update(id: number, body: Pet) {
    const pet = await this.petsRepository.findOne({ where: { id } });
    this.petsRepository.merge(pet, body);

    return this.petsRepository.update(id, pet);
  }

  async remove(id: number) {
    const deletedPet = await this.petsRepository.findOne({ where: { id } });
    await this.petsRepository.delete(id);
    return deletedPet;
  }
}
