package schedule.kpi

import io.ktor.server.application.*
import io.ktor.server.cio.*
import io.ktor.server.engine.*
import org.jetbrains.exposed.sql.Database
import schedule.kpi.features.login.configureLoginRouting
import schedule.kpi.features.register.configureRegisterRouting
import schedule.kpi.plugins.configureDatabases
import schedule.kpi.plugins.configureRouting
import schedule.kpi.plugins.configureSecurity
import schedule.kpi.plugins.configureSerialization

fun configureDatabase() {
    val dbUsername = System.getProperty("DB_USERNAME")
    val dbPassword = System.getProperty("DB_PASSWORD")
    if (dbUsername == null && dbPassword == null) {
        Database.connect(
            url = "jdbc:postgresql://localhost:5432/schedule",
            driver = "org.postgresql.Driver",
            user = "postgres",
            password = "231213221"
        )
    } else {
        println("Переменные окружения DB_USERNAME и DB_PASSWORD не установлены.")
    }

    // Инициализация таблиц Exposed здесь, если необходимо
}

fun main() {
    configureDatabase()

    embeddedServer(CIO, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    configureRegisterRouting()
    configureLoginRouting()
    configureSerialization()
    configureDatabases()
    configureSecurity()
    configureRouting()
}
