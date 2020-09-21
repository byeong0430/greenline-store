import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InvoiceTaxes } from "./InvoiceTaxes";
import { TaxLines } from "./TaxLines";
import { TaxPaymentLines } from "./TaxPaymentLines";
import { TaxToQuickBooksAccountMapping } from "./TaxToQuickBooksAccountMapping";

@Entity("taxes", { schema: "myhomi" })
export class Taxes {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("decimal", {
    name: "percent",
    nullable: true,
    precision: 6,
    scale: 4,
  })
  percent: string | null;

  @Column("varchar", { name: "state", nullable: true, length: 100 })
  state: string | null;

  @Column("varchar", { name: "country", length: 50 })
  country: string;

  @Column("tinyint", {
    name: "exemptOverride",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  exemptOverride: boolean | null;

  @OneToMany(() => InvoiceTaxes, (invoiceTaxes) => invoiceTaxes.tax)
  invoiceTaxes: InvoiceTaxes[];

  @OneToMany(() => TaxLines, (taxLines) => taxLines.tax)
  taxLines: TaxLines[];

  @OneToMany(() => TaxPaymentLines, (taxPaymentLines) => taxPaymentLines.tax)
  taxPaymentLines: TaxPaymentLines[];

  @OneToMany(
    () => TaxToQuickBooksAccountMapping,
    (taxToQuickBooksAccountMapping) => taxToQuickBooksAccountMapping.tax
  )
  taxToQuickBooksAccountMappings: TaxToQuickBooksAccountMapping[];
}
