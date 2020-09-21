import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Companies } from "./Companies";
import { Users } from "./Users";
import { Customers } from "./Customers";
import { Payments } from "./Payments";

@Index("companyId", ["companyId"], {})
@Index("employeeId", ["employeeId"], {})
@Index("customerId", ["customerId"], {})
@Index("paymentId", ["paymentId"], {})
@Entity("loyaltyLogs", { schema: "myhomi" })
export class LoyaltyLogs {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("varchar", { name: "employeeId", length: 255 })
  employeeId: string;

  @Column("varchar", { name: "customerId", length: 255 })
  customerId: string;

  @Column("int", { name: "amount" })
  amount: number;

  @Column("mediumtext", { name: "message", nullable: true })
  message: string | null;

  @Column("varchar", { name: "paymentId", nullable: true, length: 255 })
  paymentId: string | null;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @ManyToOne(() => Companies, (companies) => companies.loyaltyLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => Users, (users) => users.loyaltyLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "employeeId", referencedColumnName: "id" }])
  employee: Users;

  @ManyToOne(() => Customers, (customers) => customers.loyaltyLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "customerId", referencedColumnName: "id" }])
  customer: Customers;

  @ManyToOne(() => Payments, (payments) => payments.loyaltyLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "paymentId", referencedColumnName: "id" }])
  payment: Payments;
}
