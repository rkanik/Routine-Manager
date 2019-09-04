<?php
header("Access-Control-Allow-Origin: *");
ob_start();
session_start();
$res = array('error'=>true,"message"=>null,"data"=>null);

if( isset($_GET['code']) ){

    $code = $_GET['code'];

    require_once('./actions.php');
    $act = new Actions();

    switch ($code) {

        /** Update lastvisited */
        case '100':
            $act.gettAll();
            break;
        
        default:

            break;
    }
}

header("Content-type: application/json");
echo json_encode($res);