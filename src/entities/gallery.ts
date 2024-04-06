import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:"gallery"})
export class Gallery{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    filename:string;

    @Column()
    fileurl:string;

    @Column()
    fileoriginalname:string;

    @Column()
    resourcetype:string;
}