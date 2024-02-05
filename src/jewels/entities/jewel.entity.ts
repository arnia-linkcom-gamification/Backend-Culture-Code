import { JewelTypeEnum } from '../../enums/jewel-type.enum';
import { User } from '../../users/entities/user.entity';
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

  @Column({ type: 'enum', enum: JewelTypeEnum, unique: true })
  type: JewelTypeEnum;

  @Column({ type: 'text' })
  habilities: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
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
