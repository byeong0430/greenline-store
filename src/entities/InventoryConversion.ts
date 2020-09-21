import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Companies } from "./Companies";
import { Locations } from "./Locations";
import { Users } from "./Users";
import { InventoryConversionInProducts } from "./InventoryConversionInProducts";
import { InventoryConversionOutProducts } from "./InventoryConversionOutProducts";
import { InventoryLog } from "./InventoryLog";

@Index("companyId", ["companyId"], {})
@Index("locationId", ["locationId"], {})
@Index("startingUserId", ["startingUserId"], {})
@Index("endingUserId", ["endingUserId"], {})
@Entity("inventoryConversion", { schema: "myhomi" })
export class InventoryConversion {
  @Column("varchar", { primary: true, name: "id", length: 100 })
  id: string;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("mediumint", { name: "locationId" })
  locationId: number;

  @Column("varchar", { name: "startingUserId", length: 100 })
  startingUserId: string;

  @Column("varchar", { name: "endingUserId", nullable: true, length: 100 })
  endingUserId: string | null;

  @Column("mediumtext", { name: "notes", nullable: true })
  notes: string | null;

  @Column("varchar", { name: "status", length: 50 })
  status: string;

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

  @Column("mediumtext", { name: "title" })
  title: string;

  @ManyToOne(() => Companies, (companies) => companies.inventoryConversions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => Locations, (locations) => locations.inventoryConversions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "locationId", referencedColumnName: "id" }])
  location: Locations;

  @ManyToOne(() => Users, (users) => users.inventoryConversions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "startingUserId", referencedColumnName: "id" }])
  startingUser: Users;

  @ManyToOne(() => Users, (users) => users.inventoryConversions2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "endingUserId", referencedColumnName: "id" }])
  endingUser: Users;

  @OneToMany(
    () => InventoryConversionInProducts,
    (inventoryConversionInProducts) =>
      inventoryConversionInProducts.inventoryConversion
  )
  inventoryConversionInProducts: InventoryConversionInProducts[];

  @OneToMany(
    () => InventoryConversionOutProducts,
    (inventoryConversionOutProducts) =>
      inventoryConversionOutProducts.inventoryConversion
  )
  inventoryConversionOutProducts: InventoryConversionOutProducts[];

  @OneToMany(() => InventoryLog, (inventoryLog) => inventoryLog.conversion)
  inventoryLogs: InventoryLog[];
}
