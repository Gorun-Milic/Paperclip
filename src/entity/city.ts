import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./country";
import { User } from "./user";

@Entity()
export class City {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(type => Country, country => country.cities, {
    eager: true
  })
  country: Country;

  @OneToMany(type => User, user => user.city) 
  users: User[];

}