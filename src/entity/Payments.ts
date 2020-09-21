import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { DeviceRegisterCashLog } from "./DeviceRegisterCashLog";
import { InventoryLog } from "./InventoryLog";
import { LoyaltyLogs } from "./LoyaltyLogs";
import { PaymentLines } from "./PaymentLines";
import { Companies } from "./Companies";
import { Users } from "./Users";
import { PaymentQueues } from "./PaymentQueues";
import { Shifts } from "./Shifts";
import { Locations } from "./Locations";
import { Customers } from "./Customers";
import { TaxPaymentLines } from "./TaxPaymentLines";
import { Transactions } from "./Transactions";

@Index("offlinePaymentId", ["offlinePaymentId"], { unique: true })
@Index("locationId", ["locationId"], {})
@Index("employeeId", ["employeeId"], {})
@Index("customerId", ["customerId"], {})
@Index("fk_paymentShiftId", ["shiftId"], {})
@Index("fk_refundPaymentId", ["refundPaymentId"], {})
@Index("fk_paymentCompanyId", ["companyId"], {})
@Index("fk_paymentPaymentQueueId", ["paymentQueueId"], {})
@Index(
  "payments_idx_companyid_createdate_loc",
  ["companyId", "createDate", "locationId"],
  {}
)
@Index("locationId_wooCommerceIdx", ["locationId", "wooCommerceOrderId"], {})
@Index(
  "companyId_locationId_customIdIdx",
  ["companyId", "locationId", "customId"],
  {}
)
@Index(
  "device_loc_comp_createDate",
  ["deviceId", "locationId", "companyId", "createDate"],
  {}
)
@Index(
  "idx_payments_CompanyLocationStatus",
  ["companyId", "locationId", "status"],
  {}
)
@Entity("payments", { schema: "myhomi" })
export class Payments {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("mediumint", { name: "locationId" })
  locationId: number;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("varchar", { name: "customerId", nullable: true, length: 255 })
  customerId: string | null;

  @Column("mediumint", { name: "tendered", nullable: true })
  tendered: number | null;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column("varchar", { name: "employeeId", nullable: true, length: 255 })
  employeeId: string | null;

  @Column("mediumtext", { name: "notes", nullable: true })
  notes: string | null;

  @Column("int", { name: "total" })
  total: number;

  @Column("varchar", { name: "deviceId", nullable: true, length: 255 })
  deviceId: string | null;

  @Column("mediumint", { name: "shiftId", nullable: true })
  shiftId: number | null;

  @Column("varchar", { name: "status", length: 50 })
  status: string;

  @Column("mediumtext", { name: "wooCommerceOrderJSON", nullable: true })
  wooCommerceOrderJson: string | null;

  @Column("int", { name: "wooCommerceOrderId", nullable: true })
  wooCommerceOrderId: number | null;

  @Column("varchar", { name: "customId", nullable: true, length: 10 })
  customId: string | null;

  @Column("tinyint", {
    name: "inventorySubtracted",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  inventorySubtracted: boolean | null;

  @Column("datetime", { name: "completeDate", nullable: true })
  completeDate: Date | null;

  @Column("varchar", { name: "refundPaymentId", nullable: true, length: 255 })
  refundPaymentId: string | null;

  @Column("varchar", {
    name: "offlinePaymentId",
    nullable: true,
    unique: true,
    length: 100,
  })
  offlinePaymentId: string | null;

  @Column("mediumint", { name: "paymentQueueId", nullable: true })
  paymentQueueId: number | null;

  @Column("smallint", { name: "pennyAdjustment", default: () => "'0'" })
  pennyAdjustment: number;

  @Column("varchar", { name: "appVersion", nullable: true, length: 50 })
  appVersion: string | null;

  @OneToMany(
    () => DeviceRegisterCashLog,
    (deviceRegisterCashLog) => deviceRegisterCashLog.payment
  )
  deviceRegisterCashLogs: DeviceRegisterCashLog[];

  @OneToMany(() => InventoryLog, (inventoryLog) => inventoryLog.payment)
  inventoryLogs: InventoryLog[];

  @OneToMany(() => LoyaltyLogs, (loyaltyLogs) => loyaltyLogs.payment)
  loyaltyLogs: LoyaltyLogs[];

  @OneToMany(() => PaymentLines, (paymentLines) => paymentLines.payment)
  paymentLines: PaymentLines[];

  @ManyToOne(() => Companies, (companies) => companies.payments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => Users, (users) => users.payments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "deviceId", referencedColumnName: "id" }])
  device: Users;

  @ManyToOne(() => PaymentQueues, (paymentQueues) => paymentQueues.payments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "paymentQueueId", referencedColumnName: "id" }])
  paymentQueue: PaymentQueues;

  @ManyToOne(() => Shifts, (shifts) => shifts.payments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "shiftId", referencedColumnName: "id" }])
  shift: Shifts;

  @ManyToOne(() => Payments, (payments) => payments.payments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "refundPaymentId", referencedColumnName: "id" }])
  refundPayment: Payments;

  @OneToMany(() => Payments, (payments) => payments.refundPayment)
  payments: Payments[];

  @ManyToOne(() => Locations, (locations) => locations.payments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "locationId", referencedColumnName: "id" }])
  location: Locations;

  @ManyToOne(() => Users, (users) => users.payments2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "employeeId", referencedColumnName: "id" }])
  employee: Users;

  @ManyToOne(() => Customers, (customers) => customers.payments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "customerId", referencedColumnName: "id" }])
  customer: Customers;

  @OneToMany(
    () => TaxPaymentLines,
    (taxPaymentLines) => taxPaymentLines.payment
  )
  taxPaymentLines: TaxPaymentLines[];

  @OneToMany(() => Transactions, (transactions) => transactions.payment)
  transactions: Transactions[];
}
