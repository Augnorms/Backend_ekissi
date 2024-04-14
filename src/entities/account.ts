import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Members } from "./members";

@Entity({name:'accounts'})
export class Account{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  date:string;

  @Column()
  name:string;

  @Column()
  amount:number;

  @ManyToOne(()=>Members, member => member.account)
  member:Members;

}