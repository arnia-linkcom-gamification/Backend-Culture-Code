import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { RoleEnum } from 'src/enums/role.enum';

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

  @Column({ type: 'varchar', length: 255, nullable: true })
  profileImg: string;

  @Column({ type: 'varchar', length: 60, select: false })
  password: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.customer })
  role: RoleEnum;

  @Column({ type: 'integer', default: 0 })
  credits: string;

  //   @ManyToMany(() => Jewels, (jewwls) => jewwls.user, {
  //     onDelete: 'CASCADE',
  //   })
  //   @JoinTable()
  //   jewels: Jewels[];

  //   @ManyToMany(() => Products, (products) => products.user, {
  //     onDelete: 'CASCADE',
  //   })
  //   @JoinTable()
  //   products: Products[];

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async passwordHash() {
    try {
      this.password = await bcrypt.hash(this.password, 12);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something went wrong with password hash.');
    }
  }
}
