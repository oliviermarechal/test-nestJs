import {PrimaryGeneratedColumn, Column, Entity, ManyToOne} from "typeorm";
import {Users} from "../../../users/domain/entities/users";

/**
 * Class Customers
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
@Entity('customers')
export class Customers
{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    email: string;

    @ManyToOne(type => Users, users => users.customers)
    user: Users;

    @Column('text')
    phoneNumber?: string;

    @Column('text')
    siret?: string;
}