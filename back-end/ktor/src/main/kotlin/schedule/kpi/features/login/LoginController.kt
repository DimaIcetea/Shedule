package schedule.kpi.features.login

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import schedule.kpi.database.tokens.TokenDTO
import schedule.kpi.database.tokens.Tokens
import schedule.kpi.database.users.Users
import schedule.kpi.features.register.RegisterResponseModelEXC
import java.util.*

class LoginController(private val call: ApplicationCall){

    suspend fun performLogin(){


        val receive = call.receive<LoginReceiveRemote>()
        val userDTO = Users.fetchUser(receive.login)

        if(userDTO == null){
            val responseModel = RegisterResponseModelEXC(message = "User not found")
            call.respond(HttpStatusCode.Unauthorized, RegisterResponseModelEXC)
        } else {
            if(userDTO.password == receive.password){
                val token = UUID.randomUUID().toString()
                Tokens.insert(
                    TokenDTO(rowId = UUID.randomUUID().toString(), login = receive.login,
                    token = token
                )

                )
                val responseModel = LoginResponseRemote(token = token, message = "login successfully")
                call.respond(HttpStatusCode.OK, responseModel)

            }else {
                val responseModel = RegisterResponseModelEXC(message = "invalid password")
                call.respond(HttpStatusCode.BadRequest, RegisterResponseModelEXC)
            }

        }
    }

}