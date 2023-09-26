package schedule.kpi.features.study

import io.ktor.server.application.*
import io.ktor.server.routing.*


fun Application.configureStudyRouting() {
    routing {
        post("/study") {
            val studyController = StudyController(call)
            studyController.registerNewLesson()
        }
    }
}