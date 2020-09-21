import { Column, Entity, Index, OneToMany } from "typeorm";
import { AuthTokens } from "./AuthTokens";
import { DeviceRegisterCashLog } from "./DeviceRegisterCashLog";
import { EmailVerifications } from "./EmailVerifications";
import { EmployeeHours } from "./EmployeeHours";
import { EntityUsers } from "./EntityUsers";
import { ForgotPasswordTokens } from "./ForgotPasswordTokens";
import { InventoryAudit } from "./InventoryAudit";
import { InventoryConversion } from "./InventoryConversion";
import { InventoryLog } from "./InventoryLog";
import { InventorySnapshot } from "./InventorySnapshot";
import { InventoryTransfer } from "./InventoryTransfer";
import { Invoices } from "./Invoices";
import { LowStockInventoryRecipients } from "./LowStockInventoryRecipients";
import { LoyaltyLogs } from "./LoyaltyLogs";
import { MerrcoTransactions } from "./MerrcoTransactions";
import { PaymentQueues } from "./PaymentQueues";
import { Payments } from "./Payments";
import { ProductLog } from "./ProductLog";
import { Shifts } from "./Shifts";
import { Transfers } from "./Transfers";
import { UserPreferences } from "./UserPreferences";

@Index("email", ["email"], { unique: true })
@Index("email_2", ["email"], { unique: true })
@Entity("users", { schema: "myhomi" })
export class Users {
  @Column("varchar", { primary: true, name: "id", length: 100 })
  id: string;

  @Column("varchar", {
    name: "email",
    nullable: true,
    unique: true,
    length: 100,
  })
  email: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("tinyint", {
    name: "isEmailVerified",
    width: 1,
    default: () => "'0'",
  })
  isEmailVerified: boolean;

  @Column("varchar", { name: "phone", nullable: true, length: 255 })
  phone: string | null;

  @Column("varchar", { name: "phoneCountryCode", nullable: true, length: 50 })
  phoneCountryCode: string | null;

  @Column("tinyint", {
    name: "isPhoneVerified",
    width: 1,
    default: () => "'0'",
  })
  isPhoneVerified: boolean;

  @Column("varchar", { name: "profileImageUrl", nullable: true, length: 500 })
  profileImageUrl: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 100 })
  password: string | null;

  @Column("tinyint", { name: "isAdmin", width: 1, default: () => "'0'" })
  isAdmin: boolean;

  @Column("varchar", { name: "userType", length: 255 })
  userType: string;

  @Column("varchar", { name: "registerPasscode", nullable: true, length: 255 })
  registerPasscode: string | null;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column("int", { name: "merrcoCompanyNumber", nullable: true })
  merrcoCompanyNumber: number | null;

  @Column("int", { name: "merrcoMerchantNumber", nullable: true })
  merrcoMerchantNumber: number | null;

  @Column("int", { name: "merrcoMerchantTerminalNumber", nullable: true })
  merrcoMerchantTerminalNumber: number | null;

  @Column("varchar", { name: "merrcoApiAuthKey", nullable: true, length: 100 })
  merrcoApiAuthKey: string | null;

  @Column("int", { name: "terminalPort", nullable: true })
  terminalPort: number | null;

  @Column("varchar", { name: "terminalIpAddress", nullable: true, length: 55 })
  terminalIpAddress: string | null;

  @OneToMany(() => AuthTokens, (authTokens) => authTokens.user)
  authTokens: AuthTokens[];

  @OneToMany(
    () => DeviceRegisterCashLog,
    (deviceRegisterCashLog) => deviceRegisterCashLog.device
  )
  deviceRegisterCashLogs: DeviceRegisterCashLog[];

  @OneToMany(
    () => EmailVerifications,
    (emailVerifications) => emailVerifications.user
  )
  emailVerifications: EmailVerifications[];

  @OneToMany(() => EmployeeHours, (employeeHours) => employeeHours.device)
  employeeHours: EmployeeHours[];

  @OneToMany(() => EmployeeHours, (employeeHours) => employeeHours.employee)
  employeeHours2: EmployeeHours[];

  @OneToMany(() => EntityUsers, (entityUsers) => entityUsers.user)
  entityUsers: EntityUsers[];

  @OneToMany(
    () => ForgotPasswordTokens,
    (forgotPasswordTokens) => forgotPasswordTokens.user
  )
  forgotPasswordTokens: ForgotPasswordTokens[];

  @OneToMany(
    () => InventoryAudit,
    (inventoryAudit) => inventoryAudit.startingUser
  )
  inventoryAudits: InventoryAudit[];

  @OneToMany(
    () => InventoryAudit,
    (inventoryAudit) => inventoryAudit.endingUser
  )
  inventoryAudits2: InventoryAudit[];

  @OneToMany(
    () => InventoryConversion,
    (inventoryConversion) => inventoryConversion.startingUser
  )
  inventoryConversions: InventoryConversion[];

  @OneToMany(
    () => InventoryConversion,
    (inventoryConversion) => inventoryConversion.endingUser
  )
  inventoryConversions2: InventoryConversion[];

  @OneToMany(() => InventoryLog, (inventoryLog) => inventoryLog.user)
  inventoryLogs: InventoryLog[];

  @OneToMany(() => InventoryLog, (inventoryLog) => inventoryLog.updateUser)
  inventoryLogs2: InventoryLog[];

  @OneToMany(
    () => InventorySnapshot,
    (inventorySnapshot) => inventorySnapshot.startingUser
  )
  inventorySnapshots: InventorySnapshot[];

  @OneToMany(
    () => InventoryTransfer,
    (inventoryTransfer) => inventoryTransfer.startingUser
  )
  inventoryTransfers: InventoryTransfer[];

  @OneToMany(
    () => InventoryTransfer,
    (inventoryTransfer) => inventoryTransfer.endingUser
  )
  inventoryTransfers2: InventoryTransfer[];

  @OneToMany(() => Invoices, (invoices) => invoices.startingUser)
  invoices: Invoices[];

  @OneToMany(
    () => LowStockInventoryRecipients,
    (lowStockInventoryRecipients) => lowStockInventoryRecipients.user
  )
  lowStockInventoryRecipients: LowStockInventoryRecipients[];

  @OneToMany(() => LoyaltyLogs, (loyaltyLogs) => loyaltyLogs.employee)
  loyaltyLogs: LoyaltyLogs[];

  @OneToMany(
    () => MerrcoTransactions,
    (merrcoTransactions) => merrcoTransactions.device
  )
  merrcoTransactions: MerrcoTransactions[];

  @OneToMany(
    () => MerrcoTransactions,
    (merrcoTransactions) => merrcoTransactions.employee
  )
  merrcoTransactions2: MerrcoTransactions[];

  @OneToMany(() => PaymentQueues, (paymentQueues) => paymentQueues.device)
  paymentQueues: PaymentQueues[];

  @OneToMany(() => Payments, (payments) => payments.device)
  payments: Payments[];

  @OneToMany(() => Payments, (payments) => payments.employee)
  payments2: Payments[];

  @OneToMany(() => ProductLog, (productLog) => productLog.employee)
  productLogs: ProductLog[];

  @OneToMany(() => Shifts, (shifts) => shifts.currentUser)
  shifts: Shifts[];

  @OneToMany(() => Shifts, (shifts) => shifts.user)
  shifts2: Shifts[];

  @OneToMany(() => Shifts, (shifts) => shifts.startingUser)
  shifts3: Shifts[];

  @OneToMany(() => Shifts, (shifts) => shifts.endingUser)
  shifts4: Shifts[];

  @OneToMany(() => Transfers, (transfers) => transfers.startingUser)
  transfers: Transfers[];

  @OneToMany(() => Transfers, (transfers) => transfers.endingUser)
  transfers2: Transfers[];

  @OneToMany(() => UserPreferences, (userPreferences) => userPreferences.user)
  userPreferences: UserPreferences[];
}
