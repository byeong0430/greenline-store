import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Companies } from "./Companies";

@Entity("quickBooksIntegration", { schema: "myhomi" })
export class QuickBooksIntegration {
  @Column("mediumint", { primary: true, name: "companyId" })
  companyId: number;

  @Column("varchar", { name: "realmId", length: 255 })
  realmId: string;

  @Column("mediumtext", { name: "accessToken" })
  accessToken: string;

  @Column("mediumtext", { name: "refreshToken" })
  refreshToken: string;

  @OneToOne(() => Companies, (companies) => companies.quickBooksIntegration, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;
}
