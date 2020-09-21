import {Column,Entity,Index,JoinColumn,ManyToOne,OneToMany,OneToOne,PrimaryGeneratedColumn} from "typeorm";
import {Companies} from './Companies'
import {EntityUsers} from './EntityUsers'
import {Locations} from './Locations'


@Index("parentEntityId",["parentEntityId",],{  })
@Index("rootEntityId",["rootEntityId",],{  })
@Entity("entities" ,{schema:"myhomi" } )
export  class Entities {

@PrimaryGeneratedColumn({ type:"mediumint", name:"id" })
id:number;

@Column("mediumint",{ name:"parentEntityId",nullable:true })
parentEntityId:number | null;

@Column("mediumint",{ name:"rootEntityId",nullable:true })
rootEntityId:number | null;

@Column("varchar",{ name:"entityType",length:255 })
entityType:string;

@Column("datetime",{ name:"createDate",default: () => "CURRENT_TIMESTAMP", })
createDate:Date;

@OneToOne(()=>Companies,companies=>companies.id)


companies:Companies;

@ManyToOne(()=>Entities,entities=>entities.entities,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "parentEntityId", referencedColumnName: "id" },
])

parentEntity:Entities;

@OneToMany(()=>Entities,entities=>entities.parentEntity)


entities:Entities[];

@ManyToOne(()=>Entities,entities=>entities.entities2,{ onDelete:"RESTRICT",onUpdate:"RESTRICT" })
@JoinColumn([{ name: "rootEntityId", referencedColumnName: "id" },
])

rootEntity:Entities;

@OneToMany(()=>Entities,entities=>entities.rootEntity)


entities2:Entities[];

@OneToMany(()=>EntityUsers,entityUsers=>entityUsers.entity)


entityUsers:EntityUsers[];

@OneToOne(()=>Locations,locations=>locations.id)


locations:Locations;

}
