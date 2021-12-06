import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FbEntity } from './entity/fb.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FbEntity)
    public fbRepository: Repository<FbEntity>,
  ) {}

  public async send(fb: any) {
    await this.fbRepository.save(fb);
    return { feedback: 'Thanks for the feedback!' };
  }
}
