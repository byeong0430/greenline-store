import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("token", ["token"], { unique: true })
@Entity("forgotPasswordTokens", { schema: "myhomi" })
export class ForgotPasswordTokens {
  @Column("varchar", { primary: true, name: "userId", length: 100 })
  userId: string;

  @Column("varchar", { primary: true, name: "token", length: 255 })
  token: string;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @ManyToOne(() => Users, (users) => users.forgotPasswordTokens, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;
}
