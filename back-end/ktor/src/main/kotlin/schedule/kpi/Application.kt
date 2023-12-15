package schedule.kpi

import io.github.cdimascio.dotenv.Dotenv
import io.ktor.http.*
import io.ktor.serialization.jackson.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.cio.*
import io.ktor.server.engine.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.modules.SerializersModule
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import schedule.kpi.database.tokens.Tokens
import schedule.kpi.features.login.configureLoginRouting
import schedule.kpi.features.notes.configureNotesRouting
import schedule.kpi.features.register.configureRegisterRouting
import schedule.kpi.features.study.configureStudyRouting
import schedule.kpi.plugins.configureDatabases
import schedule.kpi.plugins.configureRouting
import schedule.kpi.plugins.configureSecurity
import schedule.kpi.plugins.configureSerialization



fun configureDatabase() {
    val dotenv = Dotenv.load()
    val dbHost = dotenv["DB_HOST"]
    val dbName = dotenv["DB_NAME"]
    val dbDriver = dotenv["DB_DRIVER"]
    val dbUser = dotenv["DB_USER"]
    val dbPassword = dotenv["DB_PASSWORD"]
        Database.connect(
            url = "jdbc:postgresql://$dbHost/$dbName",
            driver = dbDriver,
            user = dbUser,
            password = dbPassword
        )
}


fun Application.configureContentNegotiation() {
    install(ContentNegotiation) {
        json(
            contentType = ContentType.Application.Json,
            json = kotlinx.serialization.json.Json {
                coerceInputValues = true
                isLenient = true
            }
        )
        jackson()
    }
}

fun main() {
    configureDatabase()
    embeddedServer(CIO, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    configureContentNegotiation()
    configureRegisterRouting()
    configureLoginRouting()
    configureSerialization()
    configureDatabases()
    configureSecurity()
    configureRouting()
    configureStudyRouting()
    configureNotesRouting()
    routing {
        get("/checkToken") {
            val token = call.request.header("Authorization")?.removePrefix("Bearer ")

            if (token != null && isValidToken(token)) {
                call.respond(HttpStatusCode.OK, "Token is valid")
            } else {
                call.respond(HttpStatusCode.Unauthorized, "Token is not valid")
            }
        }
    }
}
fun isValidToken(tokenValue: String): Boolean {
    var isValid: Boolean = false

    transaction {
        val result = Tokens.select { Tokens.token eq tokenValue }

        if (!result.empty()) {
            isValid = true
        }
    }
    return isValid
}
