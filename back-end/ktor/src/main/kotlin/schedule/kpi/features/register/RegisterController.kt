package schedule.kpi.features.register

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import org.jetbrains.exposed.exceptions.ExposedSQLException
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
            val responseModel = RegisterResponseModelEXC(message = "Email is not valid")
            call.respond(HttpStatusCode.BadRequest, RegisterResponseModelEXC)
        }
        val userDTO = Users.fetchUser(registerReceiveRemote.login)

        if(userDTO != null){
            val responseModel = RegisterResponseModelEXC(message = "User already exists")
            call.respond(HttpStatusCode.BadRequest, RegisterResponseModelEXC)
        }else  {
            val token = UUID.randomUUID().toString()

            try {
                var adminKey = false
                adminKey = if (registerReceiveRemote.secret =="KPI"){
                    true
                } else{
                    false
                }
                Users.insert(
                    UserDTO(
                        login = registerReceiveRemote.login,
                        password = registerReceiveRemote.password,
                        email = registerReceiveRemote.email,
                        username = "",
                        secret = registerReceiveRemote.secret,
                        admin = adminKey




                    )
                )
            }catch (e: ExposedSQLException){
                val responseModel = RegisterResponseModelEXC(message = "User with this username already exists")
                call.respond(HttpStatusCode.BadRequest, RegisterResponseModelEXC)
            }
            Tokens.insert(TokenDTO(rowId = UUID.randomUUID().toString(), login = registerReceiveRemote.login,
                token = token
            )

            )
            val responseModel = RegisterResponseModel(token = token, message = "User registered successfully")
            call.respond(HttpStatusCode.Created, responseModel)

        }

    }
}