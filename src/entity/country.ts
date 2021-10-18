import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./city";
import { User } from "./user";

@Entity()
export class Country {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(type => City, city => city.country) 
  cities: City[];

}