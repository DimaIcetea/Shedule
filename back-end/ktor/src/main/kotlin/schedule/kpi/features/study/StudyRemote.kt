package schedule.kpi.features.study

import kotlinx.serialization.Serializable


@Serializable
data class StudyReceiveRemote(
    val lesson: String,
    val teacher: String,
    val time: String
)

