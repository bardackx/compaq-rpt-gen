# Generador de archivos RPT de COMPAQ

## Github pages
https://bardackx.github.io/compaq-rpt-gen/

## Columnas
En este textarea debe ir un CSV (donde la primer columna es el nombre de la columna del resultado de la consulta SQL y la segunda es el titulo de la columna en el reporte de salida que genera COMPAQ) como el siguiente
```
col1, Columna uno
col2, Columna dos
dol3, Etcetera
```
## SQL
Aqui va la consulta SQL del reporte

## RPT
Aqui queda el RPT generado a partir de **Columnas** y **SQL**.

## TODO
Sería bueno tener las siguientes funcionalidades:
- Parametros
- Llenar en automatico column y header a partir del SQL cargado
- Librería de funciones
- Usar el atributo format
