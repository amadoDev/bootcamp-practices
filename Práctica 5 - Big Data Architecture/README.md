Hola Ricardo. No está terminado, ha sido un mes bastante complicado y a pesar de esforzarme por ponerme al día y terminarla, no me ha dado tiempo. Tengo la esperanza de que tardes algún día en corregir esta práctica para poder hacerla bien y terminarla y que no llegues ni a leer este mensaje. Y si por mala suerte lo llegas a leer, quizás, y sólo quizás, se te ocurre hacer la vista gorda, pasar a la de otro compañero y dejar ésta para otro día. Si resulta que es la última que te queda por corregir y no la ves APTA, pues es lo que hay, y la dejamos para la reentrega. Gracias!


## Brainstorm
- Fórmula 1, fútbol, compras de ropa online
- Ropa online: crawler Zara
- Alertas de bajadas de precio

## Diseño del DAaaS
### Definición la estrategia del DAaaS:
La ropa de Zara está muy demandada y muchas de las prendas más solicitadas cuando bajan de precio se agotan en cuestión de minutos y horas. En Zara existe una sección llamada ‘Special Prices’ en la que ponen prendas rebajadas que van cambiando cada mes y se actualizan cada semana, pero no se sabe cuáles ni en qué momento. La idea es poder recibir una alerta de cuándo baja de precio cualquier artículo o los que tengas guardados en una lista.


### Arquitectura DAaaS
- Fuente de datos
    - Scrapper para obtener todas las urls del sitio web de Zara, las cuales filtramos y nos quedamos sólo con las que correspondan a productos.
    - Crawler de las páginas obtenidas.
- Components
    - Hadoop para el procesamiento de datos
    - Google Cloud Storage para ficheros de crawler
    - Google Cloud Functi-ons para scrappers, crawlers y alertas


### DAaaS Operating Model Design and Rollout
1. Obtener todas las urls actuales del site de Zara en español.
2. Filtrar las urls para quedarnos sólo con los productos.
3. Lanzar un primer crawler inicial para guardar la info de cada producto.
4. Crear un script para crawlear sólo los productos que nos interesa cada X tiempo y comprobar si el precio ha variado.
5. Crear otro script para lanzar una alerta en caso de que algún producto esté rebajado. 


### Desarrollo de la plataforma DAaaS. (ligera descripción del desarrollo)
Construcción iterativa de todas las capacidades de la plataforma, incluido el diseño, desarrollo e integración, pruebas, carga de datos, metadatos y población de catálogos, y despliegue.




Link a Diagrama:

