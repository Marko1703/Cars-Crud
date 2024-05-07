import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
  } from "typeorm";
  import { Car } from "src/cars/entities/cars.entity";

@Entity()
export class FeatureEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    name: string;
  
    @Column({ nullable: true })
    description: string;
  
    @ManyToMany(() => Car, (car) => car.features)
    @JoinTable()
    cars: Car[];  
}
