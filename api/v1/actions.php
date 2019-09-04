<?php 

class Actions{

    private $conn ;

    public function _constract(){
        require_once('./database.php');
        $db = new Database();
        $this->conn = $db.connect();
    }

    public function getAll(){
        echo 'hello';
    }

}