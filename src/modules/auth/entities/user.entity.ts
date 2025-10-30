import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "varchar"})
  name: string;

  @Column({ type: "varchar"})
  email: string;

  @Column({ type: "varchar"})
  password: string;

  @Column({ type: "varchar", name: "fcm_token", nullable: true })
  fcmToken: string;
}
