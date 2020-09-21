import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvoiceLines } from "./InvoiceLines";

@Index("uniqueBatchNumberInInvoiceLine", ["invoiceLineId", "batchNumber"], {
  unique: true,
})
@Entity("invoiceLineBatches", { schema: "myhomi" })
export class InvoiceLineBatches {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumint", { name: "invoiceLineId" })
  invoiceLineId: number;

  @Column("decimal", { name: "quantity", precision: 20, scale: 4 })
  quantity: string;

  @Column("varchar", { name: "batchNumber", length: 255 })
  batchNumber: string;

  @ManyToOne(
    () => InvoiceLines,
    (invoiceLines) => invoiceLines.invoiceLineBatches,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "invoiceLineId", referencedColumnName: "id" }])
  invoiceLine: InvoiceLines;
}
