import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Companies } from "./Companies";
import { Taxes } from "./Taxes";

@Index("companyId_and_taxId_unique_constraint", ["companyId", "taxId"], {
  unique: true,
})
@Index("taxId", ["taxId"], {})
@Entity("taxToQuickBooksAccountMapping", { schema: "myhomi" })
export class TaxToQuickBooksAccountMapping {
  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("mediumint", { name: "taxId" })
  taxId: number;

  @Column("varchar", { name: "creditAccountId", nullable: true, length: 255 })
  creditAccountId: string | null;

  @ManyToOne(
    () => Companies,
    (companies) => companies.taxToQuickBooksAccountMappings,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => Taxes, (taxes) => taxes.taxToQuickBooksAccountMappings, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "taxId", referencedColumnName: "id" }])
  tax: Taxes;
}
