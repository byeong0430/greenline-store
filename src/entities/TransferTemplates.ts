import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TransferTemplateProductQuantities } from "./TransferTemplateProductQuantities";
import { TransferTemplateProducts } from "./TransferTemplateProducts";
import { Companies } from "./Companies";
import { Locations } from "./Locations";
import { Transfers } from "./Transfers";

@Index("fromLocationId", ["fromLocationId"], {})
@Index("fk_transferTemplateCompanyId", ["companyId"], {})
@Entity("transferTemplates", { schema: "myhomi" })
export class TransferTemplates {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumtext", { name: "title" })
  title: string;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column("varchar", { name: "status", length: 30 })
  status: string;

  @Column("mediumint", { name: "fromLocationId" })
  fromLocationId: number;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @OneToMany(
    () => TransferTemplateProductQuantities,
    (transferTemplateProductQuantities) =>
      transferTemplateProductQuantities.transferTemplate
  )
  transferTemplateProductQuantities: TransferTemplateProductQuantities[];

  @OneToMany(
    () => TransferTemplateProducts,
    (transferTemplateProducts) => transferTemplateProducts.transferTemplate
  )
  transferTemplateProducts: TransferTemplateProducts[];

  @ManyToOne(() => Companies, (companies) => companies.transferTemplates, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => Locations, (locations) => locations.transferTemplates, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "fromLocationId", referencedColumnName: "id" }])
  fromLocation: Locations;

  @OneToMany(() => Transfers, (transfers) => transfers.transferTemplate)
  transfers: Transfers[];
}
