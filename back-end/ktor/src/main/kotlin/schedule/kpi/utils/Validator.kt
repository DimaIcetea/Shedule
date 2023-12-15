package schedule.kpi.utils

import java.util.regex.Pattern

fun String.isValidEmail(): Boolean {
    val emailRegex = ("^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}\$")

    val pattern = Pattern.compile(emailRegex)
    val matcher = pattern.matcher(this)

    return matcher.matches()
}