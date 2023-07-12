import { Injectable } from '@nestjs/common';
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

  async create(body: Pet, human: Human) {
    const newPet = this.petsRepository.create(body);
    newPet.human = human;

    return this.petsRepository.save(newPet);
  }

  async findAll(human: Human) {
    return this.petsRepository.find({
      where: { human: { id: human.id } },
    });
  }

  findOne(id: number) {
    return this.petsRepository.findOne({ where: { id }, relations: ['human'] });
  }

  async update(id: number, body: Partial<Pet>) {
    const pet = await this.petsRepository.findOne({ where: { id } });
    const newPet = this.petsRepository.merge(pet, body);
    await this.petsRepository.update(id, pet);
    return newPet;
  }

  async remove(id: number) {
    const deletedPet = await this.petsRepository.findOne({ where: { id } });
    await this.petsRepository.delete(id);
    return deletedPet;
  }
}
