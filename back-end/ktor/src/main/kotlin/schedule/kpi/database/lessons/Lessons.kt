package schedule.kpi.database.lessons

import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction

object Lessons: IntIdTable() {
    private val period = Lessons.varchar("period", 5)
    internal var lesson = Lessons.varchar("lesson", 25)
    private val teacher = Lessons.varchar("teacher", 30)
    private val link = Lessons.varchar("link", 128)


    fun insert(lessonDTO: LessonDTO){
        transaction {
            Lessons.insert {
                it[period] = lessonDTO.period
                it[lesson] = lessonDTO.lesson
                it[teacher] = lessonDTO.teacher
                it[link] = lessonDTO.link
            }

        }

    }
}