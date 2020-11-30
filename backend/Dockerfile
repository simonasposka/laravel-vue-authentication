# Build backend

FROM composer:2.0 as backend

WORKDIR /app

COPY ../backend/composer.json composer.lock /app/

RUN composer install  \
  --ignore-platform-reqs \
  --no-ansi \
  --no-autoloader \
  --no-dev \
  --no-interaction \
  --no-scripts

COPY ../backend /app/
RUN composer dump-autoload --optimize --classmap-authoritative --ignore-platform-reqs

# Build app
FROM php:7.4-apache as app

RUN apt-get update -y &&\
  apt-get -y install gcc autoconf g++ zlib1g-dev \
  libbz2-dev libc-client-dev libicu-dev libkrb5-dev libmcrypt-dev libgmp3-dev libpng-dev \
  libjpeg-dev libwebp-dev libxpm-dev libfreetype6-dev libxml2-dev libxslt-dev libzip-dev

RUN docker-php-ext-install bcmath bz2 calendar ctype exif gettext gmp intl mysqli opcache \
  pcntl pdo_mysql shmop sockets xsl zip

RUN docker-php-ext-configure imap \
  --with-kerberos --with-imap-ssl &&\
  docker-php-ext-install -j$(nproc) imap

RUN docker-php-ext-configure gd \
  --with-jpeg \
  --with-xpm \
  --with-webp \
  --with-freetype &&\
  docker-php-ext-install -j$(nproc) gd

RUN pecl install igbinary mcrypt redis &&\
  docker-php-ext-enable igbinary mcrypt redis

RUN cd /usr/local/lib/php/extensions &&\
  export NEWRELIC_VERSION="$(curl -sS https://download.newrelic.com/php_agent/release/ | sed -n 's/.*>\(.*linux\).tar.gz<.*/\1/p')" &&\
  curl -sS "https://download.newrelic.com/php_agent/release/${NEWRELIC_VERSION}.tar.gz" | gzip -dc | tar oxf - &&\
  cd "${NEWRELIC_VERSION}" &&\
  NR_INSTALL_SILENT=true ./newrelic-install install &&\
  cd .. &&\
  unset NEWRELIC_VERSION &&\
  chown www-data:www-data /var/log/newrelic

RUN apt-get autoremove -y &&\
  apt-get clean &&\
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN a2enmod allowmethods rewrite  &&\
  mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" &&\
  echo 'ServerName localhost' >> /etc/apache2/apache2.conf &&\
  rm /etc/apache2/conf-enabled/other-vhosts-access-log.conf &&\
  sed -i -e 's!^ServerTokens OS!ServerTokens Prod!g' /etc/apache2/conf-available/security.conf &&\
  sed -i -e 's!^ServerSignature On!ServerSignature Off!g' /etc/apache2/conf-available/security.conf

WORKDIR /app

COPY --from=backend /app /app

RUN chgrp -R www-data /app/storage /app/bootstrap/cache && chmod -R ug+rwx /app/storage /app/bootstrap/cache
