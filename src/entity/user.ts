import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./chat";
import { Comment } from "./comment";
import { Message } from "./message";
import { Notification } from "./notification";
import { Offer } from "./offer";
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

  @OneToMany(type => Chat, chat => chat.user1)
  chats1: Chat[];

  @OneToMany(type => Chat, chat => chat.user2)
  chats2: Chat[];

  @OneToMany(type => Message, message => message.user) 
  messages: Message[];

  @OneToMany(type => Offer, offer => offer.sender)
  senders: Offer[];

  @OneToMany(type => Offer, offer => offer.receiver)
  receivers: Offer[];

}