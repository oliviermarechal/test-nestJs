import {PrimaryGeneratedColumn, Column, Entity, ManyToOne} from "typeorm";
import {Todos} from "./todos";

@Entity('elements')
export class Elements {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('boolean')
    done: boolean;

    @ManyToOne(type => Todos, todos => todos.elements)
    todos: Todos
}
