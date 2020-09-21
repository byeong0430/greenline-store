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

@Index("companyId", ["companyId"], {})
@Entity("suppliers", { schema: "myhomi" })
export class Suppliers {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("varchar", { name: "name", length: 512 })
  name: string;

  @Column("mediumtext", { name: "description", nullable: true })
  description: string | null;

  @Column("varchar", { name: "phone", nullable: true, length: 50 })
  phone: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("mediumtext", { name: "address", nullable: true })
  address: string | null;

  @Column("datetime", { name: "deleteDate", nullable: true })
  deleteDate: Date | null;

  @OneToMany(() => Invoices, (invoices) => invoices.supplier)
  invoices: Invoices[];

  @OneToMany(() => Products, (products) => products.supplier)
  products: Products[];

  @ManyToOne(() => Companies, (companies) => companies.suppliers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;
}
