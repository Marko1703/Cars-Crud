import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepo.save(createUserDto);
  }

  async findById(id: string) {
    try {
      const foundUser = await this.userRepo.findOneByOrFail({ id });

      return foundUser;
    } catch (error) {
      throw new NotFoundException("User not found!");
    }
  }

  findByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
