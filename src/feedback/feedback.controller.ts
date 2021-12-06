import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { FeedbackService } from './feedback.service';
import { FbDto } from './dtos/fb.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth';


@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedService: FeedbackService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  public async postNews(@Body() fb: FbDto): Promise<object> {
    return this.feedService.send(fb);
  }
}
