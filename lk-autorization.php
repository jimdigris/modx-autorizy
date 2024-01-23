<?php
$LOGIN = $modx->getObject('modResource', 160)->getTVValue('lk-login');
$PASS = $modx->getObject('modResource', 160)->getTVValue('lk-password');

$KEY = $modx->getObject('modResource', 160)->getTVValue('lk-key');
$COOKIE_KEY = null;

$CHUNK_FORM = $modx->getChunk('lk-form');
$CHUNK_CONTENT = $modx->getChunk('lk-content');

if (isset($_COOKIE['cookie-name'])) {
    $COOKIE_KEY = $_COOKIE['cookie-name'];
}

if ($COOKIE_KEY === $KEY) {
    return $CHUNK_CONTENT;
} else {
    return $CHUNK_FORM;
}
