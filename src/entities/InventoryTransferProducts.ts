import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InventoryTransfer } from "./InventoryTransfer";
import { Products } from "./Products";

@Index("inventoryTransferId", ["inventoryTransferId"], {})
@Index("productId", ["productId"], {})
@Entity("inventoryTransferProducts", { schema: "myhomi" })
export class InventoryTransferProducts {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "inventoryTransferId", length: 100 })
  inventoryTransferId: string;

  @Column("varchar", { name: "productId", length: 100 })
  productId: string;

  @Column("decimal", {
    name: "quantity",
    nullable: true,
    precision: 20,
    scale: 4,
  })
  quantity: string | null;

  @Column("decimal", {
    name: "receivedQuantity",
    nullable: true,
    precision: 20,
    scale: 4,
  })
  receivedQuantity: string | null;

  @ManyToOne(
    () => InventoryTransfer,
    (inventoryTransfer) => inventoryTransfer.inventoryTransferProducts,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "inventoryTransferId", referencedColumnName: "id" }])
  inventoryTransfer: InventoryTransfer;

  @ManyToOne(() => Products, (products) => products.inventoryTransferProducts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;
}
