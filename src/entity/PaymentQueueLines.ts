import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { PaymentQueues } from "./PaymentQueues";

@Index("paymentQueueId", ["paymentQueueId"], {})
@Entity("paymentQueueLines", { schema: "myhomi" })
export class PaymentQueueLines {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("mediumint", { name: "paymentQueueId" })
  paymentQueueId: number;

  @Column("mediumint", { name: "discountId", nullable: true })
  discountId: number | null;

  @Column("mediumint", { name: "discountPrice", nullable: true })
  discountPrice: number | null;

  @Column("mediumint", { name: "discountPercentage", nullable: true })
  discountPercentage: number | null;

  @Column("varchar", { name: "discountMessage", nullable: true, length: 255 })
  discountMessage: string | null;

  @Column("mediumint", {
    name: "bulkPricePerInventorySubtracted",
    nullable: true,
  })
  bulkPricePerInventorySubtracted: number | null;

  @Column("varchar", { name: "productId", nullable: true, length: 255 })
  productId: string | null;

  @Column("mediumint", { name: "quantity", nullable: true })
  quantity: number | null;

  @Column("tinyint", { name: "barcodeScanned", nullable: true, width: 1 })
  barcodeScanned: boolean | null;

  @Column("int", { name: "price", nullable: true })
  price: number | null;

  @ManyToOne(
    () => PaymentQueues,
    (paymentQueues) => paymentQueues.paymentQueueLines,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "paymentQueueId", referencedColumnName: "id" }])
  paymentQueue: PaymentQueues;
}
