<?php

class ApiHelper
{
    private $data;
    public function __construct() {
        $this->data = ['turns'=> 0, 'moves'=> array()];
        if (file_exists(DATA_FILE_NAME)) {
            $content = file_get_contents(DATA_FILE_NAME);
            $this->data = json_decode($content, true);
            if (!is_array($this->data)) {
                $$this->data = ['turns'=> 0, 'moves'=> array()];
            }
        }
    }

    public function add() {
        $output = ['status' => false];
        $json_move = file_get_contents('php://input');
        $move_add = json_decode($json_move, true);

        if (
            isset($move_add['id']) &&
            isset($move_add['symbol']) 
        ) {
                $move = [ "id" => $move_add['id'], "symbol" => $move_add['symbol']];
                $this->data['moves'][$move_add['id']] = $move;
                $this->data['turns'] = $move_add['turn'];
    
                $content = json_encode($this->data);
                file_put_contents(DATA_FILE_NAME, $content);
                $output = [
                    'status' => true,
                    'message' => 'move has been added'
                ];
        }
        echo json_encode($output);
    }

    public function get() {
        $output = ['status' => false];
        
        $output = [
            'status' => true,
            'message' => 'success',
            'data' => $this->data,
        ];
        echo json_encode($output);
    }

    public function reset() {
        $output = ['status' => false];

        $this->data = ['turns'=> 0, 'moves'=> array()];
    
        $content = json_encode($this->data);
        file_put_contents(DATA_FILE_NAME, $content);
        
        $output = [
            'status' => true,
            'message' => 'game reset was successful'
        ];

        echo json_encode($output);    
    }
    
}