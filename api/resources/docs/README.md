# Documentación Servicios Web.

Antes de continuar debe instalar *aglio* y *grunt-cli*.

Luego ejecutar *npm install*, El comando *npm install* debe ejecutarse dentro de la carpta *docs*.

En la carpta *ws* deben ir los archivos con la documentación de los servicios, y en el archivo *Gruntfile.js* se puede organizar el orden en el que
estos se obtienen.

### Para instalar Grunt-cli

sudo npm install -g grunt-cli

### Para instalar Aglio

sudo npm install -g aglio

### Ejecutar aglio y generar archivo .html

* grunt run
* aglio -i [nombre_del_archivo].apib -o [nombrel_del_archivo_origen].html

### Correr aglio como servidor.

* grunt run
* aglio -i [nombre_del_archivo].apib --server

### Para ejecutar ambos pasos al tiempo

* npm start

*este comando se debe ejecutar dentro de la carpta docs*

### Ver documentación

http://*host*/docs_ws