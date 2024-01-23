<?php
$LOGIN = $modx->getObject('modResource', 160)->getTVValue('lk-login');
$PASS = $modx->getObject('modResource', 160)->getTVValue('lk-password');
$KEY = $modx->getObject('modResource', 160)->getTVValue('lk-key');

$user_login = $_REQUEST['login'];                                                                   // получить логин от пользователя
$user_pass = $_REQUEST['pass'];                                                                     // получить пароль от пользователя

$response = (($user_login === $LOGIN) && ($user_pass === $PASS)) ? $KEY : false;                    // если все верно вернуть ключ для куки

echo json_encode($response, true);                                                                  // отправить ответ