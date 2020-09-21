import {Column,Entity,Index,JoinColumn,ManyToOne,OneToMany} from "typeorm";
import {Companies} from './Companies'
import {ComplianceCategories} from './ComplianceCategories'
import {DiscountCategories} from './DiscountCategories'
import {Products} from './Products'


@Index("companyId",["companyId",],{  })
@Index("parentCategoryId",["parentCategoryId",],{  })
@Index("fk_complianceCategory",["complianceCategoryId",],{  })
@Entity("categories" ,{schema:"myhomi" } )
export  class Categories {

@Column("varchar",{ primary:true,name:"id",length:255 })
id:string;

@Column("mediumint",{ name:"companyId" })
companyId:number;

@Column("varchar",{ name:"name",length:255 })
name:string;

@Column("mediumtext",{ name:"description",nullable:true })
description:string | null;

@Column("varchar",{ name:"parentCategoryId",nullable:true,length:255 })
parentCategoryId:string | null;

@Column("varchar",{ name:"colorHex",nullable:true,length:20 })
colorHex:string | null;

@Column("int",{ name:"listOrder",nullable:true })
listOrder:number | null;

@Column("mediumint",{ name:"complianceCategoryId",nullable:true })
complianceCategoryId:number | null;

@Column("int",{ name:"wooCommerceCategoryId",nullable:true })
wooCommerceCategoryId:number | null;

@Column("varchar",{ name:"leaflyCategory",nullable:true,length:50 })
leaflyCategory:string | null;

@ManyToOne(()=>Companies,companies=>companies.categories,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "companyId", referencedColumnName: "id" },
])

company:Companies;

@ManyToOne(()=>Categories,categories=>categories.categories,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "parentCategoryId", referencedColumnName: "id" },
])

parentCategory:Categories;

@OneToMany(()=>Categories,categories=>categories.parentCategory)


categories:Categories[];

@ManyToOne(()=>ComplianceCategories,complianceCategories=>complianceCategories.categories,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "complianceCategoryId", referencedColumnName: "id" },
])

complianceCategory:ComplianceCategories;

@OneToMany(()=>DiscountCategories,discountCategories=>discountCategories.id)


discountCategories:DiscountCategories[];

@OneToMany(()=>Products,products=>products.category)


products:Products[];

}
