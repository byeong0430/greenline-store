import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { InventoryLog } from "./InventoryLog";
import { TransferBatches } from "./TransferBatches";
import { TransferProducts } from "./TransferProducts";
import { TransferTemplates } from "./TransferTemplates";
import { Companies } from "./Companies";
import { Locations } from "./Locations";
import { Users } from "./Users";

@Index("companyId", ["companyId"], {})
@Index("fromLocationId", ["fromLocationId"], {})
@Index("toLocationId", ["toLocationId"], {})
@Index("startingUserId", ["startingUserId"], {})
@Index("endingUserId", ["endingUserId"], {})
@Index("fk_transferTemplateId", ["transferTemplateId"], {})
@Entity("transfers", { schema: "myhomi" })
export class Transfers {
  @Column("varchar", { primary: true, name: "id", length: 50 })
  id: string;

  @Column("mediumtext", { name: "title" })
  title: string;

  @Column("varchar", { name: "customId", nullable: true, length: 50 })
  customId: string | null;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("mediumint", { name: "fromLocationId" })
  fromLocationId: number;

  @Column("mediumint", { name: "toLocationId" })
  toLocationId: number;

  @Column("varchar", { name: "startingUserId", length: 100 })
  startingUserId: string;

  @Column("varchar", { name: "endingUserId", nullable: true, length: 100 })
  endingUserId: string | null;

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

  @Column("datetime", { name: "completeDate", nullable: true })
  completeDate: Date | null;

  @Column("mediumtext", { name: "notes", nullable: true })
  notes: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 50 })
  status: string | null;

  @Column("tinyint", {
    name: "inventoryCheckedIn",
    width: 1,
    default: () => "'0'",
  })
  inventoryCheckedIn: boolean;

  @Column("tinyint", {
    name: "inventoryCheckedOut",
    width: 1,
    default: () => "'0'",
  })
  inventoryCheckedOut: boolean;

  @Column("tinyint", {
    name: "isPayment",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isPayment: boolean | null;

  @Column("mediumint", { name: "transferTemplateId", nullable: true })
  transferTemplateId: number | null;

  @OneToMany(() => InventoryLog, (inventoryLog) => inventoryLog.transfer)
  inventoryLogs: InventoryLog[];

  @OneToMany(
    () => TransferBatches,
    (transferBatches) => transferBatches.transfer
  )
  transferBatches: TransferBatches[];

  @OneToMany(
    () => TransferProducts,
    (transferProducts) => transferProducts.transfer
  )
  transferProducts: TransferProducts[];

  @ManyToOne(
    () => TransferTemplates,
    (transferTemplates) => transferTemplates.transfers,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "transferTemplateId", referencedColumnName: "id" }])
  transferTemplate: TransferTemplates;

  @ManyToOne(() => Companies, (companies) => companies.transfers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => Locations, (locations) => locations.transfers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "fromLocationId", referencedColumnName: "id" }])
  fromLocation: Locations;

  @ManyToOne(() => Locations, (locations) => locations.transfers2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "toLocationId", referencedColumnName: "id" }])
  toLocation: Locations;

  @ManyToOne(() => Users, (users) => users.transfers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "startingUserId", referencedColumnName: "id" }])
  startingUser: Users;

  @ManyToOne(() => Users, (users) => users.transfers2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "endingUserId", referencedColumnName: "id" }])
  endingUser: Users;
}
