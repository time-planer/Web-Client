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
    <title>Add</title>
</head>
<body>
<?php
include 'header.php';
?>
<div style="width: 100%; height: 60px; text-align: right">
    <a href="index.php?=home"><i class="medium material-icons">arrow_back</i></a>
</div>
<div style="width: 100%; height: 600px;">
<div id="left" style="width: 30%; height: 100%; float: left; margin-left: 5%; border-right: 1px solid">
    <br>
    <div class="input-field col s6" style="margin-left: 20px; margin-right: 20px">
        <input id="title" tabindex="1" type="text" class="validate">
        <label for="title">Überbegriff</label>
    </div>
    <div class="input-field col s6" style="margin-left: 20px; margin-right: 20px">
        <input type="text" id="plan" tabindex="-1" class="datepicker">
        <label for="title">Geplantes Ende</label>
    </div>
    <div class="input-field col s6" style="margin-left: 20px; margin-right: 20px">
        <input type="text" id="dead" tabindex="-1" class="datepicker">
        <label for="title">Deadline</label>
    </div>
    <br>
    <p style="margin-left: 20px; margin-right: 20px;">Importance:</p>
    <form action="#" style="margin-left: 20px; margin-right: 20px">
        <p class="range-field">
            <input type="range" id="imp" min="0" max="10" />
        </p>
    </form>
    <center>
    <i class="medium material-icons">star</i>
    <i class="medium material-icons">star</i>
    <i class="medium material-icons">star_half</i>
    <i class="medium material-icons">star_border</i>
    <i class="medium material-icons">star_border</i>
    </center>
    <p style="margin-left: 20px; margin-right: 20px; visibility: hidden">Gruppen:</p>
    <div class="chips chips-initial" style="margin-left: 20px; margin-right: 20px; visibility: hidden"></div>
</div>

<div id="right" style="width: 60%; height: 100%; float: left; margin-right: 5%;">
    <br>
    <div class="row">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <textarea id="textarea1" tabindex="2" class="materialize-textarea" style="max-height: 500px"></textarea>
                    <label id="not" for="textarea1">Notizen</label>
                </div>
            </div>
        </form>
    </div>
</div>
</div>
<div style="width: 100%; height: 60px; text-align: right">
    <a tabindex="3" href="#" id="speichern"><i class="medium material-icons">save</i></a>
</div>
<script>
    M.AutoInit();
</script>
</body>
</html>