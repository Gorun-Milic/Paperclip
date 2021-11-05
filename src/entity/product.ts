import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { Comment } from "./comment";
import { Likes } from "./likes";
import { Notification } from "./notification";
import { Offer } from "./offer";
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

  @Column({type: "datetime", nullable: true})
  createdAt: string;

  @ManyToOne(type => Category, category => category.products, {
    eager: true,
  })
  category: Category;

  @ManyToOne(type => User, user => user.products, {
    eager: true
  })
  user: User;

  @OneToMany(type => Comment, comment => comment.product)
  comments: Comment[];

  @OneToMany(type => Likes, likes => likes.product)
  likes: Likes[];

  @OneToMany(type => Save, saved => saved.user)
  saved: Save[];

  @OneToMany(type => Notification, notification => notification.product)
  notifications: Notification[];

  @OneToMany(type => Offer, offer => offer.offeredProduct)
  offeredInOffers: Offer[];

  @OneToMany(type => Offer, offer => offer.receivedProduct)
  receivedInOffers: Offer[];

  // @ManyToMany(type => Offer, offer => offer.products) 
  // offers: Offer[];

}