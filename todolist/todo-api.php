<?php 

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
define('DATA_FILE_NAME', 'data.json');

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);


$data = ['id_next'=> 1, 'data'=> array()];
$output = [
    'status' => false
];

if (file_exists(DATA_FILE_NAME)) {
    $content = file_get_contents(DATA_FILE_NAME);
    $data = json_decode($content, true);
    if (!is_array($data)) {
        $data = ['id_next'=> 1, 'data'=> []];
    }
}

if (
    isset($_GET['api-name']) &&
    is_string($_GET['api-name'])
) {
    $action = $_GET['api-name'];
    if($action == 'add-task'){
        if (
            isset($_POST['task']) &&
            is_string($_POST['task'])
        ) {
                $task = [ "id" => $data['id_next'], "text" => $_POST['task'], "checked" => false];
                $data['data'][$data['id_next']] = $task;
                $data['id_next'] += 1;
    
                $content = json_encode($data);
                file_put_contents(DATA_FILE_NAME, $content);
                $output = [
                    'status' => true,
                    'message' => 'task has been added' ,
                    'data' => $data['data'][$data['id_next']-1],
                ];
        }
    }
    else if($action == 'get-data'){
    
        $content = json_encode($data);
        
        $output = [
            'status' => true,
            'message' => 'success',
            'data' => $data['data'],
        ];
    }
    else if($action == 'delete'){
        $json_task = file_get_contents('php://input');
        $task_del = json_decode($json_task, true);

        if (
            isset($task_del['id']) &&
            is_string($task_del['id'])
        ) {
            $id = $task_del['id'];
    
            foreach ($data['data'] as $key => $task) {
                if($key == $id){ 
                    unset($data['data'][$key]); 
                }
                
            }
            
            $content = json_encode($data);
            file_put_contents(DATA_FILE_NAME, $content);
            $output = [
                'status' => true,
                'message' => 'task has been deleted' 
            ];
        }
    }
    else if($action == 'update'){ 
        $json_task = file_get_contents('php://input');
        $task_upd = json_decode($json_task, true);
        if (
            isset($task_upd['id']) &&
            is_string($task_upd['id'])
        ) {
            $id = $task_upd['id'];
    
            foreach ($data['data'] as $key => $task) {
                if($key == $id){ 
                    if(isset($task_upd['text']) &&
                    is_string($task_upd['text'])) { 
                        $text = $task_upd['text'];
                        $data['data'][$key]['text'] = $text;
                    }
                    if(isset($task_upd['checked'])) { 
                        $checked = isset($task_upd['checked']);
                        $data['data'][$key]['checked'] = $checked;
                    }
                }
            }
            
            $content = json_encode($data);
            file_put_contents(DATA_FILE_NAME, $content);
            $output = [
                'status' => true,
                'message' => 'task has been updated' 
            ];
        }
    }


}
    
echo json_encode($output);
