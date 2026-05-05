import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user'})
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'name' })
  name!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column({ name: 'password'})
  password!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;
}
