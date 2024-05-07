import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import { UpdateInsuranceDto } from './dto/update-insurance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsInsurance } from './entities/insurance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(CarsInsurance) private insuranceRepo: Repository<CarsInsurance>,
  ) {}

  async create(createInsuranceDto: CreateInsuranceDto) {
    const insurance = this.insuranceRepo.create(createInsuranceDto);

    return await this.insuranceRepo.save(insurance);
  }

  findAll() {
    return this.insuranceRepo.find({
      relations: {
        car: true,
      }
    });
  }

  async findOne(id: string) {
    try {
      const foundInsurance = await this.insuranceRepo.findOneOrFail({ where: {id}})

      return foundInsurance
    } catch (error) {
      throw new NotFoundException("Insurance not found")
    }
  }

  async update(id: string, updateInsuranceDto: UpdateInsuranceDto) {
    const foundInsurance = await this.findOne(id);

    Object.assign(foundInsurance, updateInsuranceDto, { car: undefined });

    await this.insuranceRepo.save(foundInsurance);
  }

  async remove(id: string) {
    const foundInsurance = await this.findOne(id);

    await this.insuranceRepo.remove(foundInsurance);
  }
}
