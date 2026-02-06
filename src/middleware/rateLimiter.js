const rateLimit = require('express-rate-limit');

// Настройка: Максимум 5 попыток за 15 минут
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут в миллисекундах
    max: 5, // Лимит: 5 запросов с одного IP
    message: {
        message: "Слишком много попыток входа/регистрации. Попробуйте через 15 минут."
    },
    standardHeaders: true, // Возвращает информацию о лимите в заголовках (RateLimit-*)
    legacyHeaders: false, // Отключает старые заголовки (X-RateLimit-*)
});

module.exports = authLimiter;