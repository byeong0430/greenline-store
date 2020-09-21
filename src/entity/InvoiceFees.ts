import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invoices } from "./Invoices";
import { InvoiceTaxes } from "./InvoiceTaxes";

@Index("invoiceId", ["invoiceId"], {})
@Entity("invoiceFees", { schema: "myhomi" })
export class InvoiceFees {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "invoiceId", length: 50 })
  invoiceId: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "total" })
  total: number;

  @Column("mediumtext", { name: "notes", nullable: true })
  notes: string | null;

  @Column("tinyint", { name: "isTaxEnabled", width: 1, default: () => "'0'" })
  isTaxEnabled: boolean;

  @ManyToOne(() => Invoices, (invoices) => invoices.invoiceFees, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "invoiceId", referencedColumnName: "id" }])
  invoice: Invoices;

  @OneToMany(() => InvoiceTaxes, (invoiceTaxes) => invoiceTaxes.invoiceFee)
  invoiceTaxes: InvoiceTaxes[];
}
