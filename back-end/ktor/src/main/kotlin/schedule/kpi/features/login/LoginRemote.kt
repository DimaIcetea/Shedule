package schedule.kpi.features.login

import kotlinx.serialization.Serializable


@Serializable
data class LoginReceiveRemote(
    val email: String,
    val password: String
)


@Serializable
data class LoginResponseRemote(
    val login: String,
    val token:String,
    val email: String,
    val message: String,
    val admin: Boolean
)

