package schedule.kpi.features.register

import io.ktor.server.application.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable

fun Application.configureRegisterRouting() {
    routing {
        post("/register") {
            val registerController = RegisterController(call)
            registerController.registerNewUser()
        }
    }
}