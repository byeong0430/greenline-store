import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Locations } from "./Locations";
import { Products } from "./Products";
import { InventoryAuditBatches } from "./InventoryAuditBatches";
import { InventorySnapshotBatches } from "./InventorySnapshotBatches";
import { PaymentLines } from "./PaymentLines";
import { TransferBatches } from "./TransferBatches";

@Index(
  "uniqueBatchNumberLocationIdAndProductId",
  ["batchNumber", "locationId", "productId"],
  { unique: true }
)
@Index("fk_batchesLocationId", ["locationId"], {})
@Index("fk_batchesProductId", ["productId"], {})
@Entity("batches", { schema: "myhomi" })
export class Batches {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "batchNumber", length: 255 })
  batchNumber: string;

  @Column("decimal", { name: "quantityRemaining", precision: 20, scale: 4 })
  quantityRemaining: string;

  @Column("mediumint", { name: "locationId", nullable: true })
  locationId: number | null;

  @Column("varchar", { name: "productId", nullable: true, length: 255 })
  productId: string | null;

  @Column("varchar", { name: "status", length: 255 })
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

  @ManyToOne(() => Locations, (locations) => locations.batches, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "locationId", referencedColumnName: "id" }])
  location: Locations;

  @ManyToOne(() => Products, (products) => products.batches, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;

  @OneToMany(
    () => InventoryAuditBatches,
    (inventoryAuditBatches) => inventoryAuditBatches.batch
  )
  inventoryAuditBatches: InventoryAuditBatches[];

  @OneToMany(
    () => InventorySnapshotBatches,
    (inventorySnapshotBatches) => inventorySnapshotBatches.batch
  )
  inventorySnapshotBatches: InventorySnapshotBatches[];

  @OneToMany(() => PaymentLines, (paymentLines) => paymentLines.batch)
  paymentLines: PaymentLines[];

  @OneToMany(() => TransferBatches, (transferBatches) => transferBatches.batch)
  transferBatches: TransferBatches[];
}
