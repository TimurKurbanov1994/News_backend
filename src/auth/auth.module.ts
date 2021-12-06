import {forwardRef, Module} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entity/user.entity';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtAuthGuard} from "./jwt-auth/jwt-auth";

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'secret_key',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'secret_key',
      signOptions: {
        expiresIn: '24h',
      },
    }), forwardRef(() => JwtAuthGuard),
  ],
})
export class AuthModule {}
