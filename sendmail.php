<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "vikhara@yandex.ru"; // ← сюда придёт письмо
    $subject = "Новая заявка с сайта";
    $body = "Имя: $name\nEmail: $email\n\nСообщение:\n$message";
    $headers = "From: no-reply@yourdomain.ru\r\n";
    
    if (mail($to, $subject, $body, $headers)) {
        echo "✅ Заявка успешно отправлена!";
    } else {
        echo "❌ Ошибка при отправке. Попробуйте позже.";
    }
}
?>