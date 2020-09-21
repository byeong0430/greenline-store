import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ExternalSourcePermissions } from "./ExternalSourcePermissions";
import { Companies } from "./Companies";
import { PaymentQueues } from "./PaymentQueues";

@Index("name", ["name"], { unique: true })
@Index("apiKey", ["apiKey"], { unique: true })
@Entity("externalSources", { schema: "myhomi" })
export class ExternalSources {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("varchar", { name: "apiKey", unique: true, length: 255 })
  apiKey: string;

  @Column("varchar", { name: "hexColor", length: 20 })
  hexColor: string;

  @Column("mediumtext", { name: "logoImageUrl", nullable: true })
  logoImageUrl: string | null;

  @Column("mediumtext", { name: "description", nullable: true })
  description: string | null;

  @Column("varchar", { name: "categoryName", nullable: true, length: 255 })
  categoryName: string | null;

  @Column("mediumtext", { name: "setupUrl", nullable: true })
  setupUrl: string | null;

  @Column("mediumtext", { name: "homepage", nullable: true })
  homepage: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("tinyint", {
    name: "isMarketplace",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isMarketplace: boolean | null;

  @ManyToMany(
    () => ExternalSourcePermissions,
    (externalSourcePermissions) => externalSourcePermissions.externalSources
  )
  @JoinTable({
    name: "availableExternalPermissions",
    joinColumns: [{ name: "externalSourceId", referencedColumnName: "id" }],
    inverseJoinColumns: [
      { name: "externalSourcePermissionId", referencedColumnName: "id" },
    ],
    schema: "myhomi",
  })
  externalSourcePermissions: ExternalSourcePermissions[];

  @ManyToMany(() => Companies, (companies) => companies.externalSources)
  companies: Companies[];

  @OneToMany(
    () => PaymentQueues,
    (paymentQueues) => paymentQueues.externalSource
  )
  paymentQueues: PaymentQueues[];
}
