import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvoiceLineBatches } from "./InvoiceLineBatches";
import { Invoices } from "./Invoices";
import { Products } from "./Products";
import { InvoiceTaxes } from "./InvoiceTaxes";

@Index("invoiceId", ["invoiceId"], {})
@Index("productId", ["productId"], {})
@Entity("invoiceLines", { schema: "myhomi" })
export class InvoiceLines {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "invoiceId", length: 50 })
  invoiceId: string;

  @Column("varchar", { name: "productId", nullable: true, length: 255 })
  productId: string | null;

  @Column("varchar", { name: "productUnit", length: 25 })
  productUnit: string;

  @Column("decimal", { name: "quantity", precision: 20, scale: 4 })
  quantity: string;

  @Column("decimal", {
    name: "quantityReceived",
    nullable: true,
    precision: 20,
    scale: 4,
  })
  quantityReceived: string | null;

  @Column("int", { name: "total" })
  total: number;

  @Column("mediumtext", { name: "notes", nullable: true })
  notes: string | null;

  @Column("varchar", { name: "lot", nullable: true, length: 255 })
  lot: string | null;

  @OneToMany(
    () => InvoiceLineBatches,
    (invoiceLineBatches) => invoiceLineBatches.invoiceLine
  )
  invoiceLineBatches: InvoiceLineBatches[];

  @ManyToOne(() => Invoices, (invoices) => invoices.invoiceLines, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "invoiceId", referencedColumnName: "id" }])
  invoice: Invoices;

  @ManyToOne(() => Products, (products) => products.invoiceLines, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;

  @OneToMany(() => InvoiceTaxes, (invoiceTaxes) => invoiceTaxes.invoiceLine)
  invoiceTaxes: InvoiceTaxes[];
}
