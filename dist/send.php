<?php

if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['tel'])&&$_POST['tel']!="")) { //Проверка отправилось ли наше поля name и не пустые ли они

        $to = 'redmaxpromo@gmail.com'; //Почта получателя, через запятую можно указать сколько угодно адресов
        $subject = 'REDMAX Пригласить друга'; //Загаловок сообщения
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$_POST['name'].'</p>
                        <p>Email: '.$_POST['tel'].'</p>                        
                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
        $headers  = 'Content-type: text/html; charset=utf-8 \r\n'; //Кодировка письма
        $headers .= 'From: Отправитель <'.$_POST['tel'].'>\r\n'; //Наименование и почта отправителя
        mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
}

?>