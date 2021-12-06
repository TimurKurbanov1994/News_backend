import { IsString, NotEquals } from 'class-validator';

import { NewsStatus } from '../type/news.status';

export class NewsPostDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @NotEquals(NewsStatus[NewsStatus.Publish])
  public status: NewsStatus;

  @IsString()
  public text: string;
}
