import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { InventorySnapshot } from "./InventorySnapshot";
import { Products } from "./Products";

@Index("productId", ["productId"], {})
@Entity("inventorySnapshotProducts", { schema: "myhomi" })
export class InventorySnapshotProducts {
  @Column("int", { primary: true, name: "inventorySnapshotId" })
  inventorySnapshotId: number;

  @Column("varchar", { primary: true, name: "productId", length: 255 })
  productId: string;

  @Column("mediumtext", { name: "productName" })
  productName: string;

  @Column("decimal", { name: "quantity", precision: 20, scale: 4 })
  quantity: string;

  @Column("varchar", { name: "unit", length: 20 })
  unit: string;

  @Column("varchar", { name: "sku", nullable: true, length: 255 })
  sku: string | null;

  @Column("int", { name: "purchaseCost", default: () => "'0'" })
  purchaseCost: number;

  @Column("int", { name: "retailPrice", default: () => "'0'" })
  retailPrice: number;

  @ManyToOne(
    () => InventorySnapshot,
    (inventorySnapshot) => inventorySnapshot.inventorySnapshotProducts,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "inventorySnapshotId", referencedColumnName: "id" }])
  inventorySnapshot: InventorySnapshot;

  @ManyToOne(() => Products, (products) => products.inventorySnapshotProducts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;
}
