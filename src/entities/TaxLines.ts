import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Taxes } from "./Taxes";
import { TaxGroups } from "./TaxGroups";

@Index("taxGroupId", ["taxGroupId"], {})
@Index("fk_taxGroupForeignKey", ["taxId"], {})
@Entity("taxLines", { schema: "myhomi" })
export class TaxLines {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumint", { name: "taxGroupId" })
  taxGroupId: number;

  @Column("mediumint", { name: "taxId" })
  taxId: number;

  @ManyToOne(() => Taxes, (taxes) => taxes.taxLines, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "taxId", referencedColumnName: "id" }])
  tax: Taxes;

  @ManyToOne(() => TaxGroups, (taxGroups) => taxGroups.taxLines, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "taxGroupId", referencedColumnName: "id" }])
  taxGroup: TaxGroups;
}
