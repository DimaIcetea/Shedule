package schedule.kpi.database.tokens

class TokenDTO (
    val rowId: String,
    val login: String,
    val token: String
)

data class UserFromTokenDTO (
        val login: String
)