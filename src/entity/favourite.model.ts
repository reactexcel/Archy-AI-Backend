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

import { Project } from "./project.model";
  
  @Entity()
  class Favourite {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column()
    projectId!: string;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;

  
    @ManyToOne(() => Project, (project) => project.favourite)
    @JoinColumn({ name: "projectId" })
    project!: Project;
  }
  
  export { Favourite };
  