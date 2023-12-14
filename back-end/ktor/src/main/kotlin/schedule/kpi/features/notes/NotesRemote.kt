package schedule.kpi.features.notes

import kotlinx.serialization.Serializable


@Serializable
data class NotesReceiveRemote(
    val title: String,
    val link: String,
    val content: String,
    val lesson: String,
    val type: Int,
    val login: String
)
