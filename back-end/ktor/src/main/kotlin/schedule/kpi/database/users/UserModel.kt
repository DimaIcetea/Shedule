package schedule.kpi.database.users

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import kotlin.math.log

object Users: Table("users") {
    private val login =  Users.varchar("login", 25)
    private val password = Users.varchar("password", 25)
    private val username = Users.varchar("username", 30)
    private val email = Users.varchar("email", 25)

    fun insert(userDTO: UserDTO){
        transaction {
            Users.insert {
                it[login] = userDTO.login
                it[password] = userDTO.password
                it[username] = userDTO.username
                it[email] = userDTO.email ?: ""
            }

        }
        fun fetchUser(login: String): UserDTO{
            val userModel = Users.select { Users.login.eq(login)}.single()
            return UserDTO(
                login = userModel[Users.login],
                password = userModel[password],
                username = userModel[username],
                email = userModel[email]

            )
        }
    }


}