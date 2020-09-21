import {Column,Entity,Index,JoinColumn,ManyToOne} from "typeorm";
import {Discounts} from './Discounts'
import {Products} from './Products'


@Index("id",["id",],{  })
@Entity("discountProducts" ,{schema:"myhomi" } )
export  class DiscountProducts {

@Column("mediumint",{ primary:true,name:"discountId" })
discountId:number;

@Column("varchar",{ primary:true,name:"id",length:255 })
id:string;

@Column("varchar",{ name:"type",length:20 })
type:string;

@ManyToOne(()=>Discounts,discounts=>discounts.discountProducts,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "discountId", referencedColumnName: "id" },
])

discount:Discounts;

@ManyToOne(()=>Products,products=>products.discountProducts,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "id", referencedColumnName: "id" },
])

products:Products;

}
