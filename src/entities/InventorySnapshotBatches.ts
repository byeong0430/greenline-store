import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { InventorySnapshot } from "./InventorySnapshot";
import { Products } from "./Products";
import { Batches } from "./Batches";

@Index("productId", ["productId"], {})
@Index("batchId", ["batchId"], {})
@Entity("inventorySnapshotBatches", { schema: "myhomi" })
export class InventorySnapshotBatches {
  @Column("int", { primary: true, name: "inventorySnapshotId" })
  inventorySnapshotId: number;

  @Column("varchar", { primary: true, name: "productId", length: 255 })
  productId: string;

  @Column("mediumint", { primary: true, name: "batchId" })
  batchId: number;

  @Column("decimal", { name: "quantityRemaining", precision: 20, scale: 4 })
  quantityRemaining: string;

  @ManyToOne(
    () => InventorySnapshot,
    (inventorySnapshot) => inventorySnapshot.inventorySnapshotBatches,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "inventorySnapshotId", referencedColumnName: "id" }])
  inventorySnapshot: InventorySnapshot;

  @ManyToOne(() => Products, (products) => products.inventorySnapshotBatches, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;

  @ManyToOne(() => Batches, (batches) => batches.inventorySnapshotBatches, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "batchId", referencedColumnName: "id" }])
  batch: Batches;
}
