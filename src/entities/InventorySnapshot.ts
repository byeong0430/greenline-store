import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InventoryAudit } from "./InventoryAudit";
import { Companies } from "./Companies";
import { Users } from "./Users";
import { Locations } from "./Locations";
import { InventorySnapshotBatches } from "./InventorySnapshotBatches";
import { InventorySnapshotProducts } from "./InventorySnapshotProducts";

@Index("companyId", ["companyId"], {})
@Index("startingUserId", ["startingUserId"], {})
@Index("locationId", ["locationId"], {})
@Entity("inventorySnapshot", { schema: "myhomi" })
export class InventorySnapshot {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("varchar", { name: "startingUserId", length: 255 })
  startingUserId: string;

  @Column("mediumint", { name: "locationId" })
  locationId: number;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @OneToMany(
    () => InventoryAudit,
    (inventoryAudit) => inventoryAudit.inventorySnapshot
  )
  inventoryAudits: InventoryAudit[];

  @ManyToOne(() => Companies, (companies) => companies.inventorySnapshots, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => Users, (users) => users.inventorySnapshots, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "startingUserId", referencedColumnName: "id" }])
  startingUser: Users;

  @ManyToOne(() => Locations, (locations) => locations.inventorySnapshots, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "locationId", referencedColumnName: "id" }])
  location: Locations;

  @OneToMany(
    () => InventorySnapshotBatches,
    (inventorySnapshotBatches) => inventorySnapshotBatches.inventorySnapshot
  )
  inventorySnapshotBatches: InventorySnapshotBatches[];

  @OneToMany(
    () => InventorySnapshotProducts,
    (inventorySnapshotProducts) => inventorySnapshotProducts.inventorySnapshot
  )
  inventorySnapshotProducts: InventorySnapshotProducts[];
}
