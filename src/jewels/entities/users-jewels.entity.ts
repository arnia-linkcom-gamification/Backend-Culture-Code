import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Jewel } from './jewel.entity';

@Entity('users_jewels')
export class UsersJewels {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => User, (user) => user.jewels, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Jewel, (jewel) => jewel.users, {
    onDelete: 'CASCADE',
  })
  jewel: Jewel;
}
