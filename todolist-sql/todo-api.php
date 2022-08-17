<?php

use Helpers\ApiHelper;

header('Content-Type: application/json');

define('DATA_FILE_NAME', __DIR__.'/data.json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include(__DIR__.'/config.php');
include(__DIR__.'/classes/Helpers/DbManager.php');
include(__DIR__.'/classes/Helpers/ApiHelper.php');
$api = new ApiHelper();


if (
    isset($_GET['api-name']) &&
    is_string($_GET['api-name'])
) {
    switch ($_GET['api-name']) {
        case 'add-task':
            $api->add()->output();
            break;
        case 'get-data':
            $api->get()->output();
            break;
        case 'delete':
            $api->delete()->output();
            break;
        case 'update':
            $api->update()->output();
            break;
    }

}