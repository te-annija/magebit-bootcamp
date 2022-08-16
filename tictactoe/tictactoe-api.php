<?php 

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
define('DATA_FILE_NAME', __DIR__ .'/tictactoe-data.json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include( __DIR__ .'/classes/Helpers/ApiHelper.php');
$api = new ApiHelper();



if (
    isset($_GET['api-name']) &&
    is_string($_GET['api-name'])
) {

    switch ($_GET['api-name']) {
        case 'add-data':
            $api->add();
            break;
        case 'get-data':
            $api->get();
            break;
        case 'reset':
            $api->reset();
            break;

    }
}
