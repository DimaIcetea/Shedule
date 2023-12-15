package schedule.kpi.features.register

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import schedule.kpi.features.study.decodeToken
import schedule.kpi.features.register.RegisterReceiveRemote
import kotlin.math.log

fun Application.configureRegisterRouting() {
    routing {
        post("/register") {
            val userToken = call.request.headers["Authorization"] // Получаем токен из заголовков

            if (userToken.isNullOrEmpty()) {
                call.respond(HttpStatusCode.Unauthorized, "Authorization token is missing")
                return@post
            }

            val decodedToken = decodeToken(userToken)

            if (decodedToken?.getClaim("admin")?.asBoolean() == true) {
                val registerController = RegisterController(call)
                val loginUser = decodedToken.getClaim("login")?.asString() ?: "unknown" // Предположим, что логин пользователя хранится в токене
                registerController.registerNewUser()
                val message = RegisterResponseModel(login = loginUser, message = "admin registered")
                call.respond(HttpStatusCode.Created, message)
            }
            else{
                val registerController = RegisterController(call)
                val loginUser = decodedToken?.getClaim("login")?.asString() ?: "unknown" // Предположим, что логин пользователя хранится в токене
                registerController.registerNewUser()
                val message = RegisterResponseModel(login = loginUser, message = "user registered")
                call.respond(HttpStatusCode.Created, message)
            }
        }

    }
}