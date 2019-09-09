<?php 

class Actions {

    private $conn ;

    function __construct(){
        require_once('./database.php');
        $db = new Database();
        $this->conn = $db->connect();
    }

    function signupUser(){
        $sql = "INSERT INTO users (userId, uToken, ip, isp, latitude, longitude, city, postCode, createdAt, updatedAt)
            VALUES (:id, :uToken, :ip, :isp, :latitude, :longitude, :city, :postCode, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
        $stmt = $this->conn->prepare($sql);
        foreach ($_POST as $key => &$value) {
            $stmt -> bindParam( $key , $value );
        }
        try {$stmt->execute();return 'succsess';
        } catch (\Throwable $th) {
            if( $this->isUserIdNull() ){
                $this->updateUserId(array("id"=>$_POST['id'],'uToken'=>$_POST['uToken']));
            }else{
                return array('error'=>true,"message"=>'TOKEN_EXIST',"data"=>$th);
            }
        }
        return $_POST ;
    }

    private function updateUserId( $data ){
        $sql = "UPDATE users SET userId = :id WHERE uToken = :uToken";
        $stmt = $this->conn->prepare($sql);
        foreach ($data as $key => &$value){$stmt -> bindParam( $key , $value );}
        $stmt->execute();
    }

    private function isUserIdNull(){
        $sql = "SELECT userId from users WHERE uToken = :uToken";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':uToken', $_POST['uToken']);
        $stmt->execute();
        $res = $stmt->fetch(PDO::FETCH_OBJ);
        if($res->userId==NULL){return true;}
        else{return false;}
    }

    function getUserToken( $id ){
        $sql = "SELECT uToken from users WHERE userId = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id );
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_OBJ);
    }

    // function mergeUserId(){
    //     if( $this->isUserIdNull() ){
    //         $this->updateUserId($_POST);
    //         $this->updateLastVisitedByUserId($_POST['id']);
    //     }else if( $this->isUserIdExist() ){
    //         $this->updateLastVisitedByUserId($_POST['id']);
    //     }
    // }

    private function isUserIdExist(){
        $sql = 'SELECT userId FROM users WHERE userId = :id';
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $_POST['id']);
        $stmt->execute();
        $res = $stmt->fetch(PDO::FETCH_OBJ);
        if( empty($res) ){ return false ;}
        else{ return true ;}
    }

    private function isVisitorExist(){
        $sql = 'SELECT uToken FROM users WHERE ip=:ip AND latitude=:latitude AND longitude=:longitude';
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':ip', $_POST['ip']);
        $stmt->bindParam(':latitude', $_POST['latitude']);
        $stmt->bindParam(':longitude', $_POST['longitude']);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_OBJ);
    }

    function createNewVisitor(){
        $response = $this->isVisitorExist();
        if( empty($response) ){
            $sql = "INSERT INTO users (uToken, ip, isp, latitude, longitude, city, postCode, createdAt, updatedAt)
            VALUES (:uToken, :ip, :isp, :latitude, :longitude, :city, :postCode, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
            
            $stmt = $this->conn->prepare($sql);
            foreach ($_POST as $key => &$value) {
                $stmt -> bindParam( $key , $value );
            }
            $stmt->execute();
        }else{
            $this->updateLastVisitedByToken($response->uToken);
            return array('error'=>true,"message"=>'Duplicate user',"uToken"=>$response->uToken);
        }
    }

    function updateLastVisitedByToken( $token ){
        $sql = "UPDATE users SET updatedAt = CURRENT_TIMESTAMP where uToken = :uToken";
        $stmt = $this->conn->prepare($sql);
        $stmt -> bindParam(':uToken', $token );
        $stmt->execute();
    }
    function updateLastVisitedByUserId( $id ){
        $sql = "UPDATE users SET updatedAt = CURRENT_TIMESTAMP where userId = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt -> bindParam(':id', $id );
        $stmt->execute();
    }
}