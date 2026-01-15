# Prueba Práctica: OpenAtlas

Este proyecto incluye un **backend en Symfony** y un **frontend en React**, ambos corriendo en contenedores Docker.

## Requisitos

- Docker y Docker Compose instalados
- Node.js y npm (opcional, solo si quieres instalar paquetes fuera del contenedor)

## Levantar la aplicación

1. Clonar el repositorio y moverse a la carpeta del proyecto:
    ```bash
git clone <URL_DEL_REPOSITORIO>
cd PruebaPractica

2. Levantar los contenedores con Docker Compose y dejar todo corriendo en segundo plano(Esto levantará tres contenedores: symfony_backend (backend Symfony en puerto 8000), mysql_db (MySQL en puerto 3306) y react_frontend (React en puerto 3000).):

docker compose up -d

### Backend (Symfony)

Una vez levantado el Backend se deben seguir lso siguientes pasos:

    Entrar al contenedor del backend:

-docker exec -it symfony_backend bash


Abrir el archivo de configuración de Apache con nano. Dependiendo de la imagen, puede estar en:

-nano /etc/apache2/sites-available/000-default.conf


-Cambiar la línea DocumentRoot /var/www/html a:

DocumentRoot /var/www/html/public

- debe quedar asi
<VirtualHost *:80>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        #ServerName www.example.com

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html/public

        <Directory /var/www/html/public>
            AllowOverride All
            Require all granted
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined


        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf
</VirtualHost>


Guardar y salir (CTRL+O, Enter, CTRL+X).


### Frontend (ReactJs)

Entrar al contenedor del frontend:

docker exec -it react_frontend bash

-npm start



