import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne } from "typeorm";
import {Elements} from "./elements";
import {Users} from "../../../users/domain/entities/users";

@Entity('todos')
export class Todos {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @OneToMany(type => Elements, element => element.todos)
    elements: Element[]

    @ManyToOne(type => Users)
    user: Users
}
