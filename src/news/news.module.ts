import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsEntity } from './entity/news.entity';
import FileService from './file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity])],
  controllers: [NewsController],
  providers: [NewsService, FileService],
})
export class NewsModule {}
