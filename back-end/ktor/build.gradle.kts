
val ktor_version: String by project
val kotlin_version: String by project
val logback_version: String by project
val exposed_version: String by project

val postgres_version: String by project
val h2_version: String by project
plugins {
    kotlin("jvm") version "1.9.10"
    id("io.ktor.plugin") version "2.3.4"
    id("org.jetbrains.kotlin.plugin.serialization") version "1.9.10"
}


group = "schedule.kpi"
version = "0.0.1"

application {
    mainClass.set("schedule.kpi.ApplicationKt")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation ("io.ktor:ktor-server-netty: $ktor_version") // Зависимость для Netty сервера
    implementation ("io.ktor:ktor-server-core:$ktor_version")
    implementation ("io.ktor:ktor-features:1.6.8") // Зависимость для Features
    implementation ("io.ktor:ktor-serialization:$ktor_version") // Зависимость для JSON
    implementation("io.ktor:ktor-server-content-negotiation-jvm")
    implementation("io.ktor:ktor-server-core-jvm")
    implementation("io.ktor:ktor-serialization-jackson-jvm")
    implementation("io.ktor:ktor-serialization-kotlinx-json-jvm")
    implementation("io.ktor:ktor-serialization-kotlinx:$ktor_version")
    implementation("io.ktor:ktor-server-cors:$ktor_version") // Для CORS deeznuts
    implementation("org.postgresql:postgresql:$postgres_version")
    implementation("com.h2database:h2:$h2_version")

    implementation("org.jetbrains.exposed:exposed-core:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-dao:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-jdbc:$exposed_version")
    implementation("io.github.cdimascio:dotenv-java:3.0.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
    implementation("com.auth0:java-jwt:3.18.2")





    implementation("io.ktor:ktor-server-auth-jvm")
    implementation("io.ktor:ktor-client-apache-jvm")
    implementation("io.ktor:ktor-server-cio-jvm")
    implementation("ch.qos.logback:logback-classic:$logback_version")
    testImplementation("io.ktor:ktor-server-tests-jvm")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
}
