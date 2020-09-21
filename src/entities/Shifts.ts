import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DeviceRegisterCashLog } from "./DeviceRegisterCashLog";
import { EmployeeHours } from "./EmployeeHours";
import { Payments } from "./Payments";
import { Users } from "./Users";

@Index("userId", ["userId"], {})
@Index("startingUserId", ["startingUserId"], {})
@Index("endingUserId", ["endingUserId"], {})
@Index("fk_shiftCurrentUserId", ["currentUserId"], {})
@Entity("shifts", { schema: "myhomi" })
export class Shifts {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "userId", length: 100 })
  userId: string;

  @Column("varchar", { name: "startingUserId", length: 100 })
  startingUserId: string;

  @Column("varchar", { name: "endingUserId", nullable: true, length: 100 })
  endingUserId: string | null;

  @Column("int", { name: "startCash" })
  startCash: number;

  @Column("int", { name: "endCash" })
  endCash: number;

  @Column("mediumtext", { name: "notes", nullable: true })
  notes: string | null;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column("datetime", { name: "endDate", nullable: true })
  endDate: Date | null;

  @Column("varchar", { name: "currentUserId", nullable: true, length: 255 })
  currentUserId: string | null;

  @Column("varchar", { name: "cashCount", nullable: true, length: 255 })
  cashCount: string | null;

  @OneToMany(
    () => DeviceRegisterCashLog,
    (deviceRegisterCashLog) => deviceRegisterCashLog.shift
  )
  deviceRegisterCashLogs: DeviceRegisterCashLog[];

  @OneToMany(() => EmployeeHours, (employeeHours) => employeeHours.shift)
  employeeHours: EmployeeHours[];

  @OneToMany(() => Payments, (payments) => payments.shift)
  payments: Payments[];

  @ManyToOne(() => Users, (users) => users.shifts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "currentUserId", referencedColumnName: "id" }])
  currentUser: Users;

  @ManyToOne(() => Users, (users) => users.shifts2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Users, (users) => users.shifts3, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "startingUserId", referencedColumnName: "id" }])
  startingUser: Users;

  @ManyToOne(() => Users, (users) => users.shifts4, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "endingUserId", referencedColumnName: "id" }])
  endingUser: Users;
}
