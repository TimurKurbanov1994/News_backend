import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NewsEntity } from './entity/news.entity';
import { NewsPostDto } from './dtos/news.post.dto';
import { NewsUpdateDto } from './dtos/news.update.dto';
import FileService from './file/file.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    public newsRepository: Repository<NewsEntity>,
  ) {}

  public async postNews(news: NewsPostDto, imageFile: Buffer) {
    const { title } = news;
    const candidate = await this.newsRepository.findOne({
      where: [{ title }],
    });
    if (candidate) {
      throw new BadRequestException('The title is existed');
    }
    const link = await NewsService.createLink(news.title);
    const newsCreate = this.newsRepository.create({
      ...news,
      link,
      date: new Date(),
    });
    const uploadImage = await new FileService().uploadImage(imageFile, title);
    console.log(uploadImage);
    const postNews = await this.newsRepository.save(newsCreate);
    return { postNews, uploadImage };
  }

  public async getAll(): Promise<any> {
    return this.newsRepository.find();
  }

  public async updatePost(news: NewsUpdateDto, imageFile?: Buffer) {
    const { id, title } = news;
    const postId = await this.newsRepository.findOne({
      where: [{ id }],
    });
    if (!Boolean(postId)) {
      throw new BadRequestException('This post doesnt exist');
    }
    if (title && !imageFile) {
      await new FileService().changeName(postId.title, title);
      postId.link = await NewsService.createLink(title);
    }
    const updatedNews = await this.newsRepository.save({ ...postId, ...news });
    if (imageFile) {
      await new FileService().deleteImage(postId.title);
      const uploadImage = await new FileService().uploadImage(imageFile, title);
      return { updatedNews, uploadImage };
    } else {
      return updatedNews;
    }
  }

  public async deletePost(id: string) {
    const postId = await this.newsRepository.findOne(id);
    if (!Boolean(postId)) {
      throw new BadRequestException('This post doesnt exist');
    }
    const deleteImage = await new FileService().deleteImage(postId.title);
    await this.newsRepository.delete(id);
    return { post: 'Deleted' && deleteImage };
  }

  private static async createLink(newsTitle) {
    return `https://${process.env.LINK}:${process.env.PORT}/news/${newsTitle
      .replace(/ /g, '_')
      .toLowerCase()}`;
  }
}
