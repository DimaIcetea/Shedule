package schedule.kpi.features.login

import kotlinx.serialization.Serializable


@Serializable
data class LoginReceiveRemote(
    val login: String,
    val password: String
)


@Serializable
data class LoginResponseRemote(
    val login: String,
    val message: String,
    val admin: Boolean
)