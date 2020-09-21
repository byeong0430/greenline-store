import {Column,Entity,Index,JoinColumn,ManyToOne} from "typeorm";
import {Transfers} from './Transfers'
import {Products} from './Products'


@Index("transferId",["transferId",],{  })
@Entity("transferProducts" ,{schema:"myhomi" } )
export  class TransferProducts {

@Column("varchar",{ primary:true,name:"transferId",length:50 })
transferId:string;

@Column("mediumtext",{ name:"name" })
name:string;

@Column("varchar",{ primary:true,name:"id",length:255 })
id:string;

@Column("varchar",{ name:"unit",length:25 })
unit:string;

@Column("decimal",{ name:"quantity",precision:20,scale:4 })
quantity:string;

@Column("mediumtext",{ name:"notes",nullable:true })
notes:string | null;

@Column("int",{ name:"indexOrder",nullable:true })
indexOrder:number | null;

@Column("int",{ name:"total",default: () => "'0'", })
total:number;

@ManyToOne(()=>Transfers,transfers=>transfers.transferProducts,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "transferId", referencedColumnName: "id" },
])

transfer:Transfers;

@ManyToOne(()=>Products,products=>products.transferProducts,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "id", referencedColumnName: "id" },
])

products:Products;

}
