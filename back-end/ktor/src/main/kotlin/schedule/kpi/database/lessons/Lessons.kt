package schedule.kpi.database.lessons

import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.statements.InsertStatement
import org.jetbrains.exposed.sql.transactions.transaction

object Lessons: IntIdTable() {
    internal val period = Lessons.integer("period")
    internal val lesson = Lessons.varchar("lesson", 25)
    internal val teacher = Lessons.varchar("teacher", 30)
    internal val link = Lessons.varchar("link", 128)
    internal val group = Lessons.varchar("group", 10)
    internal val time = Lessons.integer("time")
    internal val day = Lessons.integer("day")


    fun insert(lessonDTO: LessonDTO){
        transaction {
            Lessons.insert {
                it[period] = lessonDTO.period
                it[lesson] = lessonDTO.lesson
                it[teacher] = lessonDTO.teacher
                it[link] = lessonDTO.link
                it[group] = lessonDTO.group
                it[day]=lessonDTO.day
                it[time]=lessonDTO.time
            }

        }

    }
}


