# Веб-интерфейс для проекта hackRussia 2016
Короткое описание проекта.

## Как собрать?
Для запуска тестов, сборки и локального сервера требуются глобально установленный ([https://nodejs.org/download/release/v4.2.3/](Node.js 4.x LTS версии))

Для установки зависимостей (нужны права root/admin):

bash:
`script/bootstrap`
cmd:
`script/bootstrap.cmd`

### Для разработки
Запуск локального сервера webpack-dev-server в режиме "hot"

bash:
`script/server`
cmd:
`script/server.cmd`

Приложение доступно на `8081` порту ([http://localhost:8081/](http://localhost:8081/))

### Для сборки рабочей версии
`npm build`

Приложение собирается в папку `\release`