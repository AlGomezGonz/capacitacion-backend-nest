import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  finOne(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
