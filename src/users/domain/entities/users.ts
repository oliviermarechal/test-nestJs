import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Customers} from "../../../customers/domain/entities/customers.entity";
import { Exclude } from 'class-transformer';


@Entity()
@Unique(['email'])
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string

    @OneToMany(type => Customers, customers => customers.user)
    customers: Customers[]
}
