package schedule.kpi.features.login

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.h2.command.Token
import schedule.kpi.cache.InMemoryCache
import schedule.kpi.cache.TokenCache
import schedule.kpi.features.register.RegisterReceiveRemote
import schedule.kpi.plugins.Test
import java.util.UUID

fun Application.configureLoginRouting() {
    routing {
        post("/login") {
            val loginController = LoginController(call)
            loginController.performLogin()


            }



        }



    }


