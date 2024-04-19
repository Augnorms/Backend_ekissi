import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Members } from "./members";

@Entity({name:'relationship'})
export class Relationship{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    parent_id:number;

    @Column()
    child_id:number;

    @ManyToOne(()=>Members, member=>member.relation)
    member:Members
}