# takes the .env ariables
ifneq ("$(wildcard .env)","")
    include .env
    export $(shell sed 's/=.*//' .env)
endif

# "make" command displays now the list of commands with description
.DEFAULT_GOAL := help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' ./Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[36m##/[36m/'
	@echo ''
	@echo '\033[02mIf you just cloned this repository, you should run\033[0m'"\033[01m\033[36m make install \033[0m\n"''

.PHONY: help install kill clean reset .env-symfony d-d-c d-d-drop d-m-m d-f-l d-s-v yarn-build yarn-build-watch c-c

##
##  __          ___     _     _          __          __  _ _ 
##  \ \        / (_)   | |   (_)         \ \        / / | | |
##   \ \  /\  / / _ ___| |__  _ _ __   __ \ \  /\  / /__| | |
##    \ \/  \/ / | / __| '_ \| | '_ \ / _` \ \/  \/ / _ \ | |
##     \  /\  /  | \__ \ | | | | | | | (_| |\  /\  /  __/ | |
##      \/  \/   |_|___/_| |_|_|_| |_|\__, | \/  \/ \___|_|_|
##                                     __/ |                 
##                                    |___/               
## -----------------------------------------------------------
##
install: ## Install and starts your project(Symfony + React)
 install: install-react \
	install-symfony

install-symfony: .env-symfony
	composer install
	sudo php bin/console d:d:d --if-exists --force
	sudo php bin/console d:d:c
	sudo php bin/console d:m:m --no-interaction
	sudo php bin/console d:f:l --no-interaction
	@echo '';\
	echo '   \033[1;106m                                                                  \033[0m';\
	echo '   \033[1;106m\033[1;30m   Wishing well project has been installed successfuly.   \033[1;30m/████\  \033[0m';\
	echo '   \033[1;106m\033[1;30m   Try \033[1;37mhttp://localhost:8000\033[30m\033[1;106m now!                       \033[1;30m  _|__|_  \033[0m';\
	echo '   \033[1;106m\033[1;30m                                                        \033[1;34m  ██████  \033[0m';\
	echo '   \033[1;106m\033[1;30m   Your PHP server should have started right below  |     \033[1;34m██████  \033[0m';\
	echo '   \033[1;106m\033[1;30m                                                    V             \033[0m';\
	echo '';\
	php -S 0.0.0.0:8000 -t public

install-react: 
	@echo 'No React yet.';\
	
test: 
	@xfce4-terminal --command "php -S 0.0.0.0:8000 -t public"  \
	#-e "bash -c 'make php-server; bash'" \

php-server: ## Run PHP server on port 8000
 php-server:	
	@echo '';\
	echo '   \033[1;46m                                                 \033[0m';\
	echo '   \033[30;46m\033[1;30m   PHP server started on \033[1;37mhttp://localhost:8000   \033[0m';\
	echo '   \033[3;46m                                                 \033[0m';\
	echo '';\
	php -S 0.0.0.0:8000 -t public


clean: ## Remove generated files
clean: 
	sudo rm -rf .env.local vendor node_modules var/cache/* var/log/* public/build/*

.env-symfony:
	@if [ -f .env.local ]; \
	then\
		echo '\033[0;32m Your symfony .env.local already exist.\033[0m';\
	else\
		echo '\033[0;33m Your symfony .env.local does not exist.\033[0m';\
		touch .env.local;\
		echo 'DATABASE_URL=mysql://explorateur:Ereul9Aeng@127.0.0.1:3306/wishingwell?serverVersion=mariadb-10.4.12' > .env.local;\
		echo '\033[0;32m Your symfony .env.local copy from .env has been created\033[0m';\
	fi
