import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { InventorySnapshot } from "./InventorySnapshot";
import { Companies } from "./Companies";
import { Locations } from "./Locations";
import { Users } from "./Users";
import { InventoryAuditProducts } from "./InventoryAuditProducts";
import { InventoryLog } from "./InventoryLog";

@Index("companyId", ["companyId"], {})
@Index("locationId", ["locationId"], {})
@Index("startingUserId", ["startingUserId"], {})
@Index("endingUserId", ["endingUserId"], {})
@Index("fk_inventorySnapshot", ["inventorySnapshotId"], {})
@Entity("inventoryAudit", { schema: "myhomi" })
export class InventoryAudit {
  @Column("varchar", { primary: true, name: "id", length: 100 })
  id: string;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("mediumint", { name: "locationId" })
  locationId: number;

  @Column("varchar", { name: "startingUserId", length: 100 })
  startingUserId: string;

  @Column("varchar", { name: "endingUserId", nullable: true, length: 100 })
  endingUserId: string | null;

  @Column("mediumtext", { name: "notes", nullable: true })
  notes: string | null;

  @Column("varchar", { name: "status", length: 50 })
  status: string;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column("datetime", {
    name: "updateDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateDate: Date;

  @Column("datetime", { name: "completeDate", nullable: true })
  completeDate: Date | null;

  @Column("int", { name: "inventorySnapshotId", nullable: true })
  inventorySnapshotId: number | null;

  @Column("varchar", { name: "title", length: 512 })
  title: string;

  @ManyToOne(
    () => InventorySnapshot,
    (inventorySnapshot) => inventorySnapshot.inventoryAudits,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "inventorySnapshotId", referencedColumnName: "id" }])
  inventorySnapshot: InventorySnapshot;

  @ManyToOne(() => Companies, (companies) => companies.inventoryAudits, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => Locations, (locations) => locations.inventoryAudits, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "locationId", referencedColumnName: "id" }])
  location: Locations;

  @ManyToOne(() => Users, (users) => users.inventoryAudits, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "startingUserId", referencedColumnName: "id" }])
  startingUser: Users;

  @ManyToOne(() => Users, (users) => users.inventoryAudits2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "endingUserId", referencedColumnName: "id" }])
  endingUser: Users;

  @OneToMany(
    () => InventoryAuditProducts,
    (inventoryAuditProducts) => inventoryAuditProducts.inventoryAudit
  )
  inventoryAuditProducts: InventoryAuditProducts[];

  @OneToMany(() => InventoryLog, (inventoryLog) => inventoryLog.audit)
  inventoryLogs: InventoryLog[];
}
