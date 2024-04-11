import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Members } from "./members";

@Entity({name:'profileimage'})
export class Profileimage{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    image:string;

    @ManyToOne(()=>Members, member => member.profile)
    member:Members;
}