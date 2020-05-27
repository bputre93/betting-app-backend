import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Bet } from "../bets/bet.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
@PrimaryGeneratedColumn()
id: number;

@Column()
username: string;

@Column()
password: string;

@Column()
email: string;

@Column()
salt: string;

@OneToMany(type => Bet, bet => bet.submitter, {eager: false})
bets_created: Bet[];

@OneToMany(type => Bet, bet => bet.opponent, {eager: false})
bets_accepted: Bet[];

async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
}
}