import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Entities } from "./Entities";
import { Users } from "./Users";
import { SecurityRoles } from "./SecurityRoles";

@Index("userId", ["userId"], {})
@Index("securityRoleId", ["securityRoleId"], {})
@Entity("entityUsers", { schema: "myhomi" })
export class EntityUsers {
  @Column("mediumint", { primary: true, name: "entityId" })
  entityId: number;

  @Column("varchar", { primary: true, name: "userId", length: 255 })
  userId: string;

  @Column("mediumint", { name: "securityRoleId", nullable: true })
  securityRoleId: number | null;

  @ManyToOne(() => Entities, (entities) => entities.entityUsers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "entityId", referencedColumnName: "id" }])
  entity: Entities;

  @ManyToOne(() => Users, (users) => users.entityUsers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(
    () => SecurityRoles,
    (securityRoles) => securityRoles.entityUsers,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "securityRoleId", referencedColumnName: "id" }])
  securityRole: SecurityRoles;
}
