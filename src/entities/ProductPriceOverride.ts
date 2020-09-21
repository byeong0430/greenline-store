import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Locations } from "./Locations";
import { Products } from "./Products";

@Index("uniquePricePerLocation", ["productId", "locationId"], { unique: true })
@Index("locationId", ["locationId"], {})
@Entity("productPriceOverride", { schema: "myhomi" })
export class ProductPriceOverride {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumint", { name: "locationId" })
  locationId: number;

  @Column("varchar", { name: "productId", length: 255 })
  productId: string;

  @Column("int", { name: "retailPrice", nullable: true })
  retailPrice: number | null;

  @Column("int", { name: "wholesaleCost", nullable: true })
  wholesaleCost: number | null;

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

  @ManyToOne(() => Locations, (locations) => locations.productPriceOverrides, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "locationId", referencedColumnName: "id" }])
  location: Locations;

  @ManyToOne(() => Products, (products) => products.productPriceOverrides, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;
}
