import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { RoleEnum } from '../../enums/role.enum';
import { Product } from '../../products/entities/product.entity';
import { UsersJewels } from '../../jewels/entities/users-jewels.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 32 })
  firstName: string;

  @Column({ type: 'varchar', length: 64 })
  lastName: string;

  @Column({ type: 'varchar', length: 128, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  profileImg: string;

  @Column({ type: 'varchar', length: 60, select: false })
  password: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.customer })
  role: RoleEnum;

  @Column({ type: 'integer', default: 0 })
  credits: number;

  @OneToMany(() => UsersJewels, (uj) => uj.user, {
    onDelete: 'CASCADE',
  })
  jewels: UsersJewels[];

  @ManyToMany(() => Product, (product) => product.users, {
    cascade: true,
  })
  @JoinTable()
  products: Product[];

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  async passwordHash() {
    try {
      if (!this.password) {
        return;
      }
      this.password = await bcrypt.hash(this.password, 12);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something went wrong with password hash.');
    }
  }
}
