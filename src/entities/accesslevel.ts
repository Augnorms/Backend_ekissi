import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from "typeorm";

interface UserData {
    id: number;
    name: string;
}

@Entity({ name: 'accesslevel' })
export class AccessLevel {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    accesslevelname: string; // Assuming access level name is a string

    @Column()
    accessleveldescription: string;

    @Column({ default: false }) // Assuming the default value for these properties is false
    AccesslevelView: boolean;

    @Column({ default: false })
    AccesslevelManage: boolean;

    @Column({ default: false })
    UserverificationView: boolean;

    @Column({ default: false })
    UserverificationManage: boolean;

    @Column({ default: false })
    AddmembersView: boolean;

    @Column({ default: false })
    AddmembersManage: boolean;

    @Column({ default: false })
    ManageaboutView: boolean;

    @Column({ default: false })
    ManageaboutViewManage: boolean;

    @Column({ default: false })
    ManagegalleryView: boolean;

    @Column({ default: false })
    ManagegalleryManage: boolean;

    @Column({ default: false })
    ManageaccountView: boolean;

    @Column({ default: false })
    ManageaccountManage: boolean;

    @Column({ default: false })
    ManagebioView: boolean;

    @Column({ default: false })
    ManagebioManage: boolean;

   @Column({ type: 'json' }) 
    users: UserData[];  
}
