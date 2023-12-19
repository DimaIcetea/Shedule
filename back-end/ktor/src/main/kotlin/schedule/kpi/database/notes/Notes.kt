package schedule.kpi.database.notes

import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.statements.InsertStatement
import org.jetbrains.exposed.sql.transactions.transaction

object Notes: IntIdTable() {
    internal val title = Notes.varchar("title", 50)
    internal val lesson = Notes.varchar("lesson", 30)
    internal val link = Notes.varchar("link", 128)
    internal val content = Notes.varchar("content", 256)
    internal val type = Notes.integer("type")
    internal val login = Notes.varchar("login", 25)


    fun insert(notesDTO: NotesDTO){
        transaction {
            Notes.insert {
                it[title] = notesDTO.title
                it[lesson] = notesDTO.lesson
                it[link] = notesDTO.link
                it[content] = notesDTO.content
                it[type]=notesDTO.type
                it[login]=notesDTO.login

            }

        }

    }
}


