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
import { InventoryTransferProducts } from "./InventoryTransferProducts";

@Index("companyId", ["companyId"], {})
@Index("fromLocationId", ["fromLocationId"], {})
@Index("toLocationId", ["toLocationId"], {})
@Index("startingUserId", ["startingUserId"], {})
@Index("endingUserId", ["endingUserId"], {})
@Entity("inventoryTransfer", { schema: "myhomi" })
export class InventoryTransfer {
  @Column("varchar", { primary: true, name: "id", length: 100 })
  id: string;

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

  @ManyToOne(() => Companies, (companies) => companies.inventoryTransfers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => Locations, (locations) => locations.inventoryTransfers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "fromLocationId", referencedColumnName: "id" }])
  fromLocation: Locations;

  @ManyToOne(() => Locations, (locations) => locations.inventoryTransfers2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "toLocationId", referencedColumnName: "id" }])
  toLocation: Locations;

  @ManyToOne(() => Users, (users) => users.inventoryTransfers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "startingUserId", referencedColumnName: "id" }])
  startingUser: Users;

  @ManyToOne(() => Users, (users) => users.inventoryTransfers2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "endingUserId", referencedColumnName: "id" }])
  endingUser: Users;

  @OneToMany(
    () => InventoryTransferProducts,
    (inventoryTransferProducts) => inventoryTransferProducts.inventoryTransfer
  )
  inventoryTransferProducts: InventoryTransferProducts[];
}
