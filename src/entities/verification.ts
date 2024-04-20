import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'verification' })
export class Verification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id', nullable: true })
    userId: number;

    @Column({ length: 10, nullable: true })
    code: string;

    @Column({ name: 'expiration_time', type: 'datetime', nullable: true })
    expirationTime: Date;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}


