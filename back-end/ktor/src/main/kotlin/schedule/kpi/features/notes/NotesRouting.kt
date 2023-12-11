package schedule.kpi.features.notes
import schedule.kpi.features.notes.NotesController
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import schedule.kpi.database.lessons.LessonDTO
import schedule.kpi.database.lessons.Lessons
import schedule.kpi.database.notes.Notes
import schedule.kpi.database.notes.NotesDTO

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
        get("/note/notesByType") {
            val groupParam = call.parameters["title"] ?: return@get call.respond(
                HttpStatusCode.BadRequest,
                "Type parameter is missing"
            )

            val notesForGroup = transaction {
                Notes.select { Notes.title eq groupParam }
                    .orderBy(Notes.type, SortOrder.ASC)
                    .map {
                        NotesDTO(
                            title = it[Notes.title],
                            lesson = it[Notes.lesson],
                            link = it[Notes.link],
                            content = it[Notes.content],
                            type = it[Notes.type]
                        )
                    }
            }

            if (notesForGroup.isNotEmpty()) {
                call.respond(HttpStatusCode.OK, notesForGroup)
            } else {
                call.respond(HttpStatusCode.NotFound, "No types found for the specified group")
            }
        }
    }
}