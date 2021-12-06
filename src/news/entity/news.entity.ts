import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { NewsStatus } from '../type/news.status';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'text',
  })
  public title: string;

  @Column({
    type: 'text',
  })
  public description: string;

  @Column({
    type: 'enum',
    enum: NewsStatus,
    default: NewsStatus.Publish,
  })
  public status: string;

  @Column({
    type: 'text',
  })
  public text: string;

  @Column({
    type: 'text',
  })
  public link: string;

  @Column({
    type: 'datetime',
  })
  public date: Date;
}
