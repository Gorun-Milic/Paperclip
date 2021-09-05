import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";
import { User } from "./user";

@Entity()
export class Comment {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column({ nullable: false, type: 'date' })
  date: Date;

  @ManyToOne(type => Product, product => product.comments) 
  product: Product;

  @ManyToOne(type => User, user => user.comments) 
  user: User;

}