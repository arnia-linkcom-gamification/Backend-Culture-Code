//import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  //ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  name: string;
  @Column({ type: 'varchar' })
  description: string;
  @Column({ type: 'integer' })
  price: number;
  @Column({ type: 'varchar', length: 256, nullable: true })
  image: string;
  //   @ManyToMany(() => User, (user) => user.products,{
  //     onDelete: 'CASCADE',
  //   })
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deleteAt: Date;
}
