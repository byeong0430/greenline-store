import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DiscountCategories } from "./DiscountCategories";
import { Locations } from "./Locations";
import { DiscountProducts } from "./DiscountProducts";
import { Companies } from "./Companies";
import { LoyaltyTiers } from "./LoyaltyTiers";
import { PaymentLines } from "./PaymentLines";

@Index("companyId", ["companyId"], {})
@Index("fk_discountLoyaltyTier", ["loyaltyTierId"], {})
@Entity("discounts", { schema: "myhomi" })
export class Discounts {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("mediumtext", { name: "name" })
  name: string;

  @Column("mediumtext", { name: "description", nullable: true })
  description: string | null;

  @Column("varchar", { name: "type", length: 100 })
  type: string;

  @Column("decimal", { name: "amount", precision: 20, scale: 4 })
  amount: string;

  @Column("tinyint", {
    name: "isDeleted",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isDeleted: boolean | null;

  @Column("varchar", { name: "applyType", length: 20 })
  applyType: string;

  @Column("mediumint", { name: "loyaltyTierId", nullable: true })
  loyaltyTierId: number | null;

  @Column("tinyint", {
    name: "applyDateRestriction",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  applyDateRestriction: boolean | null;

  @Column("tinyint", {
    name: "isRecurring",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isRecurring: boolean | null;

  @Column("tinyint", {
    name: "sunday",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  sunday: boolean | null;

  @Column("tinyint", {
    name: "monday",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  monday: boolean | null;

  @Column("tinyint", {
    name: "tuesday",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  tuesday: boolean | null;

  @Column("tinyint", {
    name: "wednesday",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  wednesday: boolean | null;

  @Column("tinyint", {
    name: "thursday",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  thursday: boolean | null;

  @Column("tinyint", {
    name: "friday",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  friday: boolean | null;

  @Column("tinyint", {
    name: "saturday",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  saturday: boolean | null;

  @Column("varchar", { name: "startDate", nullable: true, length: 20 })
  startDate: string | null;

  @Column("varchar", { name: "endDate", nullable: true, length: 20 })
  endDate: string | null;

  @Column("varchar", { name: "startTime", nullable: true, length: 20 })
  startTime: string | null;

  @Column("varchar", { name: "endTime", nullable: true, length: 20 })
  endTime: string | null;

  @Column("tinyint", { name: "automatic", width: 1, default: () => "'0'" })
  automatic: boolean;

  @OneToMany(
    () => DiscountCategories,
    (discountCategories) => discountCategories.discount
  )
  discountCategories: DiscountCategories[];

  @ManyToMany(() => Locations, (locations) => locations.discounts)
  @JoinTable({
    name: "discountLocations",
    joinColumns: [{ name: "discountId", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "locationId", referencedColumnName: "id" }],
    schema: "myhomi",
  })
  locations: Locations[];

  @OneToMany(
    () => DiscountProducts,
    (discountProducts) => discountProducts.discount
  )
  discountProducts: DiscountProducts[];

  @ManyToOne(() => Companies, (companies) => companies.discounts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => LoyaltyTiers, (loyaltyTiers) => loyaltyTiers.discounts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "loyaltyTierId", referencedColumnName: "id" }])
  loyaltyTier: LoyaltyTiers;

  @OneToMany(() => PaymentLines, (paymentLines) => paymentLines.discount)
  paymentLines: PaymentLines[];
}
