FROM php:7.4.5-fpm

# Install dependencies
RUN apt-get update
RUN apt-get install -y --no-install-recommends \
    libgmp-dev \
    libz-dev \
    libmemcached-dev \
    libcurl4-openssl-dev \
    libonig-dev \
    libicu-dev \
    git \
    zip \
    unzip

# Cleanup
RUN apt-get autoclean -y

# Install PECL and PEAR extensions
RUN pecl install \
    memcached \
    redis \
    xdebug

# Configure php extensions
RUN docker-php-ext-configure \
    intl

# Install php extensions
RUN docker-php-ext-install \
    gmp \
    pdo_mysql \
    opcache \
    bcmath \
    pcntl \
    sysvmsg \
    intl \
    sockets

# Enable php extensions
RUN docker-php-ext-enable \
    opcache \
    memcached \
    xdebug

# Add php extensions configuration
COPY xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

# Add composer
COPY --from=composer:1.10 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER 1

# Cleanup
RUN rm -rf /var/lib/apt/lists/*
RUN rm -rf /tmp/pear/

# Setup working directory
WORKDIR /var/www/html

# Set maintainer label
LABEL maintainer=""
