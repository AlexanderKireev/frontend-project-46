### Hexlet tests and linter status, buid-lint-test, Codeclimate maintainability, test coverage:
[![Actions Status](https://github.com/AlexanderKireev/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/AlexanderKireev/frontend-project-46/actions/workflows/hexlet-check.yml)
[![Linter Status](https://github.com/AlexanderKireev/frontend-project-46/actions/workflows/build-lint-test.yml/badge.svg)](https://github.com/AlexanderKireev/frontend-project-46/actions/workflows/build-lint-test.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/044f572b4e80e1a4da9c/maintainability)](https://codeclimate.com/github/AlexanderKireev/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/044f572b4e80e1a4da9c/test_coverage)](https://codeclimate.com/github/AlexanderKireev/frontend-project-46/test_coverage)

## Проект "Вычислитель отличий" ("Difference Calculator")
Выполнен в рамках обучения в компании "Хекслет" ("Hexlet Ltd.") на курсе "фронтенд-разработчик".

Принят: XX XXXX 2023 года. Студент: Киреев Александр. Куратор: Лаврухин Юрий ("Hexlet Ltd.").

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://ru.hexlet.io/pages/about?utm_source=github&utm_medium=link&utm_campaign=java-package)

Аналогичный проект, выполненный в рамках курса "Хекслет, java-разработчик" представлен по [ссылке](https://github.com/AlexanderKireev/java-project-71).

## Полученные навыки:

- работа с разными форматами данных: json, yaml
- парсинг JSON.parse
- CLI Builder (commander.js)
- работа с модулями fs, path, process, js-yaml, lodash
- Continuous Integration (Github Actions)
- фреймворк Jest
- TDD программирование
- работа с Test Coverage

## Минимальные требования
```sh
node.js 20.7.0
commander 11.1.0
js-yaml 4.1.0
lodash 4.17.21
make
```
<!-- ## Установка проекта
```sh
npm install @hexlet/code
``` -->
## Установка зависимостей
```sh
make install
```
## Глобальная установка пакета
```sh
npm link
```
## Запуск пакета (вывод справки)
```sh
make run
```
## Линтер
```sh
make lint
```
## Запуск тестов
```sh
make test
make test-coverage
```
## Описание проекта
Результат Проекта - консольная утилита `gendiff`, сравнивающая содержимое двух текстовых файлов (информацию об обмене данными). Поддерживаются два формата сравниваемых файлов: `Json` и `Yaml` (файлы с расширениями .json, .yml, .yaml).

Формат командной строки утилиты:
```java
gendiff [-hV] [-f=<formatName>] <filepath1> <filepath2>
```

Возможны как абсолютные, так и относительные пути к файлам. 

Параметры утилиты `gendiff`: 
```java
-h, --help      вывод справки по утилите
-V, --version   версия утилиты 
<filepath1>     путь к первому файлу     
<filepath2>     путь ко второму файлу
-f, --format    выбор формата вывода информации
```
#### Пример вывода справки (2 шаг Проекта):
[![asciicast](https://asciinema.org/a/620267.svg)](https://asciinema.org/a/620267)

#### Пример сравнения Json-файлов (4 шаг Проекта):
[![asciicast](https://asciinema.org/a/620271.svg)](https://asciinema.org/a/620271)

#### Пример сравнения Yaml-файлов (6 шаг Проекта):
[![asciicast](https://asciinema.org/a/620269.svg)](https://asciinema.org/a/620269)

Поддерживается также рекурсивное сравнение вложенных структур.

Необязательный параметр - выбор формата генерации отчета. Определяется командой `-f (--format)` из трех возможных: `stylish` (по умолчанию), `plain` и `json`.
#### Шаг 7 Проекта: пример дифа для вложенных структур в формате stylish
[![asciicast](https://asciinema.org/a/620285.svg)](https://asciinema.org/a/620285)

#### Шаг 8 Проекта: вывод в формате plain
[![asciicast](https://asciinema.org/a/620275.svg)](https://asciinema.org/a/620275)

#### Шаг 9 Проекта: вывод в формате json
[![asciicast](https://asciinema.org/a/620277.svg)](https://asciinema.org/a/620277)
