<?php
header("Access-Control-Allow-Origin: *");
ob_start();
session_start();
$res = array('error'=>true,"message"=>null,"data"=>null);

if( isset($_GET['code']) ){

    $code = $_GET['code'];

    require_once('actions.php');
    $act = new Actions();

    switch ($code) {

        /** Update lastvisited by token */
        case '100':
            $act->updateLastVisitedByToken( $_POST['uToken'] );
            break;
        /** Update lastvisited by userId */
        case '110':
            $act->updateLastVisitedByUserId( $_POST['id'] );
            $res = $act->getUserToken($_POST['id']);
            break;
        /** create new Visitor */
        case '101':
            $res = $act->createNewVisitor();
            break;
        /** Signup new user */
        case '120':
            $res = $act->signupUser();
            break;
        default:
            break;
    }
}

header("Content-type: application/json");
echo json_encode($res);