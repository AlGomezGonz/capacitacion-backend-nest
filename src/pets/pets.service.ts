import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { Human } from 'src/humans/entities/human.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable({})
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  async create(body: CreatePetDto, human: Human) {
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

  async update(id: number, body: UpdatePetDto) {
    const pet = await this.petsRepository.findOne({ where: { id } });
    if (!pet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }
    const newPet = this.petsRepository.merge(pet, body);
    await this.petsRepository.update(id, pet);
    return newPet;
  }

  async remove(id: number) {
    const deletedPet = await this.petsRepository.findOne({ where: { id } });
    if (!deletedPet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }
    await this.petsRepository.delete(id);
    return deletedPet;
  }
}
