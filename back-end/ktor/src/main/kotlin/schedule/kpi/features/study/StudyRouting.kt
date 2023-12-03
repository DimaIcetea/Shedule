package schedule.kpi.features.study


import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import schedule.kpi.database.lessons.Lessons

fun Application.configureStudyRouting() {
    routing {
        post("/study") {
            val studyController = StudyController(call)
            studyController.registerNewLesson()
        }
        delete("/study/{id}"){
            val itemId = call.parameters["id"]?.toIntOrNull()
            if (itemId != null) {
                transaction { Lessons.deleteWhere { Lessons.id eq itemId } }
                call.respond(HttpStatusCode.OK)
            } else {
                call.respond(HttpStatusCode.BadRequest, "Invalid id format")
            }
        }
        patch("/study/{id}"){
            val itemId = call.parameters["id"]?.toIntOrNull()
            if (itemId != null) {
                val studyController = StudyController(call)
                studyController.updateLesson()
                transaction { Lessons.deleteWhere { Lessons.id eq itemId } }
                val messageID = itemId + 1
                call.respond(message = "patched with id $messageID")
                call.respond(HttpStatusCode.OK)
            } else {
                call.respond(HttpStatusCode.BadRequest, "Invalid id format")
            }
        }




    }

}