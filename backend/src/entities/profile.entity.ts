import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Profile {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    
    @Column({ nullable: true })
    bio!: string;

    @Column({ nullable: true })
    avatarUrl!: string;

    @Column({
        type:"jsonb",
        nullable: true,
        default:[]
    })
    skills!: {
        name:string,
        level:'beginner' | 'intermediate' | 'advanced' | 'expert'
    }[];

    @OneToOne(()=>User, (user)=>user.profile)
    user!:User
}
