import { CarsInsurance } from 'src/insurance/entities/insurance.entity';
import { Manufacturer } from 'src/manufacturer/entities/manufacturer.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import { FeatureEntity } from 'src/feauture/entities/feauture.entity';

@Entity()
export class Car {
  // Primary generated column is the main column of the table and this will create ids in ascending order for every new row starting from 1
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.cars)
  @JoinColumn({ name: ' manufacturerID '})
  manufacturer: Manufacturer;
  
  @OneToOne(() => CarsInsurance, (insurance) => insurance.car)
  insurance: CarsInsurance;

  @ManyToMany(() => FeatureEntity, (feature) => feature.cars)
  @JoinColumn({ name: ' featureID '})
  features: FeatureEntity[];
}