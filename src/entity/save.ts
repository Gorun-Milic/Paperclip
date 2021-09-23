import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";
import { User } from "./user";

@Entity()
export class Save {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Product, product => product.saved) 
  product: Product;

  @ManyToOne(type => User, user => user.saved) 
  user: User;

}