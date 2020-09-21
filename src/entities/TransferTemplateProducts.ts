import {Column,Entity,Index,JoinColumn,ManyToOne} from "typeorm";
import {Products} from './Products'
import {TransferTemplates} from './TransferTemplates'


@Index("transferTemplateId",["transferTemplateId",],{  })
@Entity("transferTemplateProducts" ,{schema:"myhomi" } )
export  class TransferTemplateProducts {

@Column("varchar",{ primary:true,name:"id",length:255 })
id:string;

@Column("mediumtext",{ name:"name" })
name:string;

@Column("mediumint",{ primary:true,name:"transferTemplateId" })
transferTemplateId:number;

@Column("int",{ name:"indexOrder" })
indexOrder:number;

@ManyToOne(()=>Products,products=>products.transferTemplateProducts,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "id", referencedColumnName: "id" },
])

products:Products;

@ManyToOne(()=>TransferTemplates,transferTemplates=>transferTemplates.transferTemplateProducts,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "transferTemplateId", referencedColumnName: "id" },
])

transferTemplate:TransferTemplates;

}
