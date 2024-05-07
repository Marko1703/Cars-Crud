import { Car } from "src/cars/entities/cars.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class CarsInsurance {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    policyNumber: string;

    @Column()
    provider: string;

    @Column()
    coverageDetails: string;

    @OneToOne(() => Car, (car) => car.insurance, {
        onDelete: "CASCADE",
    })

    @JoinColumn()
    car: Car;
}