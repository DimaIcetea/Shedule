package schedule.kpi.database.lessons

import org.jetbrains.exposed.sql.Op
import org.jetbrains.exposed.sql.SqlExpressionBuilder

class LessonDTO (
    val lesson: String,
    val teacher: String,
    val period: String,
    val link: String
)
