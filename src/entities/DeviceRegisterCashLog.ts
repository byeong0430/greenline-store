import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Payments } from "./Payments";
import { Companies } from "./Companies";
import { Shifts } from "./Shifts";

@Index("fk_cashLogDeviceId", ["deviceId"], {})
@Index("fk_cashLogPaymentId", ["paymentId"], {})
@Index("fk_shiftId", ["shiftId"], {})
@Index("fk_deviceRegisterLogCompanyId", ["companyId"], {})
@Entity("deviceRegisterCashLog", { schema: "myhomi" })
export class DeviceRegisterCashLog {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("mediumint", { name: "entityId" })
  entityId: number;

  @Column("varchar", { name: "entityName", length: 255 })
  entityName: string;

  @Column("mediumint", { name: "previousValue" })
  previousValue: number;

  @Column("mediumint", { name: "updateValue" })
  updateValue: number;

  @Column("mediumint", { name: "newValue" })
  newValue: number;

  @Column("mediumtext", { name: "note", nullable: true })
  note: string | null;

  @Column("varchar", { name: "userId", length: 100 })
  userId: string;

  @Column("varchar", { name: "userName", nullable: true, length: 100 })
  userName: string | null;

  @Column("mediumtext", { name: "message" })
  message: string;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column("varchar", { name: "deviceId", nullable: true, length: 255 })
  deviceId: string | null;

  @Column("varchar", { name: "paymentId", nullable: true, length: 255 })
  paymentId: string | null;

  @Column("varchar", { name: "type", length: 50 })
  type: string;

  @Column("mediumint", { name: "shiftId", nullable: true })
  shiftId: number | null;

  @ManyToOne(() => Users, (users) => users.deviceRegisterCashLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "deviceId", referencedColumnName: "id" }])
  device: Users;

  @ManyToOne(() => Payments, (payments) => payments.deviceRegisterCashLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "paymentId", referencedColumnName: "id" }])
  payment: Payments;

  @ManyToOne(() => Companies, (companies) => companies.deviceRegisterCashLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => Shifts, (shifts) => shifts.deviceRegisterCashLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "shiftId", referencedColumnName: "id" }])
  shift: Shifts;
}
