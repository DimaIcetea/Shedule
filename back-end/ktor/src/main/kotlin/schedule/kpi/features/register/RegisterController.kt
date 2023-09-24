package schedule.kpi.features.register

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import org.jetbrains.exposed.exceptions.ExposedSQLException
import schedule.kpi.cache.InMemoryCache
import schedule.kpi.cache.TokenCache
import schedule.kpi.database.tokens.TokenDTO
import schedule.kpi.database.tokens.Tokens
import schedule.kpi.database.users.UserDTO
import schedule.kpi.database.users.Users
import schedule.kpi.utils.isValidEmail
import java.util.*

class RegisterController(private val call: ApplicationCall) {

    suspend fun registerNewUser()
    {
        val registerReceiveRemote = call.receive<RegisterReceiveRemote>()
        if(registerReceiveRemote.email.isValidEmail()){
            call.respond(HttpStatusCode.BadRequest, message = "Email is not valid")
        }
        val userDTO = Users.fetchUser(registerReceiveRemote.login)

        if(userDTO != null){
            call.respond(HttpStatusCode.Conflict, message = "User already exists")
        }else  {
            val token = UUID.randomUUID().toString()

            try {
                Users.insert(
                    UserDTO(
                        login = registerReceiveRemote.login,
                        password = registerReceiveRemote.password,
                        email = registerReceiveRemote.email,
                        username = ""
                    )
                )
            }catch (e: ExposedSQLException){
                call.respond(HttpStatusCode.Conflict, message = "User already exists")
            }

            Tokens.insert(TokenDTO(rowId = UUID.randomUUID().toString(), login = registerReceiveRemote.login,
                token = token
            )

            )
            call.respond(RegisterResponseModel(token=token))
        }







    }
}