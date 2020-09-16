#!/bin/bash
cd /var/www/laravel
npm install
composer install
chmod 777 -R /var/www/laravel/storage/
service cron force-reload
service cron start
php artisan key:generate
php artisan jwt:secret -f
php artisan storage:link
php artisan config:clear
service supervisor start
php-fpm
