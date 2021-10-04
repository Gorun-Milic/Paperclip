import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./chat";
import { User } from "./user";


@Entity()
export class Message {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  seen: number;

  @Column({type: "datetime", nullable: true})
  time: string;

  @ManyToOne(type => Chat, chat => chat.messages)
  chat: Chat;

  @ManyToOne(type => User, user => user.messages)
  user: User;

}