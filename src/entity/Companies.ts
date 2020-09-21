import {Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne} from "typeorm";
import {Categories} from './Categories'
import {Entities} from './Entities'
import {Locations} from './Locations'
import {ExternalSources} from './ExternalSources'
import {ComplianceReportLogs} from './ComplianceReportLogs'
import {Customers} from './Customers'
import {DeviceRegisterCashLog} from './DeviceRegisterCashLog'
import {Discounts} from './Discounts'
import {EmployeeHours} from './EmployeeHours'
import {Expenses} from './Expenses'
import {InventoryAudit} from './InventoryAudit'
import {InventoryConversion} from './InventoryConversion'
import {InventoryLog} from './InventoryLog'
import {InventorySnapshot} from './InventorySnapshot'
import {InventoryTransfer} from './InventoryTransfer'
import {Invoices} from './Invoices'
import {LowStockInventoryRecipients} from './LowStockInventoryRecipients'
import {LoyaltyLogs} from './LoyaltyLogs'
import {LoyaltyTiers} from './LoyaltyTiers'
import {OnlineStoreAuthTokens} from './OnlineStoreAuthTokens'
import {PaymentTypeToQuickBooksAccountMapping} from './PaymentTypeToQuickBooksAccountMapping'
import {Payments} from './Payments'
import {Products} from './Products'
import {QuickBooksIntegration} from './QuickBooksIntegration'
import {QuickBooksJournalEntry} from './QuickBooksJournalEntry'
import {SecurityRoles} from './SecurityRoles'
import {Suppliers} from './Suppliers'
import {TaxGroups} from './TaxGroups'
import {TaxToQuickBooksAccountMapping} from './TaxToQuickBooksAccountMapping'
import {TransferTemplates} from './TransferTemplates'
import {Transfers} from './Transfers'
import {WooCommerceProducts} from './WooCommerceProducts'


@Index("uniqExternalApiAuthToken",["externalApiAuthToken",],{ unique:true })
@Index("fk_wooCommerceLocationId",["wooCommerceLocationId",],{  })
@Entity("companies" ,{schema:"myhomi" } )
export  class Companies {

@Column("mediumint",{ primary:true,name:"id" })
id:number;

@Column("mediumtext",{ name:"logoImageUrl",nullable:true })
logoImageUrl:string | null;

@Column("varchar",{ name:"name",length:255 })
name:string;

@Column("mediumtext",{ name:"description",nullable:true })
description:string | null;

@Column("tinyint",{ name:"isCompanyVerified",width:1,default: () => "'0'", })
isCompanyVerified:boolean;

@Column("varchar",{ name:"primaryPhone",nullable:true,length:255 })
primaryPhone:string | null;

@Column("varchar",{ name:"secondaryPhone",nullable:true,length:255 })
secondaryPhone:string | null;

@Column("int",{ name:"numberOfDevices",default: () => "'0'", })
numberOfDevices:number;

@Column("datetime",{ name:"createDate",default: () => "CURRENT_TIMESTAMP", })
createDate:Date;

@Column("int",{ name:"pointsPerCredit",nullable:true })
pointsPerCredit:number | null;

@Column("tinyint",{ name:"pointsEnabled",nullable:true,width:1,default: () => "'0'", })
pointsEnabled:boolean | null;

@Column("varchar",{ name:"gstNumber",nullable:true,length:255 })
gstNumber:string | null;

@Column("tinyint",{ name:"canAccessWholesale",nullable:true,width:1,default: () => "'0'", })
canAccessWholesale:boolean | null;

@Column("varchar",{ name:"wooCommerceKey",nullable:true,length:100 })
wooCommerceKey:string | null;

@Column("varchar",{ name:"wooCommerceSecret",nullable:true,length:100 })
wooCommerceSecret:string | null;

@Column("tinyint",{ name:"canAccessWordPress",nullable:true,width:1,default: () => "'0'", })
canAccessWordPress:boolean | null;

@Column("mediumtext",{ name:"wooCommerceUrl",nullable:true })
wooCommerceUrl:string | null;

@Column("mediumint",{ name:"wooCommerceLocationId",nullable:true })
wooCommerceLocationId:number | null;

@Column("varchar",{ name:"country",length:50 })
country:string;

@Column("tinyint",{ name:"isPaid",width:1,default: () => "'0'", })
isPaid:boolean;

@Column("tinyint",{ name:"canAccessLoyalty",width:1,default: () => "'0'", })
canAccessLoyalty:boolean;

@Column("tinyint",{ name:"canAccessInventoryAudits",width:1,default: () => "'0'", })
canAccessInventoryAudits:boolean;

@Column("tinyint",{ name:"canAccessInventoryConversions",width:1,default: () => "'0'", })
canAccessInventoryConversions:boolean;

@Column("tinyint",{ name:"canAccessInventoryTransfers",width:1,default: () => "'0'", })
canAccessInventoryTransfers:boolean;

@Column("varchar",{ name:"auditMode",length:50 })
auditMode:string;

@Column("varchar",{ name:"auditCompleteMode",length:50 })
auditCompleteMode:string;

@Column("varchar",{ name:"externalApiAuthToken",nullable:true,unique:true,length:255 })
externalApiAuthToken:string | null;

@Column("tinyint",{ name:"canAccessHeadset",nullable:true,width:1,default: () => "'0'", })
canAccessHeadset:boolean | null;

@Column("decimal",{ name:"cannabisWeightLimit",nullable:true,precision:20,scale:4 })
cannabisWeightLimit:string | null;

@Column("tinyint",{ name:"allowBulk",nullable:true,width:1,default: () => "'0'", })
allowBulk:boolean | null;

@Column("varchar",{ name:"province",nullable:true,length:50 })
province:string | null;

@Column("tinyint",{ name:"isLicensed",width:1,default: () => "'0'", })
isLicensed:boolean;

@Column("tinyint",{ name:"canAccessLeafly",nullable:true,width:1,default: () => "'0'", })
canAccessLeafly:boolean | null;

@Column("tinyint",{ name:"canAccessQuickBooks",nullable:true,width:1,default: () => "'0'", })
canAccessQuickBooks:boolean | null;

@Column("tinyint",{ name:"isBatchTracking",width:1,default: () => "'0'", })
isBatchTracking:boolean;

@Column("varchar",{ name:"inventoryCostOption",nullable:true,length:255 })
inventoryCostOption:string | null;

@Column("tinyint",{ name:"canAccessVerda",nullable:true,width:1,default: () => "'0'", })
canAccessVerda:boolean | null;

@Column("tinyint",{ name:"canAccessPricingGroups",nullable:true,width:1,default: () => "'0'", })
canAccessPricingGroups:boolean | null;

@Column("tinyint",{ name:"isWooCommerceAutoSync",nullable:true,width:1,default: () => "'0'", })
isWooCommerceAutoSync:boolean | null;

@Column("tinyint",{ name:"isGiftCardEnabled",nullable:true,width:1,default: () => "'0'", })
isGiftCardEnabled:boolean | null;

@Column("tinyint",{ name:"isMultiLocationPricing",width:1,default: () => "'0'", })
isMultiLocationPricing:boolean;

@Column("tinyint",{ name:"parkedSalesManagementEnabled",width:1,default: () => "'0'", })
parkedSalesManagementEnabled:boolean;

@Column("tinyint",{ name:"isOnboarding",nullable:true,width:1,default: () => "'0'", })
isOnboarding:boolean | null;

@Column("tinyint",{ name:"isBarcodeValidationEnabled",width:1,default: () => "'0'", })
isBarcodeValidationEnabled:boolean;

@Column("mediumtext",{ name:"bannerMessage",nullable:true })
bannerMessage:string | null;

@Column("tinyint",{ name:"isDashboardBarcodeValidationEnabled",width:1,default: () => "'0'", })
isDashboardBarcodeValidationEnabled:boolean;

@OneToMany(()=>Categories,categories=>categories.company)


categories:Categories[];

@OneToOne(()=>Entities,entities=>entities.companies,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "id", referencedColumnName: "id" },
])

entities:Entities;

@ManyToOne(()=>Locations,locations=>locations.companies,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "wooCommerceLocationId", referencedColumnName: "id" },
])

wooCommerceLocation:Locations;

@ManyToMany(()=>ExternalSources,externalSources=>externalSources.companies)

@JoinTable({ name:"companyExternalSources", joinColumns:[{ name: "companyId", referencedColumnName: "id" },
],inverseJoinColumns:[{ name: "externalSourceId", referencedColumnName: "id" },
],schema:"myhomi" })
externalSources:ExternalSources[];

@OneToMany(()=>ComplianceReportLogs,complianceReportLogs=>complianceReportLogs.company)


complianceReportLogs:ComplianceReportLogs[];

@OneToMany(()=>Customers,customers=>customers.company)


customers:Customers[];

@OneToMany(()=>DeviceRegisterCashLog,deviceRegisterCashLog=>deviceRegisterCashLog.company)


deviceRegisterCashLogs:DeviceRegisterCashLog[];

@OneToMany(()=>Discounts,discounts=>discounts.company)


discounts:Discounts[];

@OneToMany(()=>EmployeeHours,employeeHours=>employeeHours.company)


employeeHours:EmployeeHours[];

@OneToMany(()=>Expenses,expenses=>expenses.company)


expenses:Expenses[];

@OneToMany(()=>InventoryAudit,inventoryAudit=>inventoryAudit.company)


inventoryAudits:InventoryAudit[];

@OneToMany(()=>InventoryConversion,inventoryConversion=>inventoryConversion.company)


inventoryConversions:InventoryConversion[];

@OneToMany(()=>InventoryLog,inventoryLog=>inventoryLog.company)


inventoryLogs:InventoryLog[];

@OneToMany(()=>InventorySnapshot,inventorySnapshot=>inventorySnapshot.company)


inventorySnapshots:InventorySnapshot[];

@OneToMany(()=>InventoryTransfer,inventoryTransfer=>inventoryTransfer.company)


inventoryTransfers:InventoryTransfer[];

@OneToMany(()=>Invoices,invoices=>invoices.company)


invoices:Invoices[];

@OneToMany(()=>Locations,locations=>locations.company)


locations:Locations[];

@OneToMany(()=>LowStockInventoryRecipients,lowStockInventoryRecipients=>lowStockInventoryRecipients.company)


lowStockInventoryRecipients:LowStockInventoryRecipients[];

@OneToMany(()=>LoyaltyLogs,loyaltyLogs=>loyaltyLogs.company)


loyaltyLogs:LoyaltyLogs[];

@OneToMany(()=>LoyaltyTiers,loyaltyTiers=>loyaltyTiers.company)


loyaltyTiers:LoyaltyTiers[];

@OneToMany(()=>OnlineStoreAuthTokens,onlineStoreAuthTokens=>onlineStoreAuthTokens.company)


onlineStoreAuthTokens:OnlineStoreAuthTokens[];

@OneToMany(()=>PaymentTypeToQuickBooksAccountMapping,paymentTypeToQuickBooksAccountMapping=>paymentTypeToQuickBooksAccountMapping.company)


paymentTypeToQuickBooksAccountMappings:PaymentTypeToQuickBooksAccountMapping[];

@OneToMany(()=>Payments,payments=>payments.company)


payments:Payments[];

@OneToMany(()=>Products,products=>products.company)


products:Products[];

@OneToOne(()=>QuickBooksIntegration,quickBooksIntegration=>quickBooksIntegration.company)


quickBooksIntegration:QuickBooksIntegration;

@OneToMany(()=>QuickBooksJournalEntry,quickBooksJournalEntry=>quickBooksJournalEntry.company)


quickBooksJournalEntries:QuickBooksJournalEntry[];

@OneToMany(()=>SecurityRoles,securityRoles=>securityRoles.company)


securityRoles:SecurityRoles[];

@OneToMany(()=>Suppliers,suppliers=>suppliers.company)


suppliers:Suppliers[];

@OneToMany(()=>TaxGroups,taxGroups=>taxGroups.company)


taxGroups:TaxGroups[];

@OneToMany(()=>TaxToQuickBooksAccountMapping,taxToQuickBooksAccountMapping=>taxToQuickBooksAccountMapping.company)


taxToQuickBooksAccountMappings:TaxToQuickBooksAccountMapping[];

@OneToMany(()=>TransferTemplates,transferTemplates=>transferTemplates.company)


transferTemplates:TransferTemplates[];

@OneToMany(()=>Transfers,transfers=>transfers.company)


transfers:Transfers[];

@OneToMany(()=>WooCommerceProducts,wooCommerceProducts=>wooCommerceProducts.company)


wooCommerceProducts:WooCommerceProducts[];

}
