import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./user.model";
import { ProjectFile } from "./project-file.model";
import { Favourite } from "./favourite.model";

@Entity()
class Project {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({ default: "" })
  image!: string;

  @Column()
  userId!: string;

  @Column({ default: 0 })
  loveEmoji!: number;

  @Column({ default: 0 })
  fireEmoji!: number;

  @Column({ default: 0 })
  smileEmoji!: number;

  @Column({ default: 0 })
  angerEmoji!: number;

  @Column({ default: false })
  isFavourite!: boolean;

  @Column({ default: false })
  isShared!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.project)
  @JoinColumn({ name: "userId" })
  user!: User;

  @OneToMany(() => ProjectFile, (projectFile) => projectFile.project)
  projectFile!: ProjectFile[];

  @OneToMany(() => Favourite, (favourite) => favourite.project)
  favourite!: Favourite[];
}

export { Project };
