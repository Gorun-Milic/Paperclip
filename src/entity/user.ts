import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment";
import { Product } from "./product";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;  

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  zipcode: string;

  @Column({
    type: 'longblob',
    default: null
  })
  photo: string;

  @OneToMany(type => Product, product => product.user) 
  products: Product[];

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(type => Comment, likes => likes.user)
  likes: Comment[];

  
}