import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Companies } from "./Companies";
import { Locations } from "./Locations";
import { Products } from "./Products";

@Index("companyId", ["companyId"], {})
@Index("locationId", ["locationId"], {})
@Index("productId", ["productId"], {})
@Entity("expenses", { schema: "myhomi" })
export class Expenses {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("mediumint", { name: "locationId", nullable: true })
  locationId: number | null;

  @Column("varchar", { name: "expenseType", length: 50 })
  expenseType: string;

  @Column("int", { name: "totalCost" })
  totalCost: number;

  @Column("varchar", { name: "productId", nullable: true, length: 255 })
  productId: string | null;

  @Column("decimal", {
    name: "productPurchaseQuantity",
    nullable: true,
    precision: 20,
    scale: 4,
  })
  productPurchaseQuantity: string | null;

  @Column("mediumtext", { name: "notes", nullable: true })
  notes: string | null;

  @Column("mediumint", { name: "supplierId", nullable: true })
  supplierId: number | null;

  @ManyToOne(() => Companies, (companies) => companies.expenses, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => Locations, (locations) => locations.expenses, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "locationId", referencedColumnName: "id" }])
  location: Locations;

  @ManyToOne(() => Products, (products) => products.expenses, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;
}
