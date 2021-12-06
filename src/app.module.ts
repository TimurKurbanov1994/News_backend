import {forwardRef, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { FeedbackModule } from './feedback/feedback.module';
import { JwtModule } from '@nestjs/jwt';
import { S3Module } from 'nestjs-s3';
import {JwtAuthGuard} from "./auth/jwt-auth/jwt-auth";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'secret_key',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    S3Module.forRoot({
      config: {
        accessKeyId: '77Z4NMBLQZWW4XZZ5KDX',
        secretAccessKey: '+zFTJWbY3pc7xPzJMVy+4g5jEBvyNrb8xsyJk/PgPRs',
        endpoint: 'fra1.digitaloceanspaces.com',
        // region: 'fra1',
      },
    }),forwardRef(() => JwtAuthGuard),
    AuthModule,
    NewsModule,
    FeedbackModule,
  ],
})
export class AppModule {}
