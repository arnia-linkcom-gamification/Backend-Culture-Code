import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('jewels')
export class Jewel {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 32, unique: true })
  type: string;

  @Column({ type: 'text' })
  habilities: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @ManyToMany(() => User, (user) => user.jewels, {
    onDelete: 'CASCADE',
  })
  users: User[];

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
