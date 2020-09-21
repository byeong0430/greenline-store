import { Column, Entity, OneToMany } from "typeorm";
import { PaymentTypeToQuickBooksAccountMapping } from "./PaymentTypeToQuickBooksAccountMapping";
import { Transactions } from "./Transactions";

@Entity("paymentTypes", { schema: "myhomi" })
export class PaymentTypes {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @OneToMany(
    () => PaymentTypeToQuickBooksAccountMapping,
    (paymentTypeToQuickBooksAccountMapping) =>
      paymentTypeToQuickBooksAccountMapping.paymentType
  )
  paymentTypeToQuickBooksAccountMappings: PaymentTypeToQuickBooksAccountMapping[];

  @OneToMany(() => Transactions, (transactions) => transactions.paymentType)
  transactions: Transactions[];
}
