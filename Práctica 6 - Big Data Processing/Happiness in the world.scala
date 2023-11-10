// Databricks notebook source
// Importamos las funciones de spark requeridas
import org.apache.spark.sql.functions.{col, max, first, desc, row_number}
import org.apache.spark.sql.expressions.{Window}

// Carga de los datasets
val df1 = spark.read.option("header", "true").format("csv").load("dbfs:/FileStore/shared_uploads/practica/datasets/world_happiness_report.csv")
val df2021 = spark.read.option("header", "true").format("csv").load("dbfs:/FileStore/shared_uploads/practica/datasets/world_happiness_report_2021.csv")

// COMMAND ----------

// ¿Cuál es el país más feliz de 2021?
val maxHappinessAt2021 = df2021.groupBy("Country name").agg(max("Ladder score") as "Ladder score").orderBy(desc("Ladder score"))

maxHappiness2021.show(1, false)

// COMMAND ----------

// ¿Cuál es el país más feliz del 2021 por continente?

val maxHappynessByRegionAt2021 = df2021.groupBy("Regional indicator").agg(first("Country name") as "Country name", max("Ladder score") as "Ladder score").orderBy(desc("Ladder score"))

maxHappynessByRegionAt2021.show

// COMMAND ----------

// ¿Cuál es el país que más veces ocupó el primer lugar en todos los años?

val maxHappinessByYear = df1
  .groupBy("year")
  .agg(max("Life Ladder") as "Ladder score")

maxHappinessByYear.alias("a")
  .join(df1, col("Ladder score") === col("Life Ladder"))
  .select(col("a.year"), col("Ladder score"), col("Country name"))
  .groupBy("Country name")
  .count()
  .sort(desc("count"))
  .show(1, false)


// COMMAND ----------

// ¿Qué puesto de Felicidad tiene el país con mayor GDP del 2020?

val data2020 = df1.filter(col("year") === "2020").orderBy(desc("Life Ladder"))

val maxGDPCountry = data2020.sort(desc("Log GDP per capita")).select(col("Country name")).head()(0)

// data2020.where(col("Country name") === maxGDPCountry).show

val windowSpec  = Window.partitionBy("Year").orderBy(desc("Life Ladder"))
val numberedData2020 = data2020.withColumn("Index", row_number.over(windowSpec))
numberedData2020.where(col("Country name") === maxGDPCountry).select("Index").show(1, false)
