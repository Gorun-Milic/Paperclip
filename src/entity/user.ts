import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment";
import { Notification } from "./notification";
import { Product } from "./product";
import { Save } from "./save";

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

  @OneToMany(type => Save, saved => saved.user)
  saved: Save[];

  @OneToMany(type => Notification, notification => notification.user)
  notifications: Notification[];

}