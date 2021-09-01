import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { User } from "./user";

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'longblob'
  })
  photo: string;

  @ManyToOne(type => Category, category => category.products)
  category: Category;

  @ManyToOne(type => User, user => user.products)
  user: User;

}