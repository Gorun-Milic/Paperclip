import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message";
import { User } from "./user";

@Entity()
export class Chat {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user1NotSeen: number;

  @Column()
  user2NotSeen: number;

  @ManyToOne(type => User, user => user.chats1) 
  user1: User;

  @ManyToOne(type => User, user => user.chats2) 
  user2: User;

  @OneToMany(type => Message, message => message.chat) 
  messages: Message[];

}