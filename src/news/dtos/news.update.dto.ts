import { IsString, NotEquals, IsOptional, IsNotEmpty } from 'class-validator';

import { NewsStatus } from '../type/news.status';

export class NewsUpdateDto {
  @IsNotEmpty()
  @IsString()
  public id!: string;

  @IsOptional()
  public title?: string;

  @IsOptional()
  public description?: string;

  @IsOptional()
  @NotEquals(NewsStatus[NewsStatus.Publish])
  public status?: NewsStatus;

  @IsOptional()
  public text?: string;
}
