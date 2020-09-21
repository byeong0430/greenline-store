import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InventoryAuditBatches } from "./InventoryAuditBatches";
import { InventoryAudit } from "./InventoryAudit";
import { Products } from "./Products";

@Index(
  "inventoryAuditId_and_productId_unique_constraint",
  ["inventoryAuditId", "productId"],
  { unique: true }
)
@Index("productId", ["productId"], {})
@Entity("inventoryAuditProducts", { schema: "myhomi" })
export class InventoryAuditProducts {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "inventoryAuditId", length: 100 })
  inventoryAuditId: string;

  @Column("varchar", { name: "productId", length: 100 })
  productId: string;

  @Column("decimal", {
    name: "expectedQuantity",
    nullable: true,
    precision: 20,
    scale: 4,
  })
  expectedQuantity: string | null;

  @Column("decimal", {
    name: "enteredQuantity",
    nullable: true,
    precision: 20,
    scale: 4,
  })
  enteredQuantity: string | null;

  @Column("mediumtext", { name: "notes", nullable: true })
  notes: string | null;

  @OneToMany(
    () => InventoryAuditBatches,
    (inventoryAuditBatches) => inventoryAuditBatches.inventoryAuditProduct
  )
  inventoryAuditBatches: InventoryAuditBatches[];

  @ManyToOne(
    () => InventoryAudit,
    (inventoryAudit) => inventoryAudit.inventoryAuditProducts,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "inventoryAuditId", referencedColumnName: "id" }])
  inventoryAudit: InventoryAudit;

  @ManyToOne(() => Products, (products) => products.inventoryAuditProducts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;
}
