package schedule.kpi.cache

import schedule.kpi.features.register.RegisterReceiveRemote


data class TokenCache(
    val login: String,
    val token: String
)
object InMemoryCache {
    val userList: MutableList<RegisterReceiveRemote> = mutableListOf()
    val token: MutableList<TokenCache> = mutableListOf()
}