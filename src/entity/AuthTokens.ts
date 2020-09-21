import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("token", ["token"], { unique: true })
@Entity("authTokens", { schema: "myhomi" })
export class AuthTokens {
  @Column("varchar", { primary: true, name: "userId", length: 100 })
  userId: string;

  @Column("varchar", { primary: true, name: "token", length: 255 })
  token: string;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column("varchar", { name: "ipAddress", nullable: true, length: 100 })
  ipAddress: string | null;

  @ManyToOne(() => Users, (users) => users.authTokens, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;
}
