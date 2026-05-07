import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Roadmap } from "./roadmap.entity";



@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    email: string
    
    @Column({ select: false }) // Password will not be returned in API responses
    password!: string

    // This is a "Virtual Column" - it exists in your code but not in the DB
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }


    @OneToOne(()=> Profile, (profile)=> profile.user,{cascade:true})
    @JoinColumn()
    profile!: Profile;


    @OneToMany(()=> Roadmap, (roadmap)=> roadmap.user,{cascade:true})
    roadmaps!: Roadmap[];  
}
