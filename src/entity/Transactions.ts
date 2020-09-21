import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MerrcoTransactions } from "./MerrcoTransactions";
import { Payments } from "./Payments";
import { PaymentTypes } from "./PaymentTypes";

@Index("FK_paymentTypeId", ["paymentTypeId"], {})
@Index("FK_paymentId", ["paymentId"], {})
@Index(
  "transactions_paymentId_paymentTypeId_amount",
  ["paymentId", "paymentTypeId", "amount"],
  {}
)
@Entity("transactions", { schema: "myhomi" })
export class Transactions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "paymentId", length: 255 })
  paymentId: string;

  @Column("int", { name: "amount", default: () => "'0'" })
  amount: number;

  @Column("varchar", { name: "status", length: 50 })
  status: string;

  @Column("int", { name: "paymentTypeId" })
  paymentTypeId: number;

  @Column("datetime", { name: "completeDate", nullable: true })
  completeDate: Date | null;

  @Column("varchar", { name: "terminalInvoiceId", nullable: true, length: 55 })
  terminalInvoiceId: string | null;

  @Column("mediumtext", { name: "metadata", nullable: true })
  metadata: string | null;

  @OneToMany(
    () => MerrcoTransactions,
    (merrcoTransactions) => merrcoTransactions.transaction
  )
  merrcoTransactions: MerrcoTransactions[];

  @ManyToOne(() => Payments, (payments) => payments.transactions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "paymentId", referencedColumnName: "id" }])
  payment: Payments;

  @ManyToOne(() => PaymentTypes, (paymentTypes) => paymentTypes.transactions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "paymentTypeId", referencedColumnName: "id" }])
  paymentType: PaymentTypes;
}
