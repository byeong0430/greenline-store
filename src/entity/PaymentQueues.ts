import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PaymentQueueLines } from "./PaymentQueueLines";
import { ExternalSources } from "./ExternalSources";
import { Locations } from "./Locations";
import { Customers } from "./Customers";
import { Users } from "./Users";
import { Payments } from "./Payments";

@Index("locationId", ["locationId"], {})
@Index("customerId", ["customerId"], {})
@Index("deviceId", ["deviceId"], {})
@Index("fk_externalSourceId", ["externalSourceId"], {})
@Entity("paymentQueues", { schema: "myhomi" })
export class PaymentQueues {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumint", { name: "locationId" })
  locationId: number;

  @Column("varchar", { name: "customerId", nullable: true, length: 255 })
  customerId: string | null;

  @Column("varchar", { name: "customerName", nullable: true, length: 255 })
  customerName: string | null;

  @Column("varchar", { name: "deviceId", nullable: true, length: 255 })
  deviceId: string | null;

  @Column("mediumtext", { name: "notes", nullable: true })
  notes: string | null;

  @Column("mediumtext", { name: "paymentLines", nullable: true })
  paymentLines: string | null;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column("varchar", { name: "status", length: 50 })
  status: string;

  @Column("mediumint", { name: "externalSourceId", nullable: true })
  externalSourceId: number | null;

  @Column("int", { name: "externalOrderId", nullable: true })
  externalOrderId: number | null;

  @Column("varchar", { name: "userId", nullable: true, length: 255 })
  userId: string | null;

  @Column("int", {
    name: "totalDiscrepancy",
    nullable: true,
    default: () => "'0'",
  })
  totalDiscrepancy: number | null;

  @Column("varchar", { name: "orderType", nullable: true, length: 255 })
  orderType: string | null;

  @OneToMany(
    () => PaymentQueueLines,
    (paymentQueueLines) => paymentQueueLines.paymentQueue
  )
  paymentQueueLines: PaymentQueueLines[];

  @ManyToOne(
    () => ExternalSources,
    (externalSources) => externalSources.paymentQueues,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "externalSourceId", referencedColumnName: "id" }])
  externalSource: ExternalSources;

  @ManyToOne(() => Locations, (locations) => locations.paymentQueues, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "locationId", referencedColumnName: "id" }])
  location: Locations;

  @ManyToOne(() => Customers, (customers) => customers.paymentQueues, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "customerId", referencedColumnName: "id" }])
  customer: Customers;

  @ManyToOne(() => Users, (users) => users.paymentQueues, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "deviceId", referencedColumnName: "id" }])
  device: Users;

  @OneToMany(() => Payments, (payments) => payments.paymentQueue)
  payments: Payments[];
}
