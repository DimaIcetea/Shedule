package schedule.kpi.features.study

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import org.jetbrains.exposed.exceptions.ExposedSQLException
import schedule.kpi.database.lessons.LessonDTO
import schedule.kpi.database.lessons.Lessons
import java.util.*

class StudyController(private val call: ApplicationCall) {

    suspend fun registerNewLesson() {
        val studyReceiveRemote = call.receive<StudyReceiveRemote>()



        try {


            Lessons.insert(
                LessonDTO(
                    rowId = UUID.randomUUID().toString(),
                    lesson = studyReceiveRemote.lesson,
                    teacher = studyReceiveRemote.teacher,
                    time = studyReceiveRemote.time
                )
            )
        } catch (e: ExposedSQLException) {
            call.respond(HttpStatusCode.Conflict, message = "Something went wrong")
        }
        call.respond(HttpStatusCode.OK, "Added successfully")
    }

    }
