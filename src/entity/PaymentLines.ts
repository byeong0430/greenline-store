import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Batches } from "./Batches";
import { Discounts } from "./Discounts";
import { Products } from "./Products";
import { Payments } from "./Payments";
import { TaxPaymentLines } from "./TaxPaymentLines";

@Index("productId", ["productId"], {})
@Index("paymentId", ["paymentId"], {})
@Index("fk_paymentLineDiscounts", ["discountId"], {})
@Index(
  "paymentLines_paymentId_price_discounts_purchaseCost",
  ["paymentId", "price", "discountPrice", "cartDiscountPrice", "purchaseCost"],
  {}
)
@Index("fk_paymentLineBatch", ["batchId"], {})
@Entity("paymentLines", { schema: "myhomi" })
export class PaymentLines {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "productId", nullable: true, length: 255 })
  productId: string | null;

  @Column("varchar", { name: "paymentId", length: 255 })
  paymentId: string;

  @Column("varchar", { name: "productName", length: 255 })
  productName: string;

  @Column("decimal", { name: "units", precision: 20, scale: 4 })
  units: string;

  @Column("mediumint", { name: "price" })
  price: number;

  @Column("mediumint", { name: "taxPrice", default: () => "'0'" })
  taxPrice: number;

  @Column("int", { name: "discountPrice", default: () => "'0'" })
  discountPrice: number;

  @Column("varchar", { name: "discountMessage", nullable: true, length: 255 })
  discountMessage: string | null;

  @Column("varchar", { name: "type", length: 20 })
  type: string;

  @Column("mediumint", { name: "discountId", nullable: true })
  discountId: number | null;

  @Column("varchar", { name: "unit", nullable: true, length: 50 })
  unit: string | null;

  @Column("decimal", {
    name: "inventorySubtracted",
    nullable: true,
    precision: 20,
    scale: 4,
  })
  inventorySubtracted: string | null;

  @Column("int", { name: "cartDiscountPrice", default: () => "'0'" })
  cartDiscountPrice: number;

  @Column("int", { name: "purchaseCost", default: () => "'0'" })
  purchaseCost: number;

  @Column("varchar", { name: "barcode", nullable: true, length: 100 })
  barcode: string | null;

  @Column("mediumtext", { name: "shortDescription", nullable: true })
  shortDescription: string | null;

  @Column("mediumint", { name: "batchId", nullable: true })
  batchId: number | null;

  @Column("varchar", { name: "sku", nullable: true, length: 255 })
  sku: string | null;

  @Column("int", { name: "depositFee", nullable: true })
  depositFee: number | null;

  @ManyToOne(() => Batches, (batches) => batches.paymentLines, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "batchId", referencedColumnName: "id" }])
  batch: Batches;

  @ManyToOne(() => Discounts, (discounts) => discounts.paymentLines, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "discountId", referencedColumnName: "id" }])
  discount: Discounts;

  @ManyToOne(() => Products, (products) => products.paymentLines, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;

  @ManyToOne(() => Payments, (payments) => payments.paymentLines, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "paymentId", referencedColumnName: "id" }])
  payment: Payments;

  @OneToMany(
    () => TaxPaymentLines,
    (taxPaymentLines) => taxPaymentLines.paymentLine
  )
  taxPaymentLines: TaxPaymentLines[];
}
