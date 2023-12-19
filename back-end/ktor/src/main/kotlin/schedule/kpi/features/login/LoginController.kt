package schedule.kpi.features.login

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import schedule.kpi.database.tokens.TokenDTO
import schedule.kpi.database.tokens.Tokens
import schedule.kpi.database.users.Users
import schedule.kpi.features.register.FailedRegisterResponseModel
import schedule.kpi.features.register.RegisterResponseModel
import schedule.kpi.features.register.RegisterResponseModelEXC
import java.util.*

class LoginController(private val call: ApplicationCall) {

    suspend fun performLogin() {
        val receive = call.receive<LoginReceiveRemote>()
        val userDTO = Users.fetchUser(receive.email)

        if (userDTO == null) {
            val responseModel = RegisterResponseModelEXC(message = "User not found")
            call.respond(HttpStatusCode.Unauthorized, responseModel)
        } else {
            if (userDTO.password == receive.password) {
                val token = UUID.randomUUID().toString()

                val isAdmin =
                    userDTO.admin
                val userLogin = userDTO.login

                Tokens.insert(
                    TokenDTO(
                        rowId = UUID.randomUUID().toString(),
                        login = receive.email,
                        token = token
                    )
                )

                val responseModel = LoginResponseRemote(
                    email = receive.email,
                    admin = isAdmin,
                    message = "login successfully",
                    token = token,
                    login = userLogin

                )
                call.respond(HttpStatusCode.OK, responseModel)
            } else {
                val responseModel = FailedRegisterResponseModel(login = receive.email, message = "invalid password")
                call.respond(HttpStatusCode.BadRequest, responseModel)
            }
        }
    }
}