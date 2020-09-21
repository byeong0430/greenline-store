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
import { LoyaltyTiers } from "./LoyaltyTiers";
import { LoyaltyLogs } from "./LoyaltyLogs";
import { PaymentQueues } from "./PaymentQueues";
import { Payments } from "./Payments";

@Index("companyId", ["companyId"], {})
@Index("fk_customerLoyaltyTier", ["loyaltyTierId"], {})
@Index("fk_customerLocationId", ["locationId"], {})
@Entity("customers", { schema: "myhomi" })
export class Customers {
  @Column("varchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("varchar", { name: "cardId", nullable: true, length: 255 })
  cardId: string | null;

  @Column("mediumint", { primary: true, name: "companyId" })
  companyId: number;

  @Column("mediumtext", { name: "secureProfileImageFileName", nullable: true })
  secureProfileImageFileName: string | null;

  @Column("mediumtext", { name: "secureIdImageFileName", nullable: true })
  secureIdImageFileName: string | null;

  @Column("mediumtext", { name: "idImageUrl", nullable: true })
  idImageUrl: string | null;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "phone", nullable: true, length: 255 })
  phone: string | null;

  @Column("tinyint", {
    name: "canContactPhone",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  canContactPhone: boolean | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("tinyint", {
    name: "canContactEmail",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  canContactEmail: boolean | null;

  @Column("varchar", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @Column("varchar", { name: "city", nullable: true, length: 255 })
  city: string | null;

  @Column("varchar", { name: "country", nullable: true, length: 255 })
  country: string | null;

  @Column("varchar", { name: "postalCode", nullable: true, length: 100 })
  postalCode: string | null;

  @Column("varchar", {
    name: "driversLicenseNumber",
    nullable: true,
    length: 255,
  })
  driversLicenseNumber: string | null;

  @Column("varchar", { name: "passportNumber", nullable: true, length: 255 })
  passportNumber: string | null;

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

  @Column("int", { name: "totalSpend", default: () => "'0'" })
  totalSpend: number;

  @Column("int", { name: "creditBalance", default: () => "'0'" })
  creditBalance: number;

  @Column("int", { name: "credit", default: () => "'0'" })
  credit: number;

  @Column("varchar", { name: "idType", nullable: true, length: 255 })
  idType: string | null;

  @Column("mediumtext", { name: "notes", nullable: true })
  notes: string | null;

  @Column("mediumint", { name: "loyaltyTierId", nullable: true })
  loyaltyTierId: number | null;

  @Column("datetime", { name: "birthday", nullable: true })
  birthday: Date | null;

  @Column("datetime", { name: "expiryDate", nullable: true })
  expiryDate: Date | null;

  @Column("varchar", { name: "gender", nullable: true, length: 10 })
  gender: string | null;

  @Column("tinyint", {
    name: "isDeleted",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isDeleted: boolean | null;

  @Column("mediumint", { name: "locationId", nullable: true })
  locationId: number | null;

  @Column("varchar", { name: "province", nullable: true, length: 50 })
  province: string | null;

  @Column("tinyint", { name: "isTaxExempt", width: 1, default: () => "'0'" })
  isTaxExempt: boolean;

  @ManyToOne(() => Companies, (companies) => companies.customers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => Locations, (locations) => locations.customers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "locationId", referencedColumnName: "id" }])
  location: Locations;

  @ManyToOne(() => LoyaltyTiers, (loyaltyTiers) => loyaltyTiers.customers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "loyaltyTierId", referencedColumnName: "id" }])
  loyaltyTier: LoyaltyTiers;

  @OneToMany(() => LoyaltyLogs, (loyaltyLogs) => loyaltyLogs.customer)
  loyaltyLogs: LoyaltyLogs[];

  @OneToMany(() => PaymentQueues, (paymentQueues) => paymentQueues.customer)
  paymentQueues: PaymentQueues[];

  @OneToMany(() => Payments, (payments) => payments.customer)
  payments: Payments[];
}
