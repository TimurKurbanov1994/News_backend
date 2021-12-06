import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { NewsService } from './news.service';
import { NewsPostDto } from './dtos/news.post.dto';
import { NewsEntity } from './entity/news.entity';
import { NewsUpdateDto } from './dtos/news.update.dto';



@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('post')
  @UseInterceptors(FileInterceptor('file'))
  public async postNews(
    @Body() news: NewsPostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.newsService.postNews(news, file.buffer);
  }

  @Get('get')
  public async getAllNews(): Promise<NewsEntity[]> {
    return this.newsService.getAll();
  }

  @Put('update')
  @UseInterceptors(FileInterceptor('file'))
  public async updatePost(
    @Body() body: NewsUpdateDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.newsService.updatePost(body, file?.buffer);
  }

  @Delete('delete/:id')
  public async removePost(@Param() id: string): Promise<any> {
    return this.newsService.deletePost(id);
  }
}
