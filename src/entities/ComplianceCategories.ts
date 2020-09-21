import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./Categories";

@Entity("complianceCategories", { schema: "myhomi" })
export class ComplianceCategories {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("mediumtext", { name: "description" })
  description: string;

  @OneToMany(() => Categories, (categories) => categories.complianceCategory)
  categories: Categories[];
}
