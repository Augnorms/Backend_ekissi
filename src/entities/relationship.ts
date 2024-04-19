import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Members } from "./members";

@Entity({name:'relationship'})
export class Relationship{
    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(() => Members, parent => parent.children)
    parent: Members;

    @ManyToOne(() => Members, child => child.parents)
    child: Members;

}