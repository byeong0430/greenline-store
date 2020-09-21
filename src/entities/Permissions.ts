import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SecurityRoles } from "./SecurityRoles";

@Index("parentPermissionId", ["parentPermissionId"], {})
@Entity("permissions", { schema: "myhomi" })
export class Permissions {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumtext", { name: "name" })
  name: string;

  @Column("mediumtext", { name: "description", nullable: true })
  description: string | null;

  @Column("mediumint", { name: "parentPermissionId", nullable: true })
  parentPermissionId: number | null;

  @Column("int", { name: "indexOrder", nullable: true })
  indexOrder: number | null;

  @ManyToOne(() => Permissions, (permissions) => permissions.permissions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "parentPermissionId", referencedColumnName: "id" }])
  parentPermission: Permissions;

  @OneToMany(() => Permissions, (permissions) => permissions.parentPermission)
  permissions: Permissions[];

  @ManyToMany(() => SecurityRoles, (securityRoles) => securityRoles.permissions)
  securityRoles: SecurityRoles[];
}
