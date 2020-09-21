import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Transactions } from "./Transactions";

@Index("FK_transactionId", ["transactionId"], {})
@Index("FK_deviceId", ["deviceId"], {})
@Index("FK_employeeId", ["employeeId"], {})
@Entity("merrcoTransactions", { schema: "myhomi" })
export class MerrcoTransactions {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("int", { name: "transactionId" })
  transactionId: number;

  @Column("varchar", { name: "deviceId", length: 100 })
  deviceId: string;

  @Column("varchar", { name: "employeeId", length: 100 })
  employeeId: string;

  @Column("datetime", { name: "updateDate", nullable: true })
  updateDate: Date | null;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column("int", { name: "amount" })
  amount: number;

  @Column("varchar", { name: "status", nullable: true, length: 255 })
  status: string | null;

  @Column("mediumtext", { name: "responsePayload", nullable: true })
  responsePayload: string | null;

  @Column("varchar", { name: "merrcoInvoiceId", nullable: true, length: 12 })
  merrcoInvoiceId: string | null;

  @ManyToOne(() => Users, (users) => users.merrcoTransactions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "deviceId", referencedColumnName: "id" }])
  device: Users;

  @ManyToOne(() => Users, (users) => users.merrcoTransactions2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "employeeId", referencedColumnName: "id" }])
  employee: Users;

  @ManyToOne(
    () => Transactions,
    (transactions) => transactions.merrcoTransactions,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "transactionId", referencedColumnName: "id" }])
  transaction: Transactions;
}
