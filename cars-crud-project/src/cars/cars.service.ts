import { Injectable, NotFoundException } from '@nestjs/common';
import { CarFilter } from "./interfaces/cars.interface";
import { CreateCarsDto } from "./dtos/create-cars.dto";
import { UpdateCarsDto } from "./dtos/update-cars.dto";
import { Car } from './entities/cars.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import { FeatureEntity } from 'src/feauture/entities/feauture.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private carRepo: Repository<Car>,
  ) {}

  getAllCars(filters: CarFilter) {
    const filterConfig: FindManyOptions<Car> = {};

    console.log(filters);

    if (filters.make) {
      filterConfig.where = { make: filters.make };
    }

    if (filters.model) {
      filterConfig.where = { model: filters.model };
    }

    if (filters.year) {
      filterConfig.where = { year: filters.year };
    }

    console.log(filterConfig);

    filterConfig.relations = ["manufacturer", "insurance", "features"];

    return this.carRepo.find(filterConfig);
  }

  async getCarsFeatures(id: string) {
    const foundCar = await this.carRepo.findOne({
      where: { id },
      relations: {
        features: true,
      }
    })
  }

  async getCarById(id: string) {
    const foundCar = await this.carRepo.findOneBy({ id });

    if (!foundCar) throw new NotFoundException('Car not found');

    return foundCar;
  }

  async getDetails(id: string) {
    try {
      const foundCars = await this.carRepo.findOne({
        where: { id },
      })

      return foundCars;
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }

  async createCar(CreateCarsDto: CreateCarsDto) {
    const car = this.carRepo.create(CreateCarsDto);

    return await this.carRepo.save(car);
  }

  async updateCar(carId: string, updateData: UpdateCarsDto) {
    const foundCars = await this.getCarById(carId);

    Object.assign(foundCars, updateData);

    // const updatedProduct = {...foundProduct, updateData}

    //This will update the product instead of creating a new one becasue we sent a full entity object with id
    await this.carRepo.save(foundCars);
  }

  async createCarFeature(carId: string, featureData: FeatureEntity) {
    const car = await this.carRepo.findOne({ where: { id: carId } });
  
    if (!car) {
      throw new Error(`Car with id ${carId} not found`);
    }

    if (!car.features) {
      car.features = []; // Initialize an empty array if features is undefined
    }
  
    car.features.push(featureData);
    await this.carRepo.save(car);
  
    return car;
  }

  async deleteCar(carId: string) {
    const foundCar = await this.getCarById(carId);

    await this.carRepo.remove(foundCar);
  }

  async deleteCarFeatures(carId: string, featureId: string) {
    const car = await this.carRepo.findOne({ where: {id: carId}, relations: ["features"] });

    if (!car) {
      throw new Error(`Car with id ${carId} not found`);
    }

    const featureIndex = car.features.findIndex(f => f.id === featureId);

    if (featureIndex === -1) {
      throw new Error (`Feature with id ${featureId} not found for car ${carId}`);
    }

    car.features.splice(featureIndex, 1);
    await this.carRepo.save(car);

    return car;
  }
}
