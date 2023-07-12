import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(data) {
    return await this.usersRepository.save(data).then((res) => res);
  }

  finOne(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}