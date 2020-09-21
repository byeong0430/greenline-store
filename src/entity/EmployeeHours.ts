import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Shifts } from "./Shifts";
import { Companies } from "./Companies";

@Index("deviceId", ["deviceId"], {})
@Index("employeeId", ["employeeId"], {})
@Index("shiftId", ["shiftId"], {})
@Index("fk_employeeHourCompany", ["companyId"], {})
@Index("compositeEmployeeCompanyIndex", ["employeeId", "companyId"], {})
@Entity("employeeHours", { schema: "myhomi" })
export class EmployeeHours {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "deviceId", nullable: true, length: 255 })
  deviceId: string | null;

  @Column("varchar", { name: "employeeId", length: 255 })
  employeeId: string;

  @Column("mediumint", { name: "shiftId", nullable: true })
  shiftId: number | null;

  @Column("datetime", { name: "startTime", default: () => "CURRENT_TIMESTAMP" })
  startTime: Date;

  @Column("datetime", { name: "endTime", nullable: true })
  endTime: Date | null;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("varchar", { name: "type", length: 20 })
  type: string;

  @ManyToOne(() => Users, (users) => users.employeeHours, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "deviceId", referencedColumnName: "id" }])
  device: Users;

  @ManyToOne(() => Users, (users) => users.employeeHours2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "employeeId", referencedColumnName: "id" }])
  employee: Users;

  @ManyToOne(() => Shifts, (shifts) => shifts.employeeHours, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "shiftId", referencedColumnName: "id" }])
  shift: Shifts;

  @ManyToOne(() => Companies, (companies) => companies.employeeHours, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;
}
