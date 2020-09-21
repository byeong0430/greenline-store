import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Transfers } from "./Transfers";
import { Batches } from "./Batches";

@Index("batchId", ["batchId"], {})
@Entity("transferBatches", { schema: "myhomi" })
export class TransferBatches {
  @Column("varchar", { primary: true, name: "transferId", length: 50 })
  transferId: string;

  @Column("mediumint", { primary: true, name: "batchId" })
  batchId: number;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column("datetime", {
    name: "updateDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateDate: Date;

  @Column("varchar", { name: "unit", length: 25 })
  unit: string;

  @Column("decimal", { name: "quantity", precision: 20, scale: 4 })
  quantity: string;

  @ManyToOne(() => Transfers, (transfers) => transfers.transferBatches, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "transferId", referencedColumnName: "id" }])
  transfer: Transfers;

  @ManyToOne(() => Batches, (batches) => batches.transferBatches, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "batchId", referencedColumnName: "id" }])
  batch: Batches;
}
