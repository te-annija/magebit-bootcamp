<?php 

header('Content-Type: application/json');

define('DATA_FILE_NAME', __DIR__.'/data.json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include(__DIR__.'/classes/ApiHelper.php');
$api = new ApiHelper();


if (
    isset($_GET['api-name']) &&
    is_string($_GET['api-name'])
) {
    switch ($_GET['api-name']) {
        case 'add-task':
            $api->add();
            break;
        case 'get-data':
            $api->get();
            break;
        case 'delete':
            $api->delete();
            break;
        case 'update':
            $api->update();
            break;
    }

}