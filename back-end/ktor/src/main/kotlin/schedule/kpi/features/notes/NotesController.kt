package schedule.kpi.features.notes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import org.jetbrains.exposed.exceptions.ExposedSQLException
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
                    login = notesReceiveRemote.login
                )
            )
        } catch (e: ExposedSQLException) {
            val responseModel = RegisterResponseModelEXC(message = "Something went wrong")
            call.respond(HttpStatusCode.Conflict, responseModel)
        }
        val responseModel = RegisterResponseModelEXC(message = "Added successfully")
        call.respond(HttpStatusCode.OK, responseModel)
    }}