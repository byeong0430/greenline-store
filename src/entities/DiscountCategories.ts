import {Column,Entity,Index,JoinColumn,ManyToOne} from "typeorm";
import {Discounts} from './Discounts'
import {Categories} from './Categories'


@Index("id",["id",],{  })
@Entity("discountCategories" ,{schema:"myhomi" } )
export  class DiscountCategories {

@Column("mediumint",{ primary:true,name:"discountId" })
discountId:number;

@Column("varchar",{ primary:true,name:"id",length:255 })
id:string;

@Column("varchar",{ name:"type",length:20 })
type:string;

@ManyToOne(()=>Discounts,discounts=>discounts.discountCategories,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "discountId", referencedColumnName: "id" },
])

discount:Discounts;

@ManyToOne(()=>Categories,categories=>categories.discountCategories,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "id", referencedColumnName: "id" },
])

categories:Categories;

}
