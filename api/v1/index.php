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
            break;
        /** create new Visitor */
        case '101':
            $res = $act->createNewVisitor();
            break;
        /** Merge userId with uToken */
        case '102':
            $act->mergeUserId();
            break;
        default:
            break;
    }
}

header("Content-type: application/json");
echo json_encode($res);