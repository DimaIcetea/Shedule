package schedule.kpi

import io.ktor.server.application.*
import io.ktor.server.cio.*
import io.ktor.server.engine.*
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Database
import schedule.kpi.plugins.*


fun configureDatabase() {
    Database.connect(
        url = "jdbc:postgresql://localhost:5432/schedule",
        driver = "org.postgresql.Driver",
        user = "postgres",
        password = "231213221"
    )

    // Инициализация таблиц Exposed здесь, если необходимо
}

fun main() {
    configureDatabase()

    embeddedServer(CIO, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    configureSerialization()
    configureDatabases()
    configureSecurity()
    configureRouting()
}
