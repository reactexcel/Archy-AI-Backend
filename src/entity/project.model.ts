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

@Entity()
class Project {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  image!: string;

  @Column()
  userId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.project)
  @JoinColumn({ name: "userId" })
  user!: User;

  @OneToMany(() => ProjectFile, projectFile => projectFile.project)
  projectFile!: ProjectFile[];
}

export { Project };
