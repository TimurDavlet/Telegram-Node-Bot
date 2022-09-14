import TelegramApi from 'node-telegram-bot-api';
import nodemon from 'nodemon';
import axios from 'axios';
import { token, weatherApiKey, textRead } from './config.js';
import { routes } from './routes.js';
import sequelize from './db.js';
import User from './models.js';

const bot = new TelegramApi(token, {polling: true});

const state = {userMessage: '', save: false}

const getWeather = async (key) => {
    try {
        const response = await axios.get(routes.weather(key), {
            headers: {
              accept: 'application/json',
            },
          });
          return response.data;
    } catch(e) {
        console.log(`Error ${e}`)
    }
};

const sendUserMessage = async (text, usersId) => {
    usersId.array.forEach(element => {
        const id = element.chatId;
        bot.sendMessage(id, text, bottoms);
    });
};

const bottoms = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {text: 'Погода в Канаде', callback_data: 'weather'},
                {text: 'Хочу почитать!', callback_data: 'read'},
                {text: 'Сделать рассылку', callback_data: 'mailing_list'}
            ]
        ]
    })
};

const bottomMailingList = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {text: 'Уверен', callback_data: 'yes'},
                {text: 'Отмена', callback_data: 'no'}
            ]
        ]
    })
};

export default async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

    } catch(e) {
        console.log('Проблемы с подключением к БД', e)
    }

    bot.on('message', async msg => {
        try {
            const text = msg.text;
            const { id } = msg.chat;
            if (text === '/start') {
                await User.create({id});
                return bot.sendMessage(id, 'Здравствуйте. Нажмите на любую интересующую Вас кнопку', bottoms);
            }
            else if (state.save) {
                state.userMessage = text;
                state.save = false;
                const usersId = await User.findAll({raw:true});
                await sendUserMessage(text, usersId);
                return bot.sendMessage(id, 'Сообщение отправленно всем пользователям.', bottoms);
            }
            return bot.sendMessage(id, 'Я тебя не понимаю, попробуй еще раз =)', bottoms);
        } catch(e) {
            console.log(`Error ${e}`)
        }
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        state.save ? state.userMessage = msg.text : null;
        switch (data) {
            case 'weather':
                try {
                    const weatherObj = await getWeather(weatherApiKey);
                    const minTemp = Math.floor(weatherObj.main.temp_min);
                    const maxTemp =  Math.floor(weatherObj.main.temp_max);
                    const description = weatherObj.weather[0].description;
                    return bot.sendMessage(chatId, `Оттава, Онтарио, Канада. Сегодня ${description}. Максимальная температура: ${maxTemp}°C, минимальная температура ${minTemp}°C.`, bottoms);
                } catch(e) {
                    console.log(`Error ${e}`);
                    return bot.sendMessage(chatId, 'Ошибка соеденения с сервисом погоды. Попробуйте позже.', bottoms);
                }
            case 'read':
                try {
                    await bot.sendPhoto(chatId, 'https://pythonist.ru/wp-content/uploads/2020/03/photo_2021-02-03_10-47-04-350x2000-1.jpg');
                    await bot.sendMessage(chatId, textRead);
                    return bot.sendDocument(chatId, 'https://drive.google.com/uc?id=1Xs_YjOLgigsuKl17mOnR_488MdEKloCD&export=download', bottoms);
                } catch(e) {
                    console.log(`Error ${e}`);
                    return bot.sendMessage(chatId, 'Что-то пошло не так. Попробуйте позже.', bottoms);
                }
            case 'mailing_list':
                return bot.sendMessage(chatId, 'Вы выбрали рассылку всем пользователям. Вы уверен что хотите это сделать?', bottomMailingList)
            case 'no':
                return bot.sendMessage(chatId, 'Действие отменено', bottoms);
            case 'yes':
                state.save = true;
                return bot.sendMessage(chatId, 'Введите сообщение, которое хотите отправить всем пользователям.');
        }
    })
};
