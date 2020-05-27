import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
export class Bet extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    amount: number;

    @Column({
        type: "enum",
        enum: [
            "PENDING",
            "ACCEPTED",
            "COMPLETED",
            "CANCELLED"
        ]
    })
    status: string;

    @ManyToOne(type => User, user => user.bets_created, {eager: true})
    submitter: User;

    @ManyToOne(type => User, user => user.bets_accepted, {eager: true})
    opponent: User;

    @Column()
    submitterToWin: number;

    @Column()
    opponentToWin: number;

    @Column()
    createdAt: Date;

    @Column({nullable: true})
    acceptedAt: Date;

    @Column({nullable: true})
    completedAt: Date;

    @Column({nullable: true})
    cancelledAt: Date;


}