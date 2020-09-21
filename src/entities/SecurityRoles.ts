import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EntityUsers } from "./EntityUsers";
import { Permissions } from "./Permissions";
import { Companies } from "./Companies";

@Index("companyId", ["companyId"], {})
@Entity("securityRoles", { schema: "myhomi" })
export class SecurityRoles {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("mediumtext", { name: "name" })
  name: string;

  @Column("mediumtext", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(() => EntityUsers, (entityUsers) => entityUsers.securityRole)
  entityUsers: EntityUsers[];

  @ManyToMany(() => Permissions, (permissions) => permissions.securityRoles)
  @JoinTable({
    name: "securityRolePermissions",
    joinColumns: [{ name: "securityRoleId", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "permissionId", referencedColumnName: "id" }],
    schema: "myhomi",
  })
  permissions: Permissions[];

  @ManyToOne(() => Companies, (companies) => companies.securityRoles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;
}
