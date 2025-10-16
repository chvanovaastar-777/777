// Функция для валидации номера карты
function validateCardNumber(cardNumber) {
    // Удаляем все нецифровые символы
    const cleaned = cardNumber.replace(/\D/g, '');
    
    // Проверяем длину (13-19 цифр)
    if (cleaned.length < 13 || cleaned.length > 19) {
        return false;
    }
    
    // Алгоритм Луна для проверки номера карты
    let sum = 0;
    let shouldDouble = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned.charAt(i), 10);
        
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    
    return (sum % 10) === 0;
}

// Функция для валидации даты истечения
function validateExpirationDate(month, year) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    // Проверяем, не истекла ли карта
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return false;
    }
    
    return true;
}

// Функция для валидации CVV
function validateCVV(cvv) {
    // CVV обычно состоит из 3 или 4 цифр
    return /^\d{3,4}$/.test(cvv);
}

// Основная функция обработки платежа
async function processPayment(cardData) {
    try {
        // Валидируем данные карты
        if (!validateCardNumber(cardData.number)) {
            throw new Error('Неверный номер карты');
        }
        
        if (!validateExpirationDate(cardData.expirationMonth, cardData.expirationYear)) {
            throw new Error('Срок действия карты истек');
        }
        
        if (!validateCVV(cardData.cvv)) {
            throw new Error('Неверный CVV');
        }
        
        // Здесь должен быть код для отправки данных на сервер
        // Пример POST-запроса с использованием fetch
        const response = await fetch('/api/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardData)
        });
        
        if (!response.ok) {
            throw new Error('Ошибка при обработке платежа');
        }
        
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
    }
}

// Пример использования
// const cardData = {
//     number: '4111111111111111',
//     expirationMonth: '12',
//     expirationYear: '25',
//     cvv: '123'
// };

// processPayment(cardData)
//     .then(result => console.log('Платеж обработан:', result))
//     .catch(error => console.error('Ошибка:', error));