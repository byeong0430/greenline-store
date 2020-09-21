import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { InventoryLog } from "./InventoryLog";
import { InvoiceFees } from "./InvoiceFees";
import { InvoiceLines } from "./InvoiceLines";
import { Users } from "./Users";
import { TaxGroups } from "./TaxGroups";
import { Companies } from "./Companies";
import { Locations } from "./Locations";
import { Suppliers } from "./Suppliers";

@Index("companyId", ["companyId"], {})
@Index("locationId", ["locationId"], {})
@Index("supplierId", ["supplierId"], {})
@Index("fk_invoiceStartingUserId", ["startingUserId"], {})
@Index("fk_taxGroup_id", ["taxGroupId"], {})
@Entity("invoices", { schema: "myhomi" })
export class Invoices {
  @Column("varchar", { primary: true, name: "id", length: 50 })
  id: string;

  @Column("varchar", { name: "customId", nullable: true, length: 50 })
  customId: string | null;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("mediumint", { name: "locationId" })
  locationId: number;

  @Column("mediumtext", { name: "title" })
  title: string;

  @Column("mediumint", { name: "supplierId", nullable: true })
  supplierId: number | null;

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

  @Column("datetime", { name: "orderDate", nullable: true })
  orderDate: Date | null;

  @Column("datetime", { name: "completeDate", nullable: true })
  completeDate: Date | null;

  @Column("mediumtext", { name: "notes", nullable: true })
  notes: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 50 })
  status: string | null;

  @Column("datetime", { name: "paymentDueDate", nullable: true })
  paymentDueDate: Date | null;

  @Column("varchar", { name: "startingUserId", nullable: true, length: 255 })
  startingUserId: string | null;

  @Column("int", { name: "paid", default: () => "'0'" })
  paid: number;

  @Column("int", { name: "total", default: () => "'0'" })
  total: number;

  @Column("tinyint", { name: "isReturn", width: 1, default: () => "'0'" })
  isReturn: boolean;

  @Column("mediumint", { name: "taxGroupId", nullable: true })
  taxGroupId: number | null;

  @OneToMany(() => InventoryLog, (inventoryLog) => inventoryLog.invoice)
  inventoryLogs: InventoryLog[];

  @OneToMany(() => InvoiceFees, (invoiceFees) => invoiceFees.invoice)
  invoiceFees: InvoiceFees[];

  @OneToMany(() => InvoiceLines, (invoiceLines) => invoiceLines.invoice)
  invoiceLines: InvoiceLines[];

  @ManyToOne(() => Users, (users) => users.invoices, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "startingUserId", referencedColumnName: "id" }])
  startingUser: Users;

  @ManyToOne(() => TaxGroups, (taxGroups) => taxGroups.invoices, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "taxGroupId", referencedColumnName: "id" }])
  taxGroup: TaxGroups;

  @ManyToOne(() => Companies, (companies) => companies.invoices, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => Locations, (locations) => locations.invoices, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "locationId", referencedColumnName: "id" }])
  location: Locations;

  @ManyToOne(() => Suppliers, (suppliers) => suppliers.invoices, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "supplierId", referencedColumnName: "id" }])
  supplier: Suppliers;
}
