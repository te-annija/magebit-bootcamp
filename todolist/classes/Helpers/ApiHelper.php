<?php

class ApiHelper
{
    private $data;
    public function __construct() {
        $this->data = ['id_next'=> 1, 'data'=> array()];
        if (file_exists(DATA_FILE_NAME)) {
            $content = file_get_contents(DATA_FILE_NAME);
            $this->data = json_decode($content, true);
            if (!is_array($this->data)) {
                $this->data = ['id_next'=> 1, 'data'=> []];
            }
        }
    }

    public function add() {
        $output = ['status' => false];

        if (
            isset($_POST['task']) &&
            is_string($_POST['task'])
        ) {
                $task = [ "id" => $this->data['id_next'], "text" => $_POST['task'], "checked" => false];
                $this->data['data'][$this->data['id_next']] = $task;
                $this->data['id_next'] += 1;
    
                $content = json_encode($this->data);
                file_put_contents(DATA_FILE_NAME, $content);
                $output = [
                    'status' => true,
                    'message' => 'task has been added' ,
                    'data' => $this->data['data'][$this->data['id_next']-1],
                ];
        }
        echo json_encode($output);
    }

    public function get(){ 
        $output = ['status' => false];
        $content = json_encode($this->data);
        
        $output = [
            'status' => true,
            'message' => 'success',
            'data' => $this->data['data'],
        ];
        echo json_encode($output);
    }

    public function delete(){ 
        $json_task = file_get_contents('php://input');
        $task_del = json_decode($json_task, true);

        if (
            isset($task_del['id']) &&
            is_string($task_del['id'])
        ) {
            $id = $task_del['id'];
    
            foreach ($this->data['data'] as $key => $task) {
                if($key == $id){ 
                    unset($this->data['data'][$key]); 
                }
                
            }
            
            $content = json_encode($this->data);
            file_put_contents(DATA_FILE_NAME, $content);
            $output = [
                'status' => true,
                'message' => 'task has been deleted' 
            ];
        }
        echo json_encode($output);
    }

    public function update(){ 
        $json_task = file_get_contents('php://input');
        $task_upd = json_decode($json_task, true);
        if (
            isset($task_upd['id']) &&
            is_string($task_upd['id'])
        ) {
            $id = $task_upd['id'];
    
            foreach ($this->data['data'] as $key => $task) {
                if($key == $id){ 
                    if(isset($task_upd['text']) &&
                    is_string($task_upd['text'])) { 
                        $text = $task_upd['text'];
                        $this->data['data'][$key]['text'] = $text;
                    }
                    if(isset($task_upd['checked'])) { 
                        
                        $checked = $task_upd['checked'];
                        $this->data['data'][$key]['checked'] = $checked;
                    }
                }
            }
            
            $content = json_encode($this->data);
            file_put_contents(DATA_FILE_NAME, $content);
            $output = [
                'status' => true,
                'message' => 'task has been updated' 
            ];
        }
        echo json_encode($output);
    }
}