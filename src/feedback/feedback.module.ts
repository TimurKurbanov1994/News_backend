import {forwardRef, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { FbEntity } from './entity/fb.entity';
import { JwtModule } from '@nestjs/jwt';
import {JwtAuthGuard} from "../auth/jwt-auth/jwt-auth";

@Module({
  imports: [
    TypeOrmModule.forFeature([FbEntity]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'secret_key',
      signOptions: {
        expiresIn: '24h',
      },
    }),forwardRef(() => JwtAuthGuard)
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
