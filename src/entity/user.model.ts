
import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class User {
  @PrimaryColumn()
  id!: string;
  @Column()
  email!: string; 
  @Column()
  password!: string;
  @Column()
  locations!: string; 
  @Column()
  username!: string;
  @Column()
  profileImage!: string;

}







