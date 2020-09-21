import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Products } from "./Products";
import { Locations } from "./Locations";

@Index("locationId", ["locationId"], {})
@Entity("inventory", { schema: "myhomi" })
export class Inventory {
  @Column("varchar", { primary: true, name: "productId", length: 255 })
  productId: string;

  @Column("mediumint", { primary: true, name: "locationId" })
  locationId: number;

  @Column("decimal", { name: "quantity", precision: 20, scale: 4 })
  quantity: string;

  @Column("int", { name: "priceOverride", nullable: true })
  priceOverride: number | null;

  @Column("datetime", {
    name: "updateDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateDate: Date;

  @Column("tinyint", { name: "isHidden", width: 1, default: () => "'0'" })
  isHidden: boolean;

  @Column("decimal", {
    name: "lowStockQuantity",
    nullable: true,
    precision: 20,
    scale: 4,
  })
  lowStockQuantity: string | null;

  @Column("decimal", {
    name: "restockQuantity",
    nullable: true,
    precision: 20,
    scale: 4,
  })
  restockQuantity: string | null;

  @Column("datetime", { name: "leaflySyncDate", nullable: true })
  leaflySyncDate: Date | null;

  @ManyToOne(() => Products, (products) => products.inventories, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;

  @ManyToOne(() => Locations, (locations) => locations.inventories, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "locationId", referencedColumnName: "id" }])
  location: Locations;
}
