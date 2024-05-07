import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manufacturer } from './entities/manufacturer.entity';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(@InjectRepository(Manufacturer) private manufacturerRepo: Repository<Manufacturer>) {}

  createManufacturer(createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturerRepo.save(createManufacturerDto);
  }

  getAllManufacturers() {
    return this.manufacturerRepo.find({
      relations: {
        cars: true,
      }
    });
  }

  async getManufacturerById(id: string) {
    try {
      const foundManufacturer = await this.manufacturerRepo.findOneByOrFail({ id })

      return foundManufacturer
    } catch (error) {
      throw new NotFoundException("Manufacturer not found");
    }
  }

  async updateManufacturer(id: string, updateManufacturerDto: UpdateManufacturerDto) {
    const foundManufacturer = await this.getManufacturerById(id);

    Object.assign(foundManufacturer, updateManufacturerDto);

    console.log(updateManufacturerDto);

    console.log(foundManufacturer);

    await this.manufacturerRepo.save(foundManufacturer);
  }

  async removeManufacturer(id: string) {
    const foundManufacturer = await this.getManufacturerById(id);

    await this.manufacturerRepo.remove(foundManufacturer);
  }
}
