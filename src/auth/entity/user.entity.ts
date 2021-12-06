import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  public email: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  public name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  public password: string;

  @BeforeInsert()
  private async hashPassword(): Promise<void> {
    const hashedPassword = await bcrypt.hash(
      this.password,
      Number(process.env.SALT_ROUNDS),
    );
    this.password = hashedPassword;
  }
}
