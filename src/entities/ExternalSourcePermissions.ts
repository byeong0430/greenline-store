import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ExternalSources } from "./ExternalSources";

@Index("name", ["name"], { unique: true })
@Entity("externalSourcePermissions", { schema: "myhomi" })
export class ExternalSourcePermissions {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @Column("int", { name: "indexOrder" })
  indexOrder: number;

  @ManyToMany(
    () => ExternalSources,
    (externalSources) => externalSources.externalSourcePermissions
  )
  externalSources: ExternalSources[];
}
