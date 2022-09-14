import { Sequelize } from "sequelize";

// Данные приведены для примера.
// Заполните: имя баз, логин, пароль, хост, порт, диалект.
const sequelize = new Sequelize(
    'telegram_bot',
    'root',
    'root',
    {
        host: '5.188.128.98',
        port: '6432',
        dialect: 'postgres'
    }
);

export default sequelize;
