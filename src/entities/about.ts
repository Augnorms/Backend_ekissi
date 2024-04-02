import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity({name:"about"})
export class About{
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ type: "text" })
   history:string;
}