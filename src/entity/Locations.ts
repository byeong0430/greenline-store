import {Column,Entity,Index,JoinColumn,ManyToMany,ManyToOne,OneToMany,OneToOne} from "typeorm";
import {Batches} from './Batches'
import {Companies} from './Companies'
import {Customers} from './Customers'
import {Discounts} from './Discounts'
import {Expenses} from './Expenses'
import {Inventory} from './Inventory'
import {InventoryAudit} from './InventoryAudit'
import {InventoryConversion} from './InventoryConversion'
import {InventorySnapshot} from './InventorySnapshot'
import {InventoryTransfer} from './InventoryTransfer'
import {Invoices} from './Invoices'
import {LocationToQuickBooksAccountMapping} from './LocationToQuickBooksAccountMapping'
import {Entities} from './Entities'
import {LowStockInventoryRecipients} from './LowStockInventoryRecipients'
import {OnlineStoreAuthTokens} from './OnlineStoreAuthTokens'
import {PaymentQueues} from './PaymentQueues'
import {Payments} from './Payments'
import {ProductPriceOverride} from './ProductPriceOverride'
import {TransferTemplateProductQuantities} from './TransferTemplateProductQuantities'
import {TransferTemplates} from './TransferTemplates'
import {Transfers} from './Transfers'


@Index("companyId",["companyId",],{  })
@Entity("locations" ,{schema:"myhomi" } )
export  class Locations {

@Column("mediumint",{ primary:true,name:"id" })
id:number;

@Column("mediumint",{ name:"companyId" })
companyId:number;

@Column("varchar",{ name:"name",length:255 })
name:string;

@Column("mediumtext",{ name:"description",nullable:true })
description:string | null;

@Column("mediumtext",{ name:"address",nullable:true })
address:string | null;

@Column("tinyint",{ name:"isHidden",nullable:true,width:1,default: () => "'0'", })
isHidden:boolean | null;

@Column("int",{ name:"listOrder",nullable:true })
listOrder:number | null;

@Column("mediumtext",{ name:"receiptLocationNameText",nullable:true })
receiptLocationNameText:string | null;

@Column("mediumtext",{ name:"receiptLocationDescriptionText",nullable:true })
receiptLocationDescriptionText:string | null;

@Column("mediumtext",{ name:"receiptFooterText",nullable:true })
receiptFooterText:string | null;

@Column("mediumtext",{ name:"receiptAddressText",nullable:true })
receiptAddressText:string | null;

@Column("tinyint",{ name:"receiptShowEmployee",nullable:true,width:1,default: () => "'1'", })
receiptShowEmployee:boolean | null;

@Column("varchar",{ name:"headsetApiKey",nullable:true,length:100 })
headsetApiKey:string | null;

@Column("varchar",{ name:"headsetDataKey",nullable:true,length:100 })
headsetDataKey:string | null;

@Column("varchar",{ name:"timezone",nullable:true,length:60 })
timezone:string | null;

@Column("varchar",{ name:"leaflyApiKey",nullable:true,length:255 })
leaflyApiKey:string | null;

@Column("mediumint",{ name:"buddiStoreId",nullable:true })
buddiStoreId:number | null;

@Column("tinyint",{ name:"receiptShowSku",width:1,default: () => "'0'", })
receiptShowSku:boolean;

@OneToMany(()=>Batches,batches=>batches.location)


batches:Batches[];

@OneToMany(()=>Companies,companies=>companies.wooCommerceLocation)


companies:Companies[];

@OneToMany(()=>Customers,customers=>customers.location)


customers:Customers[];

@ManyToMany(()=>Discounts,discounts=>discounts.locations)


discounts:Discounts[];

@OneToMany(()=>Expenses,expenses=>expenses.location)


expenses:Expenses[];

@OneToMany(()=>Inventory,inventory=>inventory.location)


inventories:Inventory[];

@OneToMany(()=>InventoryAudit,inventoryAudit=>inventoryAudit.location)


inventoryAudits:InventoryAudit[];

@OneToMany(()=>InventoryConversion,inventoryConversion=>inventoryConversion.location)


inventoryConversions:InventoryConversion[];

@OneToMany(()=>InventorySnapshot,inventorySnapshot=>inventorySnapshot.location)


inventorySnapshots:InventorySnapshot[];

@OneToMany(()=>InventoryTransfer,inventoryTransfer=>inventoryTransfer.fromLocation)


inventoryTransfers:InventoryTransfer[];

@OneToMany(()=>InventoryTransfer,inventoryTransfer=>inventoryTransfer.toLocation)


inventoryTransfers2:InventoryTransfer[];

@OneToMany(()=>Invoices,invoices=>invoices.location)


invoices:Invoices[];

@OneToOne(()=>LocationToQuickBooksAccountMapping,locationToQuickBooksAccountMapping=>locationToQuickBooksAccountMapping.location)


locationToQuickBooksAccountMapping:LocationToQuickBooksAccountMapping;

@OneToOne(()=>Entities,entities=>entities.locations,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "id", referencedColumnName: "id" },
])

entities:Entities;

@ManyToOne(()=>Companies,companies=>companies.locations,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "companyId", referencedColumnName: "id" },
])

company:Companies;

@OneToMany(()=>LowStockInventoryRecipients,lowStockInventoryRecipients=>lowStockInventoryRecipients.location)


lowStockInventoryRecipients:LowStockInventoryRecipients[];

@OneToMany(()=>OnlineStoreAuthTokens,onlineStoreAuthTokens=>onlineStoreAuthTokens.location)


onlineStoreAuthTokens:OnlineStoreAuthTokens[];

@OneToMany(()=>PaymentQueues,paymentQueues=>paymentQueues.location)


paymentQueues:PaymentQueues[];

@OneToMany(()=>Payments,payments=>payments.location)


payments:Payments[];

@OneToMany(()=>ProductPriceOverride,productPriceOverride=>productPriceOverride.location)


productPriceOverrides:ProductPriceOverride[];

@OneToMany(()=>TransferTemplateProductQuantities,transferTemplateProductQuantities=>transferTemplateProductQuantities.location)


transferTemplateProductQuantities:TransferTemplateProductQuantities[];

@OneToMany(()=>TransferTemplates,transferTemplates=>transferTemplates.fromLocation)


transferTemplates:TransferTemplates[];

@OneToMany(()=>Transfers,transfers=>transfers.fromLocation)


transfers:Transfers[];

@OneToMany(()=>Transfers,transfers=>transfers.toLocation)


transfers2:Transfers[];

}
