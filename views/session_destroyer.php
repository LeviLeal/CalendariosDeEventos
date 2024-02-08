<?php 
session_start();
session_destroy();

unset($_SESSION["login"]);
header("location: page_login.html");