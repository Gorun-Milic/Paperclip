import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";
import { User } from "./user";

@Entity()
export class Notification {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  seen: number;

  @Column()
  type: string;

  @Column({ nullable: false, type: 'date' })
  date: Date;

  @ManyToOne(type => Product, product => product.notifications, {
    eager: true
  }) 
  product: Product;

  @ManyToOne(type => User, user => user.notifications) 
  user: User;

}