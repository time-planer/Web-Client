<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="css/materialize.css"  media="screen,projection"/>
    <script type="text/javascript" src="client/time-planer.js"></script>
    <script type="text/javascript" src="js/materialize.min.js"></script>
    <script src="https://code.jquery.com/jquery-latest.js"></script>
    <script type="text/javascript" src="script.js"></script>
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Registrieren</title>
</head>
<body>
<?php
include 'header.php';
?>
<div style="width: 20%; height: 500px; border: solid; border-radius: 25px; margin-left: 40%; margin-top: 10%;margin-bottom: 10%;">
    <center><h1>Vergessen</h1></center>
    <br>
    <div class="input-field col s6" style="margin-left: 20px; margin-right: 20px">
        <input id="mail" type="text" class="validate">
        <label for="mail">E-Mail</label>
    </div>
    <center>
        <br>
        <br>
        <button class="btn waves-effect waves-light teal accent-4" type="button" id="log" name="action">Absenden             <!-- Login Funktion --->
            <i class="material-icons right">send</i>
        </button></center>
</div>
<script>
    M.AutoInit();
</script>
</body>
</html>