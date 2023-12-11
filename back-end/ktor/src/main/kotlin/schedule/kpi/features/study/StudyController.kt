package schedule.kpi.features.study

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

class StudyController(private val call: ApplicationCall) {

    suspend fun registerNewLesson() {
        val studyReceiveRemote = call.receive<StudyReceiveRemote>()



        try {


            Lessons.insert(
                LessonDTO(
                    period = studyReceiveRemote.period,
                    lesson = studyReceiveRemote.lesson,
                    teacher = studyReceiveRemote.teacher,
                    link = studyReceiveRemote.link,
                    group = studyReceiveRemote.group,
                    time = studyReceiveRemote.time,
                    day = studyReceiveRemote.day
                )
            )
        } catch (e: ExposedSQLException) {
            call.respond(HttpStatusCode.Conflict, message = "Something went wrong")
        }
        call.respond(HttpStatusCode.OK, "Added successfully")
    }
    suspend fun updateLesson() {
        val studyReceiveRemote = call.receive<StudyReceiveRemote>()



        try {


            Lessons.insert(
                LessonDTO(
                    period = studyReceiveRemote.period,
                    lesson = studyReceiveRemote.lesson,
                    teacher = studyReceiveRemote.teacher,
                    link = studyReceiveRemote.link,
                    group = studyReceiveRemote.group,
                    time = studyReceiveRemote.time,
                    day = studyReceiveRemote.day
                )
            )
        } catch (e: ExposedSQLException) {
            call.respond(HttpStatusCode.Conflict, message = "Something went wrong")
        }
    }



}


