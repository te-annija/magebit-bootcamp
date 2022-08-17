<?php
namespace Helpers;

use DbManager;

class ApiHelper
{
    private $output_arr = ['status' => false];
    private $todo_db;

    public function __construct() {
        $this->todo_db = new DbManager();
    }

    public function add() {
        if (!$this->hasPostKey('task')) {
            $this->output_arr['message'] = 'something is not set';
            return $this;
        }
        $task_text = $_POST['task'];

        if(strlen($task_text) >30){ 
            $this->output_arr['message'] = 'text is too long';
            return $this;
        }

        $task_id = $this->todo_db->add([
            'task' => $task_text,
            'checked' => 0,
        ]);
        if($task_id == -1){ 
            $this->output_arr['message'] = 'something went wrong';
            return $this;
        }

        $data = ['id'=> $task_id, 'text'=> $_POST['task']];
        $this->output_arr = [
            'status' => true,
            'message' => 'task has been stored',
            'data' => $data,
        ];

        return $this;
    }

    public function get() {
        $data = $this->todo_db->getAll();
        
        $this->output_arr = [
            'status' => true,
            'data' => $data,
            'message' => 'all entries where recived'
        ];
        return $this;
    }

    public function delete() {
        $json_task = file_get_contents('php://input');
        $task_del = json_decode($json_task, true);

        if (!$this->hasInputKey($task_del['id'])) {
            $this->output_arr = [
                'status' => false,
                'message' => 'no id submited'
            ];
            return $this;
        }

        $id = $task_del['id'];

        if($this->todo_db->delete($id)) {
            $this->output_arr = [
                'status' => true,
                'message' => 'task has been deleted'
            ];
        }
        else {
            $this->output_arr = [
                'status' => false,
                'message' => 'deletion failed'
            ];
        }
        return $this;
    }

    public function update(){ 
        $json_task = file_get_contents('php://input');
        $task_upd = json_decode($json_task, true);

        if (!$this->hasInputKey($task_upd['id'])) {
            $this->output_arr = [
                'status' => false,
                'message' => 'no id submited'
            ];
            return $this;
        }
        if(isset($task_upd['text']) && is_string($task_upd['text'])){ 
            $entry = [
                'id' => $task_upd['id'],
                'task' => $task_upd['text'],
            ];
        }
        else if(isset($task_upd['checked']) && is_string($task_upd['checked'])){ 
            $entry = [
                'id' => $task_upd['id'],
                'checked' => $task_upd['checked'],
            ];
        }
        else{ 
            $this->output_arr = [
                'status' => false,
                'message' => 'no data submited'
            ];
            return $this;
        }

        if($this->todo_db->update($entry)) {
            $this->output_arr = [
                'status' => true,
                'message' => 'task has been updated'
            ];
        }
        else {
            $this->output_arr = [
                'status' => false,
                'message' => 'update failed'
            ];
        }
        return $this;
        

    }

    public function output() {
        echo json_encode($this->output_arr);
    }

    private function hasPostKey($key) {
        return (isset($_POST[$key]) && is_string($_POST[$key]));
    }
    private function hasInputKey($key) {
        
        return (isset($key) && is_string($key));
    }
}