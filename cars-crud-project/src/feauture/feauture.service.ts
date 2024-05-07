import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feauture.dto';
import { UpdateFeatureDto } from './dto/update-feauture.dto';
import { FeatureEntity } from './entities/feauture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(FeatureEntity) private featureRepo: Repository<FeatureEntity>,
  ) {}

  async create(createFeatureDto: CreateFeatureDto) {
    const feauture = this.featureRepo.create(createFeatureDto);

    return await this.featureRepo.save(feauture);
  }

  findAll() {
    return this.featureRepo.find({
      relations: {
        cars: true,
      }
    });
  }

  async findOne(id: string) {
    try {
      const foundFeature = await this.featureRepo.findOneOrFail({ where: {id}})

      return foundFeature
    } catch (error) {
      throw new NotFoundException("Feature not found")
    }
  }

  async update(id: string, updateFeatureDto: UpdateFeatureDto) {
    const foundFeature = await this.findOne(id);

    Object.assign(foundFeature, updateFeatureDto, { car: undefined });

    await this.featureRepo.save(foundFeature);
  }

  async remove(id: string) {
    const foundFeature = await this.findOne(id);

    await this.featureRepo.remove(foundFeature);
  }
}
