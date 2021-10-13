import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";
import { User } from "./user";

@Entity()
export class Likes {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Product, product => product.likes, {onDelete: 'CASCADE'}) 
  product: Product;

  @ManyToOne(type => User, user => user.likes, {onDelete: 'CASCADE'}) 
  user: User;

}