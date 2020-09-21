import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Companies } from "./Companies";

@Index("companyId", ["companyId"], {})
@Entity("complianceReportLogs", { schema: "myhomi" })
export class ComplianceReportLogs {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("varchar", { name: "locationIds", length: 55 })
  locationIds: string;

  @Column("date", { name: "startDate" })
  startDate: string;

  @Column("date", { name: "endDate" })
  endDate: string;

  @Column("longtext", { name: "data" })
  data: string;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @ManyToOne(() => Companies, (companies) => companies.complianceReportLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;
}
