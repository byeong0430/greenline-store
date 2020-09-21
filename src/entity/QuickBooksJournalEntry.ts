import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Companies } from "./Companies";

@Index("companyId_and_date_unique_constraint", ["companyId", "date"], {
  unique: true,
})
@Entity("quickBooksJournalEntry", { schema: "myhomi" })
export class QuickBooksJournalEntry {
  @Column("mediumint", { name: "companyId" })
  companyId: number;

  @Column("varchar", { name: "date", length: 55 })
  date: string;

  @Column("varchar", { name: "quickBooksJournalEntryId", length: 255 })
  quickBooksJournalEntryId: string;

  @Column("mediumint", { name: "journalEntrySyncToken", default: () => "'0'" })
  journalEntrySyncToken: number;

  @ManyToOne(
    () => Companies,
    (companies) => companies.quickBooksJournalEntries,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;
}
