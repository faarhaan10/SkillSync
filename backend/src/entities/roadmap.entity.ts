import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";



@Entity()
export class Roadmap {
 
    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @Column()
    title!:string;
    
    @Column()
    description!:string;

   @ManyToOne(()=> User, (user)=> user.roadmaps)
    user!: User;
    
}