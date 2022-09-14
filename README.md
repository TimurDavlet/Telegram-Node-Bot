## Телеграм Бот

### Тестовое задание для Группа компаний ATK

Для запуска в режиме разработки:
npm run dev

Для запуска на проде:
npm run start

Необходимо указать:
Токен бота - config.js
Данные для подключения к БД - db.js

### Задание:

Тестовое задание состоит из основных нужных нам в работе инструментов собраных в одном месте.

Проект должен быть на Nodejs, должна использоваться база данных PostgreSQL.

При отправке команды /start бот должен сохранить информацию о пользователе в таблицу в базу данных и выдать сообщение:

“Здравствуйте. Нажмите на любую интересующую Вас кнопку”

и должны быть кнопки:

“Погода в Канаде”
“Хочу почитать!”
“Сделать рассылку”

функционал этих кнопок расписан ниже


Погода в Канаде
При нажатии на эту кнопку пользователю должно прийти сообщение с текстом информирующем о сегодняшней погоде в Канаде.

Апи для погоды и формат соообщения на Ваш выбор.

Хочу почитать!
При нажатии на эту кнопку пользователю должно прийти 2 сообщения.

В первом сообщении должна быть картинка, взятая из этой ссылке и текст:

“Идеальный карманный справочник для быстрого ознакомления с особенностями работы разработчиков на Python. Вы найдете море краткой информации о типах и операторах в Python, именах специальных методов, встроенных функциях, исключениях и других часто используемых стандартных модулях.”

Во втором сообщении должен быть прикреплен архив взятый по этой ссылке

Сделать рассылку
При нажатии на эту кнопку у пользователя должна быть возможность отправить всем ранее написавшим пользователям сообщение.

Бот должен написать:

“Вы выбрали рассылку всем пользователям. Вы уверен что хотите это сделать?”

и должна быть кнопки “Уверен” и “Отмена”

При нажатии на кнопку “Отмена” диалог должен завершиться.

При нажатии на кнопку “Уверен” бот присылает сообщение:

“Введите сообщение, которое хотите отправить всем пользователям.”

Ожидается ввод текста пользователем.

Это сообщение нужно разослать всем пользователям.

После успешной рассылки нужно пользователю прислать подтверждение об этом.

Важное дополнение
Плюсом будет являться readme файл с инструкцией по запуску и вынос всех констант в env файл.

На выполнение тестового задание дается максимум 3 дня.
Задание загрузить на Github или Gitlab и предоставить ссылку.

На проверку тестового задания нам нужен 1 день. 

По итогам выполненного тестового задания будет принято решение о принятии Вас к нам в команду.

