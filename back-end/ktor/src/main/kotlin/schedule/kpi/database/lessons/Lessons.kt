package schedule.kpi.database.lessons

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction

object Lessons: Table() {
    private val id = Lessons.varchar("id", 50)
    private val lesson = Lessons.varchar("lesson", 25)
    private val teacher = Lessons.varchar("teacher", 50)
    private val time = Lessons.varchar("time", 25)


    fun insert(lessonDTO: LessonDTO){
        transaction {
            Lessons.insert {
                it[id] = lessonDTO.rowId
                it[lesson] = lessonDTO.lesson
                it[teacher] = lessonDTO.teacher
                it[time] = lessonDTO.time
            }

        }

    }
}