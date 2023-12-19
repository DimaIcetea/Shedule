package schedule.kpi.features.register

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import schedule.kpi.features.study.decodeToken
import schedule.kpi.features.register.RegisterReceiveRemote
import kotlin.math.log


fun Application.configureRegisterRouting() {
    routing {
        post("/register") {
            val registerController = RegisterController(call)
            registerController.registerNewUser()


        }
    }
}