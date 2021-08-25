import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @OneToMany(type => Product, product => product.user) 
  products: Product[];
  
}