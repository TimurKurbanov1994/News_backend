import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fb')
export class FbEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'text',
  })
  public email: string;

  @Column({
    type: 'text',
  })
  public text: string;
}
