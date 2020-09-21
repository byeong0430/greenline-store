import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customers } from "./Customers";
import { Discounts } from "./Discounts";
import { Companies } from "./Companies";

@Index("companyId", ["companyId"], {})
@Entity("loyaltyTiers", { schema: "myhomi" })
export class LoyaltyTiers {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("tinyint", {
    name: "isEnabled",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  isEnabled: boolean | null;

  @Column("varchar", { name: "name", length: 500 })
  name: string;

  @Column("mediumtext", { name: "description", nullable: true })
  description: string | null;

  @Column("int", { name: "creditAmount" })
  creditAmount: number;

  @Column("int", { name: "creditAmountPer" })
  creditAmountPer: number;

  @Column("int", { name: "minimumRequiredPurchase", default: () => "'0'" })
  minimumRequiredPurchase: number;

  @Column("int", { name: "minimumRedeemable", default: () => "'0'" })
  minimumRedeemable: number;

  @Column("int", { name: "maximumRedeemable", nullable: true })
  maximumRedeemable: number | null;

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

  @Column("tinyint", { name: "isDefault", width: 1, default: () => "'0'" })
  isDefault: boolean;

  @OneToMany(() => Customers, (customers) => customers.loyaltyTier)
  customers: Customers[];

  @OneToMany(() => Discounts, (discounts) => discounts.loyaltyTier)
  discounts: Discounts[];

  @ManyToOne(() => Companies, (companies) => companies.loyaltyTiers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;
}
