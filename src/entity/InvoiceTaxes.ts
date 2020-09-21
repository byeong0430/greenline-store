import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InvoiceLines } from "./InvoiceLines";
import { InvoiceFees } from "./InvoiceFees";
import { Taxes } from "./Taxes";

@Index("invoiceLineId", ["invoiceLineId"], {})
@Index("invoiceFeeId", ["invoiceFeeId"], {})
@Index("taxId", ["taxId"], {})
@Entity("invoiceTaxes", { schema: "myhomi" })
export class InvoiceTaxes {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumint", { name: "invoiceLineId", nullable: true })
  invoiceLineId: number | null;

  @Column("mediumint", { name: "invoiceFeeId", nullable: true })
  invoiceFeeId: number | null;

  @Column("decimal", {
    name: "amount",
    nullable: true,
    precision: 38,
    scale: 2,
  })
  amount: string | null;

  @Column("mediumint", { name: "taxId" })
  taxId: number;

  @ManyToOne(() => InvoiceLines, (invoiceLines) => invoiceLines.invoiceTaxes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "invoiceLineId", referencedColumnName: "id" }])
  invoiceLine: InvoiceLines;

  @ManyToOne(() => InvoiceFees, (invoiceFees) => invoiceFees.invoiceTaxes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "invoiceFeeId", referencedColumnName: "id" }])
  invoiceFee: InvoiceFees;

  @ManyToOne(() => Taxes, (taxes) => taxes.invoiceTaxes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "taxId", referencedColumnName: "id" }])
  tax: Taxes;
}
