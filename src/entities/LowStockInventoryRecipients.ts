import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Companies } from "./Companies";
import { Locations } from "./Locations";

@Index("userId", ["userId"], {})
@Index("companyId", ["companyId"], {})
@Index("locationId", ["locationId"], {})
@Entity("lowStockInventoryRecipients", { schema: "myhomi" })
export class LowStockInventoryRecipients {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "userId", length: 255 })
  userId: string;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("mediumint", { name: "locationId" })
  locationId: number;

  @Column("varchar", { name: "scheduleType", length: 20 })
  scheduleType: string;

  @Column("int", { name: "utcHour", nullable: true })
  utcHour: number | null;

  @Column("varchar", { name: "phone", nullable: true, length: 100 })
  phone: string | null;

  @ManyToOne(() => Users, (users) => users.lowStockInventoryRecipients, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(
    () => Companies,
    (companies) => companies.lowStockInventoryRecipients,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(
    () => Locations,
    (locations) => locations.lowStockInventoryRecipients,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "locationId", referencedColumnName: "id" }])
  location: Locations;
}
