import { Module } from '@nestjs/common';
import { BetsController } from './bets.controller';
import { BetsService } from './bets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetRepository } from './bet.repository';
import { UserRepository } from 'src/auth/user.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([BetRepository, UserRepository]),
    AuthModule
  ],
  controllers: [BetsController],
  providers: [BetsService]
})
export class BetsModule {}
