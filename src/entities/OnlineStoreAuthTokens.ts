import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Companies } from "./Companies";
import { Locations } from "./Locations";

@Index("token", ["token"], { unique: true })
@Index("locationId", ["locationId"], {})
@Entity("onlineStoreAuthTokens", { schema: "myhomi" })
export class OnlineStoreAuthTokens {
  @Column("mediumint", { primary: true, name: "companyId" })
  companyId: number;

  @Column("mediumint", { name: "locationId" })
  locationId: number;

  @Column("varchar", { primary: true, name: "token", length: 255 })
  token: string;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @ManyToOne(() => Companies, (companies) => companies.onlineStoreAuthTokens, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => Locations, (locations) => locations.onlineStoreAuthTokens, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "locationId", referencedColumnName: "id" }])
  location: Locations;
}
