import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:"user"})
export class User{
 @PrimaryGeneratedColumn('uuid')
 id:number;

 @Column('text')
 firstName:string;

 @Column('text')
 lastName:string;

 @Column('int')
 age:string;

 @Column('boolean')
 role:boolean;

}