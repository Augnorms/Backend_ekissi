import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:'members'})
export class Members{
    @PrimaryGeneratedColumn("uuid")
    id:number;

    @Column()
    firstname:string;

    @Column()
    lastname:string;

    @Column()
    email:string;

    @Column()
    password:string

    @Column()
    gender:string;

    @Column()
    dateofbirth:string;

    @Column()
    placeofbirth:string;

     @Column({ type: 'text', nullable: true })
    occupation: string;

    @Column()
    nationality:string

    @Column()
    phonenumber:string

    @Column()
    mothersname:string;

    @Column()
    fathersname:string;

    @Column()
    maritalstatus:string;

    @Column()
    numberofchildren:number

    @Column()
    primaryeducation:string;

    @Column()
    secondaryeducation:string;

    @Column()
    tertiaryeducation:string;

    @Column()
    hometown:string;
}
