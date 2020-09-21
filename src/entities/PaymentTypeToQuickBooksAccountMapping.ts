import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Companies } from "./Companies";
import { PaymentTypes } from "./PaymentTypes";

@Index(
  "companyId_and_paymentTypeId_unique_constraint",
  ["companyId", "paymentTypeId"],
  { unique: true }
)
@Index("paymentTypeId", ["paymentTypeId"], {})
@Entity("paymentTypeToQuickBooksAccountMapping", { schema: "myhomi" })
export class PaymentTypeToQuickBooksAccountMapping {
  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("int", { name: "paymentTypeId" })
  paymentTypeId: number;

  @Column("varchar", { name: "debitAccountId", nullable: true, length: 255 })
  debitAccountId: string | null;

  @Column("varchar", { name: "creditAccountId", nullable: true, length: 255 })
  creditAccountId: string | null;

  @ManyToOne(
    () => Companies,
    (companies) => companies.paymentTypeToQuickBooksAccountMappings,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(
    () => PaymentTypes,
    (paymentTypes) => paymentTypes.paymentTypeToQuickBooksAccountMappings,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "paymentTypeId", referencedColumnName: "id" }])
  paymentType: PaymentTypes;
}
