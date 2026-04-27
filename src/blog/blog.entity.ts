import {
 Entity,
 PrimaryGeneratedColumn,
 Column
} from "typeorm";

@Entity()
export class Blog {

 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 title: string;

 @Column("text")
 content: string;

 @Column({
   nullable: true
 })
 image: string;

 @Column({
   default: "Draft"
 })
 status: string;
}