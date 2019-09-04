<?php

class Database{
    public function connect(){
        require_once('./defined.php');
        try {
            $conn = new PDO("mysql:host=$SERVER;dbname=$DATABASE", $USERNAME, $PASSWORD);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo 'connected';
        }catch(PDOException $e){
            var_dump($e);
        }
    }
}