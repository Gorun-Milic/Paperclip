import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";
import { User } from "./user";

@Entity()
export class Offer {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  seen: number;

  @Column({type: "datetime", nullable: true})
  time: string;

  @ManyToOne(type => User, sender => sender.senders) 
  sender: User;

  @ManyToOne(type => User, receiver => receiver.receivers) 
  receiver: User;

  @ManyToOne(type => Product, product => product.offeredInOffers)
  offeredProduct: Product;

  @ManyToOne(type => Product, product => product.receivedInOffers) 
  receivedProduct: Product;

  // @ManyToMany(type => Product, product => product.offers) 
  // @JoinTable()
  // products: Product[];

}