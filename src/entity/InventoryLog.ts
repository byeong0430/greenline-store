import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InventoryAudit } from "./InventoryAudit";
import { Companies } from "./Companies";
import { InventoryConversion } from "./InventoryConversion";
import { Invoices } from "./Invoices";
import { Payments } from "./Payments";
import { Products } from "./Products";
import { Transfers } from "./Transfers";
import { Users } from "./Users";

@Index("fk_inventoryLogTransferId", ["transferId"], {})
@Index("fk_inventoryLogConversionId", ["conversionId"], {})
@Index("fk_inventoryLogAuditId", ["auditId"], {})
@Index("fk_inventoryLogInvoiceId", ["invoiceId"], {})
@Index("fk_inventoryLogProductId", ["productId"], {})
@Index("fk_inventoryLogPaymentId", ["paymentId"], {})
@Index("fk_inventoryLogUserId", ["userId"], {})
@Index(
  "inventoryLog_companyId_createDate_entityId_productId",
  ["companyId", "createDate", "entityId", "productId"],
  {}
)
@Index("fk_updateUserId", ["updateUserId"], {})
@Index(
  "productId_companyId_entityId_createDate",
  ["productId", "companyId", "entityId", "createDate"],
  {}
)
@Index("companyId_typeIdx", ["companyId", "type"], {})
@Entity("inventoryLog", { schema: "myhomi" })
export class InventoryLog {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("mediumint", { name: "entityId" })
  entityId: number;

  @Column("varchar", { name: "entityName", length: 255 })
  entityName: string;

  @Column("varchar", { name: "productId", length: 255 })
  productId: string;

  @Column("varchar", { name: "productName", length: 255 })
  productName: string;

  @Column("decimal", { name: "previousValue", precision: 20, scale: 4 })
  previousValue: string;

  @Column("decimal", { name: "updateValue", precision: 20, scale: 4 })
  updateValue: string;

  @Column("varchar", { name: "paymentId", nullable: true, length: 100 })
  paymentId: string | null;

  @Column("decimal", { name: "newValue", precision: 20, scale: 4 })
  newValue: string;

  @Column("varchar", { name: "userId", nullable: true, length: 100 })
  userId: string | null;

  @Column("varchar", { name: "userName", nullable: true, length: 100 })
  userName: string | null;

  @Column("mediumtext", { name: "message" })
  message: string;

  @Column("mediumtext", { name: "note", nullable: true })
  note: string | null;

  @Column("datetime", {
    name: "createDate",
    default: () => "'CURRENT_TIMESTAMP(3)'",
  })
  createDate: Date;

  @Column("varchar", { name: "type", length: 50 })
  type: string;

  @Column("varchar", { name: "transferId", nullable: true, length: 100 })
  transferId: string | null;

  @Column("varchar", { name: "conversionId", nullable: true, length: 100 })
  conversionId: string | null;

  @Column("varchar", { name: "auditId", nullable: true, length: 100 })
  auditId: string | null;

  @Column("varchar", { name: "invoiceId", nullable: true, length: 100 })
  invoiceId: string | null;

  @Column("varchar", { name: "updateUserId", nullable: true, length: 100 })
  updateUserId: string | null;

  @Column("datetime", { name: "updateDate", nullable: true })
  updateDate: Date | null;

  @Column("int", { name: "productCost", nullable: true })
  productCost: number | null;

  @ManyToOne(
    () => InventoryAudit,
    (inventoryAudit) => inventoryAudit.inventoryLogs,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "auditId", referencedColumnName: "id" }])
  audit: InventoryAudit;

  @ManyToOne(() => Companies, (companies) => companies.inventoryLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(
    () => InventoryConversion,
    (inventoryConversion) => inventoryConversion.inventoryLogs,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "conversionId", referencedColumnName: "id" }])
  conversion: InventoryConversion;

  @ManyToOne(() => Invoices, (invoices) => invoices.inventoryLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "invoiceId", referencedColumnName: "id" }])
  invoice: Invoices;

  @ManyToOne(() => Payments, (payments) => payments.inventoryLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "paymentId", referencedColumnName: "id" }])
  payment: Payments;

  @ManyToOne(() => Products, (products) => products.inventoryLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;

  @ManyToOne(() => Transfers, (transfers) => transfers.inventoryLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "transferId", referencedColumnName: "id" }])
  transfer: Transfers;

  @ManyToOne(() => Users, (users) => users.inventoryLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Users, (users) => users.inventoryLogs2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "updateUserId", referencedColumnName: "id" }])
  updateUser: Users;
}
