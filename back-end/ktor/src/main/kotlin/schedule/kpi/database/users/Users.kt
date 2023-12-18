package schedule.kpi.database.users

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

object Users: Table("users") {
    internal val login =  Users.varchar("login", 25)
    private val password = Users.varchar("password", 25)
    private val email = Users.varchar("email", 25)
    private val secret = Users.varchar("secret", 10)
    private val admin = Users.bool("admin").default(false)

    fun insert(userDTO: UserDTO) {
        transaction {
            Users.insert {
                it[login] = userDTO.login
                it[password] = userDTO.password
                it[email] = userDTO.email ?: ""
                it[secret] = userDTO.secret
                it[admin] = userDTO.admin
            }

        }
    }
    fun fetchUser(email: String): UserDTO? {
        return try {
            transaction {
                val userModel = Users.select { Users.email eq email }.single()
                println(userModel.toString())
                UserDTO(
                        login = userModel[login],
                        password = userModel[password],
                        email = userModel[Users.email],
                        secret = userModel[secret],
                        admin = userModel[admin]
                )
            }
        } catch (e: Exception) {
            null
        }
    }
    }



