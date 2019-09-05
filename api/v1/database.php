<?php
class Database{
    public function connect(){
        $server = 'localhost';
        $username = 'root';
        $password = '';
        $darabase = 'routine-cse';
        try {
            $conn = new PDO("mysql:host=$server;dbname=$darabase", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        }catch(PDOException $e){
            var_dump($e);
        }
    }
}