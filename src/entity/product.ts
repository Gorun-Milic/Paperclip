import { Column, Entity, JoinTable, Like, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { Comment } from "./comment";
import { Likes } from "./likes";
import { Save } from "./save";
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
    type: 'longblob',
    default: null
  })
  photo: string;

  @ManyToOne(type => Category, category => category.products, {
    eager: true,
  })
  category: Category;

  @ManyToOne(type => User, user => user.products)
  user: User;

  @OneToMany(type => Comment, comment => comment.product)
  comments: Comment[];

  @OneToMany(type => Likes, likes => likes.product)
  likes: Likes[];

  @OneToMany(type => Save, saved => saved.user)
  saved: Save[];

}