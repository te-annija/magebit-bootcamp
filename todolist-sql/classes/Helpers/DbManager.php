<?php

class DbManager
{
    private $data;
    private $dbname;
    private $table_name;
    private $conn; 

    
    public function __construct() {
        $this->data = ['id_next'=> 1, 'data'=> array()];

        $servername = "web.local";
        $username = "root";
        $password = "option123";
        $this->table_name = "tasks";
        $dbname = "project_managment2";
        $this->connectToDb(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
   
    }

    private function connectToDb($servername, $username, $password, $dbname){ 
        // Create connection
        $this->conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }

    }
    public function add($entry) {
        $task_text = $entry['task']; 
        $task_checked = $entry['checked']; 
        $sql = "INSERT INTO ".$this->table_name." (task, checked)
        VALUES ('$task_text', '$task_checked')";

        if ($this->conn->query($sql) === TRUE) {
            return $this->conn->insert_id;
        } else {
            return -1;
        }
    } 

    public function getAll(){ 
        $sql = "SELECT id, task, checked FROM $this->table_name";
        $result = $this->conn->query($sql);

        $data = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $task = [ "id" => $row["id"], "text" => $row["task"], "checked" => $row["checked"]];
                $data[$row["id"]] = $task; 
            }
        } 
        return $data;
    }

    public function delete($id){ 
        $sql = "DELETE FROM $this->table_name WHERE id=$id";

        return ($this->conn->query($sql) === TRUE) ;
        
    }

    public function update($entry){ 
        if(array_key_exists('task', $entry)){ 
            $task_text = $entry['task']; 
            $task_id = $entry['id'];
            $sql = "UPDATE $this->table_name SET task='$task_text' WHERE id=$task_id";
        }
        else if(array_key_exists('checked', $entry)){ 
            $task_checked = $entry['checked']; 
            $task_id = $entry['id'];
            $sql = "UPDATE $this->table_name SET checked='$task_checked' WHERE id=$task_id";
        }

        return ($this->conn->query($sql) === TRUE) ;

    }


    public function __destruct()
    {
        $this->conn->close();
    }
}