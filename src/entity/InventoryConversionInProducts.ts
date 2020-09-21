import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InventoryConversion } from "./InventoryConversion";
import { Products } from "./Products";

@Index("inventoryConversionId", ["inventoryConversionId"], {})
@Index("productId", ["productId"], {})
@Entity("inventoryConversionInProducts", { schema: "myhomi" })
export class InventoryConversionInProducts {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "inventoryConversionId", length: 100 })
  inventoryConversionId: string;

  @Column("varchar", { name: "productId", length: 100 })
  productId: string;

  @Column("decimal", {
    name: "amount",
    nullable: true,
    precision: 20,
    scale: 4,
  })
  amount: string | null;

  @Column("int", { name: "wasteAmount", nullable: true })
  wasteAmount: number | null;

  @Column("decimal", {
    name: "weight",
    nullable: true,
    precision: 20,
    scale: 4,
    default: () => "'0.0000'",
  })
  weight: string | null;

  @ManyToOne(
    () => InventoryConversion,
    (inventoryConversion) => inventoryConversion.inventoryConversionInProducts,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "inventoryConversionId", referencedColumnName: "id" }])
  inventoryConversion: InventoryConversion;

  @ManyToOne(
    () => Products,
    (products) => products.inventoryConversionInProducts,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;
}
