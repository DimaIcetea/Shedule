package schedule.kpi.features.notes
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import schedule.kpi.database.notes.Notes
import schedule.kpi.database.notes.NotesDTO
import schedule.kpi.database.notes.NotesDTOWithID
import schedule.kpi.features.study.decodeToken

fun Application.configureNotesRouting() {
    this.routing {
        post("/note") {
            val notesController = NotesController(call)
            notesController.registerNewNote()
        }
        delete("/note/{id}") {
            val itemId = call.parameters["id"]?.toIntOrNull()
            if (itemId != null) {
                transaction { Notes.deleteWhere { Notes.id eq itemId } }
                call.respond(HttpStatusCode.OK)
            } else {
                call.respond(HttpStatusCode.BadRequest, "Invalid id format")
            }

        }
        get("/notes/{login}") {
            val groupParam = call.parameters["login"] ?: return@get call.respond(
                HttpStatusCode.BadRequest,
                "Type parameter is missing"
            )


//            val isLoginValid = transaction {
//                Notes.select { Notes.login eq groupParam }
//                    .singleOrNull() != null
//            }
//
//            if (!isLoginValid) {
//                return@get call.respond(
//                    HttpStatusCode.BadRequest,
//                    "Invalid login"
//                )
//            }


            val notesForGroup = transaction {
                Notes.select { Notes.login eq groupParam }
                    .orderBy(Notes.id, SortOrder.ASC)
                    .map {
                        NotesDTOWithID(
                            title = it[Notes.title],
                            lesson = it[Notes.lesson],
                            link = it[Notes.link],
                            content = it[Notes.content],
                            type = it[Notes.type],
                            login = it[Notes.login],
                            id = it[Notes.id].value
                                )
                    }
            }


            call.respond(notesForGroup)



            if (notesForGroup.isNotEmpty()) {
                call.respond(HttpStatusCode.OK, notesForGroup)
            } else {
                call.respond(HttpStatusCode.NotFound, "No types found for the specified group")
            }
        }
        get("/note/notesByType") {
            val groupParam = call.parameters["type"]?.toIntOrNull() ?: return@get call.respond(
                HttpStatusCode.BadRequest,
                "Type parameter is missing"
            )

            val notesForGroup = transaction {
                Notes.select { Notes.type eq groupParam }
                    .orderBy(Notes.type, SortOrder.ASC)
                    .map {
                        NotesDTOWithID(
                            title = it[Notes.title],
                            lesson = it[Notes.lesson],
                            link = it[Notes.link],
                            content = it[Notes.content],
                            type = it[Notes.type],
                            login = it[Notes.login],
                            id = it[Notes.id].value
                        )
                    }
            }
        }
    }
}