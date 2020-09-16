FROM php:7.3-fpm

LABEL name="Juan Carlos Perdomo Quiceno"
LABEL maintainer="jcpq60981@gmail.com"


ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get -y upgrade

#install composer 
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php
RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# install nodejs (laravel-echo-server)
RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get -y install nodejs
RUN apt-get install build-essential

# install supervisor jobs
RUN apt-get -y install supervisor

# install crontab
RUN apt-get -y install cron

# install  laravel-echo-server
RUN npm install -g laravel-echo-server

# install extencion php
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN pecl install redis && docker-php-ext-enable redis
RUN apt-get update
RUN apt-get install -y libzip-dev
RUN docker-php-ext-install zip
RUN apt-get update && \
    apt-get install -y libfreetype6-dev libjpeg62-turbo-dev && \
    docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/  &&  \
    docker-php-ext-install gd
# clear  lib
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# copy source sh
COPY ./docker/start.sh /home/start.sh

COPY ./docker/crontab /etc/crontab

# copy
RUN chmod 777 /home/start.sh

# Set working directory
WORKDIR /var/www/laravel

# Expose ports
EXPOSE 9000
EXPOSE 6001

# execute command
CMD ["/home/start.sh"]

