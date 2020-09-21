import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PaymentLines } from "./PaymentLines";
import { Products } from "./Products";
import { Payments } from "./Payments";
import { Taxes } from "./Taxes";

@Index("paymentId", ["paymentId"], {})
@Index("taxId", ["taxId"], {})
@Index("fk_taxProduct", ["productId"], {})
@Index("fk_taxPaymentLine", ["paymentLineId"], {})
@Index(
  "taxPaymentLines_paymentId_taxId_amount",
  ["paymentId", "taxId", "amount"],
  {}
)
@Entity("taxPaymentLines", { schema: "myhomi" })
export class TaxPaymentLines {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "paymentId", length: 255 })
  paymentId: string;

  @Column("mediumint", { name: "taxId" })
  taxId: number;

  @Column("decimal", {
    name: "amount",
    nullable: true,
    precision: 20,
    scale: 4,
  })
  amount: string | null;

  @Column("varchar", { name: "productId", nullable: true, length: 255 })
  productId: string | null;

  @Column("mediumint", { name: "paymentLineId", nullable: true })
  paymentLineId: number | null;

  @Column("int", { name: "paymentLineIndex", nullable: true })
  paymentLineIndex: number | null;

  @ManyToOne(
    () => PaymentLines,
    (paymentLines) => paymentLines.taxPaymentLines,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "paymentLineId", referencedColumnName: "id" }])
  paymentLine: PaymentLines;

  @ManyToOne(() => Products, (products) => products.taxPaymentLines, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;

  @ManyToOne(() => Payments, (payments) => payments.taxPaymentLines, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "paymentId", referencedColumnName: "id" }])
  payment: Payments;

  @ManyToOne(() => Taxes, (taxes) => taxes.taxPaymentLines, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "taxId", referencedColumnName: "id" }])
  tax: Taxes;
}
