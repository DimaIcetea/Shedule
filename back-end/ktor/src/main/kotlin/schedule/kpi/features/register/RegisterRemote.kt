package schedule.kpi.features.register

import kotlinx.serialization.Serializable


@Serializable
data class RegisterReceiveRemote(
    val login: String,
    val email: String,
    val password: String,
    val secret: String
)

@Serializable
data class RegisterResponseModel(
    val login: String,
    val message: String,
    val token: String,
    val isAdmin: Boolean
)

@Serializable
data class FailedRegisterResponseModel(
        val login: String,
        val message: String
)
@Serializable
data class RegisterResponseModelEXC(
    val message: String
)