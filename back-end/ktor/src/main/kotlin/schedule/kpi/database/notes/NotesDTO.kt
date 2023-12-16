package schedule.kpi.database.notes

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.id.EntityID

@Serializable
data class NotesDTO(
        val title: String,
        val link: String,
        val content: String,
        val lesson: String,
        val type: Int,
        val login: String,
)

@Serializable
data class NotesDTOWithID(
        val title: String,
        val link: String,
        val content: String,
        val lesson: String,
        val type: Int,
        val login: String,
        val id: Int
)