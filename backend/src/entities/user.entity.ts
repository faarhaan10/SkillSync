import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



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
}
