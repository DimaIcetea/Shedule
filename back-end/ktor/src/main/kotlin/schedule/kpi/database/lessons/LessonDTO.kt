package schedule.kpi.database.lessons

import kotlinx.serialization.Serializable

@Serializable
data class LessonDTO(
    val lesson: String,
    val teacher: String,
    val period: Int,
    val link: String,
    val group: String,
    val time: Int,
    val day: Int
)
