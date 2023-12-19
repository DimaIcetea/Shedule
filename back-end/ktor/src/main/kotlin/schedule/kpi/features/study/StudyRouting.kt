package schedule.kpi.features.study


import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import schedule.kpi.database.lessons.LessonDTO
import schedule.kpi.database.lessons.Lessons
import com.auth0.jwt.JWT
import com.auth0.jwt.exceptions.JWTDecodeException
import com.auth0.jwt.interfaces.DecodedJWT
import org.h2.engine.User
import schedule.kpi.database.tokens.Tokens
import schedule.kpi.database.tokens.UserFromTokenDTO
import schedule.kpi.database.users.Users

fun decodeToken(token: String): DecodedJWT? {
    try {
        return JWT.decode(token)
    } catch (e: JWTDecodeException) {
        return null
    }
}
fun Application.configureStudyRouting() {
    routing {
        post("/study") {
            val studyController = StudyController(call)
            studyController.registerNewLesson()
        }
        delete("/study"){

            val userToken = call.request.headers["Authorization"]
            if (userToken.isNullOrEmpty()) {
                call.respond(HttpStatusCode.Unauthorized, "Authorization token is missing")
                return@delete
            }

            val user = transaction { Tokens.select { Tokens.token eq userToken }
                    .map { UserFromTokenDTO( login = it[Tokens.login]) }.firstOrNull() }

            if (user?.login == null) {
                call.respond(HttpStatusCode.Unauthorized, "Invalid token.")
                return@delete
            }

            val isAdmin = transaction { Users.select { Users.login eq user.login}
                    .map { it[Users.admin] }.firstOrNull() }

            if (isAdmin?.toString() != "true") {
                call.respond(HttpStatusCode.Forbidden, "Access denied. Admin privileges required.")
                return@delete
            }


            val period = call.parameters["period"]?.toIntOrNull()
            val day = call.parameters["day"]?.toIntOrNull()
            val time = call.parameters["time"]?.toIntOrNull()

            if (period != null && day != null && time != null) {
                try {
                    transaction {
                        Lessons.deleteWhere {
                            Lessons.period eq period and
                                    (Lessons.day eq day) and
                                    (Lessons.time eq time)
                        }
                    }
                } catch (_: Exception) {}
                call.respond(HttpStatusCode.OK, "Deleted requested lesson")
            } else {
                call.respond(HttpStatusCode.BadRequest, "Invalid date format")
            }
        }
        patch("/study"){

                val userToken = call.request.headers["Authorization"]
                if (userToken.isNullOrEmpty()) {
                    call.respond(HttpStatusCode.Unauthorized, "Authorization token is missing")
                    return@patch
                }

                val user = transaction { Tokens.select { Tokens.token eq userToken }
                        .map { UserFromTokenDTO( login = it[Tokens.login]) }.firstOrNull() }

                if (user?.login == null) {
                    call.respond(HttpStatusCode.Unauthorized, "Invalid token.")
                    return@patch
                }

                val isAdmin = transaction { Users.select { Users.login eq user.login}
                        .map { it[Users.admin] }.firstOrNull() }

                if (isAdmin?.toString() != "true") {
                    call.respond(HttpStatusCode.Forbidden, "Access denied. Admin privileges required.")
                    return@patch
                }


            val period = call.parameters["period"]?.toIntOrNull()
            val day = call.parameters["day"]?.toIntOrNull()
            val time = call.parameters["time"]?.toIntOrNull()

            if (period != null && day != null && time != null) {
                val studyController = StudyController(call)
                try {
                    transaction {
                        Lessons.deleteWhere {
                            Lessons.period eq period and
                                    (Lessons.day eq day) and
                                    (Lessons.time eq time)
                        }
                    }
                } catch (_: Exception) {}
                studyController.updateLesson()
                call.respond(HttpStatusCode.OK)
            } else {
                call.respond(HttpStatusCode.BadRequest, "Invalid date format")
            }

        }
        get("/study/lessonsByGroup") {
            val groupParam = call.parameters["group"] ?: return@get call.respond(HttpStatusCode.BadRequest, "Group parameter is missing")

            val lessonsForGroup = transaction {
                Lessons.select { Lessons.group eq groupParam }
                    .orderBy(Lessons.period, SortOrder.ASC)
                    .orderBy(Lessons.day, SortOrder.ASC)
                    .orderBy(Lessons.time, SortOrder.ASC)
                    .map {
                        LessonDTO(
                            period = it[Lessons.period],
                            lesson = it[Lessons.lesson],
                            teacher = it[Lessons.teacher],
                            link = it[Lessons.link],
                            group = it[Lessons.group],
                            time = it[Lessons.time],
                            day= it[Lessons.day]
                        )
                    }
            }

            if (lessonsForGroup.isNotEmpty()) {
                call.respond(HttpStatusCode.OK, lessonsForGroup)
            } else {
                call.respond(HttpStatusCode.NotFound, "No lessons found for the specified group")
            }
        }









    }

}