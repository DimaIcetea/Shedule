package schedule.kpi.database.notes

import kotlinx.serialization.Serializable

@Serializable
data class NotesDTO(
    val title: String,
    val link: String,
    val content: String,
    val lesson: String,
    val type: Int,

)
