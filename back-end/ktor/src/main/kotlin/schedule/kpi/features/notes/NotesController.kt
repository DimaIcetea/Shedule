package schedule.kpi.features.notes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.exceptions.ExposedSQLException
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import schedule.kpi.database.lessons.LessonDTO
import schedule.kpi.database.lessons.Lessons
import schedule.kpi.database.notes.Notes
import schedule.kpi.database.notes.NotesDTO
import schedule.kpi.features.register.RegisterResponseModelEXC

class NotesController(private val call: ApplicationCall) {

    suspend fun registerNewNote() {
        val notesReceiveRemote = call.receive<NotesReceiveRemote>()



        try {


            Notes.insert(
                NotesDTO(
                    title = notesReceiveRemote.title,
                    lesson = notesReceiveRemote.lesson,
                    type = notesReceiveRemote.type,
                    link = notesReceiveRemote.link,
                    content = notesReceiveRemote.content,
                )
            )
        } catch (e: ExposedSQLException) {
            val responseModel = RegisterResponseModelEXC(message = "Something went wrong")
            call.respond(HttpStatusCode.Conflict, RegisterResponseModelEXC)
        }
        val responseModel = RegisterResponseModelEXC(message = "Added successfully")
        call.respond(HttpStatusCode.OK, RegisterResponseModelEXC)
    }}