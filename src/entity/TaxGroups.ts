import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invoices } from "./Invoices";
import { Products } from "./Products";
import { Companies } from "./Companies";
import { TaxLines } from "./TaxLines";

@Index("companyId", ["companyId"], {})
@Entity("taxGroups", { schema: "myhomi" })
export class TaxGroups {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("varchar", { name: "name", length: 500 })
  name: string;

  @OneToMany(() => Invoices, (invoices) => invoices.taxGroup)
  invoices: Invoices[];

  @OneToMany(() => Products, (products) => products.taxGroup)
  products: Products[];

  @ManyToOne(() => Companies, (companies) => companies.taxGroups, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @OneToMany(() => TaxLines, (taxLines) => taxLines.taxGroup)
  taxLines: TaxLines[];
}
