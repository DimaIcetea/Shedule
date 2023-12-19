package schedule.kpi.features.study

import kotlinx.serialization.Serializable


@Serializable
data class StudyReceiveRemote(
    val lesson: String,
    val teacher: String,
    val link: String,
    val period: Int,
    val group: String,
    val time: Int,
    val day: Int
)

@Serializable
data class isAdminReceiveRemote(
    val admin: Boolean
)

