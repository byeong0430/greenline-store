import {Column,Entity,Index,JoinColumn,ManyToOne,OneToMany} from "typeorm";
import {Batches} from './Batches'
import {DiscountProducts} from './DiscountProducts'
import {Expenses} from './Expenses'
import {Inventory} from './Inventory'
import {InventoryAuditProducts} from './InventoryAuditProducts'
import {InventoryConversionInProducts} from './InventoryConversionInProducts'
import {InventoryConversionOutProducts} from './InventoryConversionOutProducts'
import {InventoryLog} from './InventoryLog'
import {InventorySnapshotBatches} from './InventorySnapshotBatches'
import {InventorySnapshotProducts} from './InventorySnapshotProducts'
import {InventoryTransferProducts} from './InventoryTransferProducts'
import {InvoiceLines} from './InvoiceLines'
import {PaymentLines} from './PaymentLines'
import {ProductLog} from './ProductLog'
import {ProductPriceOverride} from './ProductPriceOverride'
import {Suppliers} from './Suppliers'
import {Companies} from './Companies'
import {Categories} from './Categories'
import {TaxGroups} from './TaxGroups'
import {TaxPaymentLines} from './TaxPaymentLines'
import {TransferProducts} from './TransferProducts'
import {TransferTemplateProductQuantities} from './TransferTemplateProductQuantities'
import {TransferTemplateProducts} from './TransferTemplateProducts'
import {WooCommerceProducts} from './WooCommerceProducts'


@Index("companyId",["companyId",],{  })
@Index("categoryId",["categoryId",],{  })
@Index("taxGroupId",["taxGroupId",],{  })
@Index("fk_productPricingGroupId",["pricingGroupId",],{  })
@Index("fk_parent_product_id",["parentProductId",],{  })
@Index("fk_supplier_id",["supplierId",],{  })
@Entity("products" ,{schema:"myhomi" } )
export  class Products {

@Column("varchar",{ primary:true,name:"id",length:255 })
id:string;

@Column("mediumtext",{ name:"imageUrl",nullable:true })
imageUrl:string | null;

@Column("mediumint",{ name:"companyId" })
companyId:number;

@Column("varchar",{ name:"name",length:255 })
name:string;

@Column("varchar",{ name:"sku",nullable:true,length:255 })
sku:string | null;

@Column("mediumtext",{ name:"description",nullable:true })
description:string | null;

@Column("int",{ name:"price",nullable:true })
price:number | null;

@Column("varchar",{ name:"unit",nullable:true,length:255 })
unit:string | null;

@Column("varchar",{ name:"categoryId",nullable:true,length:255 })
categoryId:string | null;

@Column("mediumint",{ name:"supplierId",nullable:true })
supplierId:number | null;

@Column("tinyint",{ name:"trackInventory",nullable:true,width:1,default: () => "'0'", })
trackInventory:boolean | null;

@Column("mediumint",{ name:"taxGroupId",nullable:true })
taxGroupId:number | null;

@Column("tinyint",{ name:"isDeleted",nullable:true,width:1,default: () => "'0'", })
isDeleted:boolean | null;

@Column("datetime",{ name:"createDate",default: () => "CURRENT_TIMESTAMP", })
createDate:Date;

@Column("datetime",{ name:"updateDate",default: () => "CURRENT_TIMESTAMP", })
updateDate:Date;

@Column("varchar",{ name:"parentProductId",nullable:true,length:255 })
parentProductId:string | null;

@Column("tinyint",{ name:"isMasterProduct",nullable:true,width:1,default: () => "'0'", })
isMasterProduct:boolean | null;

@Column("decimal",{ name:"inventorySubtractAmount",precision:20,scale:4,default: () => "'1.0000'", })
inventorySubtractAmount:string;

@Column("varchar",{ name:"shortName",nullable:true,length:255 })
shortName:string | null;

@Column("int",{ name:"purchasePrice",nullable:true })
purchasePrice:number | null;

@Column("decimal",{ name:"weight",nullable:true,precision:20,scale:4 })
weight:string | null;

@Column("decimal",{ name:"cannabisWeight",nullable:true,precision:20,scale:4 })
cannabisWeight:string | null;

@Column("mediumint",{ name:"wooCommerceProductId",nullable:true })
wooCommerceProductId:number | null;

@Column("datetime",{ name:"wooCommerceSyncDate",nullable:true })
wooCommerceSyncDate:Date | null;

@Column("mediumtext",{ name:"wooCommerceProductJSON",nullable:true })
wooCommerceProductJson:string | null;

@Column("tinyint",{ name:"isPricingGroup",width:1,default: () => "'0'", })
isPricingGroup:boolean;

@Column("varchar",{ name:"pricingGroupId",nullable:true,length:255 })
pricingGroupId:string | null;

@Column("tinyint",{ name:"inBetweenPricing",width:1,default: () => "'0'", })
inBetweenPricing:boolean;

@Column("tinyint",{ name:"isActive",width:1,default: () => "'1'", })
isActive:boolean;

@Column("tinyint",{ name:"isCumulative",width:1,default: () => "'0'", })
isCumulative:boolean;

@Column("tinyint",{ name:"trackPurchaseOrderCosts",nullable:true,width:1,default: () => "'1'", })
trackPurchaseOrderCosts:boolean | null;

@Column("tinyint",{ name:"trackConversionCosts",nullable:true,width:1,default: () => "'1'", })
trackConversionCosts:boolean | null;

@Column("int",{ name:"indexOrder",nullable:true })
indexOrder:number | null;

@Column("tinyint",{ name:"isBatchTracked",width:1,default: () => "'0'", })
isBatchTracked:boolean;

@Column("decimal",{ name:"cannabisVolume",nullable:true,precision:20,scale:4 })
cannabisVolume:string | null;

@Column("varchar",{ name:"barcode",nullable:true,length:100 })
barcode:string | null;

@Column("mediumtext",{ name:"shortDescription",nullable:true })
shortDescription:string | null;

@Column("decimal",{ name:"thc",nullable:true,precision:20,scale:4 })
thc:string | null;

@Column("decimal",{ name:"cbd",nullable:true,precision:20,scale:4 })
cbd:string | null;

@Column("tinyint",{ name:"isGiftCard",nullable:true,width:1,default: () => "'0'", })
isGiftCard:boolean | null;

@Column("int",{ name:"depositFee",nullable:true })
depositFee:number | null;

@OneToMany(()=>Batches,batches=>batches.product)


batches:Batches[];

@OneToMany(()=>DiscountProducts,discountProducts=>discountProducts.id)


discountProducts:DiscountProducts[];

@OneToMany(()=>Expenses,expenses=>expenses.product)


expenses:Expenses[];

@OneToMany(()=>Inventory,inventory=>inventory.product)


inventories:Inventory[];

@OneToMany(()=>InventoryAuditProducts,inventoryAuditProducts=>inventoryAuditProducts.product)


inventoryAuditProducts:InventoryAuditProducts[];

@OneToMany(()=>InventoryConversionInProducts,inventoryConversionInProducts=>inventoryConversionInProducts.product)


inventoryConversionInProducts:InventoryConversionInProducts[];

@OneToMany(()=>InventoryConversionOutProducts,inventoryConversionOutProducts=>inventoryConversionOutProducts.product)


inventoryConversionOutProducts:InventoryConversionOutProducts[];

@OneToMany(()=>InventoryLog,inventoryLog=>inventoryLog.product)


inventoryLogs:InventoryLog[];

@OneToMany(()=>InventorySnapshotBatches,inventorySnapshotBatches=>inventorySnapshotBatches.product)


inventorySnapshotBatches:InventorySnapshotBatches[];

@OneToMany(()=>InventorySnapshotProducts,inventorySnapshotProducts=>inventorySnapshotProducts.product)


inventorySnapshotProducts:InventorySnapshotProducts[];

@OneToMany(()=>InventoryTransferProducts,inventoryTransferProducts=>inventoryTransferProducts.product)


inventoryTransferProducts:InventoryTransferProducts[];

@OneToMany(()=>InvoiceLines,invoiceLines=>invoiceLines.product)


invoiceLines:InvoiceLines[];

@OneToMany(()=>PaymentLines,paymentLines=>paymentLines.product)


paymentLines:PaymentLines[];

@OneToMany(()=>ProductLog,productLog=>productLog.product)


productLogs:ProductLog[];

@OneToMany(()=>ProductPriceOverride,productPriceOverride=>productPriceOverride.product)


productPriceOverrides:ProductPriceOverride[];

@ManyToOne(()=>Products,products=>products.products,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "parentProductId", referencedColumnName: "id" },
])

parentProduct:Products;

@OneToMany(()=>Products,products=>products.parentProduct)


products:Products[];

@ManyToOne(()=>Products,products=>products.products2,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "pricingGroupId", referencedColumnName: "id" },
])

pricingGroup:Products;

@OneToMany(()=>Products,products=>products.pricingGroup)


products2:Products[];

@ManyToOne(()=>Suppliers,suppliers=>suppliers.products,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "supplierId", referencedColumnName: "id" },
])

supplier:Suppliers;

@ManyToOne(()=>Companies,companies=>companies.products,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "companyId", referencedColumnName: "id" },
])

company:Companies;

@ManyToOne(()=>Categories,categories=>categories.products,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "categoryId", referencedColumnName: "id" },
])

category:Categories;

@ManyToOne(()=>TaxGroups,taxGroups=>taxGroups.products,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "taxGroupId", referencedColumnName: "id" },
])

taxGroup:TaxGroups;

@OneToMany(()=>TaxPaymentLines,taxPaymentLines=>taxPaymentLines.product)


taxPaymentLines:TaxPaymentLines[];

@OneToMany(()=>TransferProducts,transferProducts=>transferProducts.id)


transferProducts:TransferProducts[];

@OneToMany(()=>TransferTemplateProductQuantities,transferTemplateProductQuantities=>transferTemplateProductQuantities.product)


transferTemplateProductQuantities:TransferTemplateProductQuantities[];

@OneToMany(()=>TransferTemplateProducts,transferTemplateProducts=>transferTemplateProducts.id)


transferTemplateProducts:TransferTemplateProducts[];

@OneToMany(()=>WooCommerceProducts,wooCommerceProducts=>wooCommerceProducts.product)


wooCommerceProducts:WooCommerceProducts[];

}
