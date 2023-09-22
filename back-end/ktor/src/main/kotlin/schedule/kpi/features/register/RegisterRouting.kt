package schedule.kpi.features.register

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import schedule.kpi.cache.InMemoryCache
import schedule.kpi.cache.TokenCache
import schedule.kpi.features.login.LoginReceiveRemote
import schedule.kpi.features.login.LoginResponseRemote
import schedule.kpi.utils.isValidEmail
import java.util.*

fun Application.configureRegisterRouting() {
    routing {
        post("/register") {
            val receive = call.receive<RegisterReceiveRemote>()
            if(receive.email.isValidEmail()){
                call.respond(HttpStatusCode.BadRequest, message = "Email is not valid")
            }

            if(InMemoryCache.userList.map { it.login }.contains(receive.login))
            {
                call.respond(HttpStatusCode.Conflict, message = "User already exists")
            }
            val token = UUID.randomUUID().toString()
            InMemoryCache.userList.add(receive)
            InMemoryCache.token.add(TokenCache(login = receive.login, token = token))






            call.respond(RegisterResponseModel(token=token))
        }



    }
}