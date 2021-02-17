# Projet Wishing well

## Configuration de Symfony après un git clone

- Dans le terminal, taper les commandes suivantes : 

    ```
    cd symfony
    composer install
    touch .env.local
    echo 'DATABASE_URL="mysql://explorateur:Ereul9Aeng@127.0.0.1:3306/wishingwell?serverVersion=mariadb-10.4.12"' >> .env.local
    php bin/console d:d:c
    php bin/console d:m:m --no-interaction
    php bin/console d:f:l --no-interaction
    ```

    Si vous avez un système sous Unix:

    ../symfony/
    ```
    make               # self documented makefile
    make install       # install and start the project
    ```
