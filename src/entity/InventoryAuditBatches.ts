import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InventoryAuditProducts } from "./InventoryAuditProducts";
import { Batches } from "./Batches";

@Index("inventoryAuditProductId", ["inventoryAuditProductId"], {})
@Index("batchId", ["batchId"], {})
@Entity("inventoryAuditBatches", { schema: "myhomi" })
export class InventoryAuditBatches {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumint", { name: "inventoryAuditProductId" })
  inventoryAuditProductId: number;

  @Column("mediumint", { name: "batchId" })
  batchId: number;

  @Column("decimal", { name: "expectedQuantity", precision: 20, scale: 4 })
  expectedQuantity: string;

  @Column("decimal", {
    name: "enteredQuantity",
    nullable: true,
    precision: 20,
    scale: 4,
  })
  enteredQuantity: string | null;

  @ManyToOne(
    () => InventoryAuditProducts,
    (inventoryAuditProducts) => inventoryAuditProducts.inventoryAuditBatches,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "inventoryAuditProductId", referencedColumnName: "id" }])
  inventoryAuditProduct: InventoryAuditProducts;

  @ManyToOne(() => Batches, (batches) => batches.inventoryAuditBatches, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "batchId", referencedColumnName: "id" }])
  batch: Batches;
}
