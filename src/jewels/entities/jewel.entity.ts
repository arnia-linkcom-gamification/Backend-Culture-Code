import { JewelTypeEnum } from '../../enums/jewel-type.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersJewels } from './users-jewels.entity';

@Entity('jewels')
export class Jewel {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'enum', enum: JewelTypeEnum, unique: true })
  type: JewelTypeEnum;

  @Column({ type: 'text' })
  habilities: string;

  @Column({ type: 'varchar' })
  image: string;

  @OneToMany(() => UsersJewels, (uj) => uj.jewel, {
    onDelete: 'CASCADE',
  })
  users: UsersJewels[];

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
