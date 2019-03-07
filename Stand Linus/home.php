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
    <title>Home</title>
</head>
<style>

.style-4::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}

.style-4::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

.style-4::-webkit-scrollbar-thumb
{
	background-color: #000000;
	border: 2px solid #555555;
}
.bottom-sheet{
    max-height: 100% !important;
}

.bottom-sheet .modal.content{
    width: 60%;
    margin: 0px auto
}
</style>
<body class="style-4">
<?php
include 'header2.php';
?>
<div class="fixed-action-btn ">
    <a class="btn-floating btn-large red ">
        <i class="large material-icons teal accent-4 pulse">mode_edit</i>
    </a>
    <ul>
        <li><a class="btn-floating red" id="out"><i class="material-icons">power_settings_new</i></a></li>
        <li><a class="btn-floating yellow darken-1" href="index.php?=settings"><i class="material-icons">settings</i></a></li>
        <li><a class="btn-floating blue" href="index.php?=groups"><i class="material-icons">group</i></a></li>
        <li><a class="btn-floating green"  href="index.php?=add"><i class="material-icons">add_circle_outline</i></a></li>

    </ul>
</div>

<div id="modal1" class="modal bottom-sheet">
    <div class="modal-content">
        <h1 id="name">Modulname</h1>
        <i class="medium material-icons" id="star1">star</i>
        <i class="medium material-icons" id="star2">star</i>
        <i class="medium material-icons" id="star3">star_half</i>
        <i class="medium material-icons" id="star4">star_border</i>
        <i class="medium material-icons" id="star5">star_border</i>
        <h5 id="ablauf">Ablaufdatum</h5>
        <h5 id="übrig">Tage übrig/Abgelaufen</h5>
        <div class="row">
            <form class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <textarea id="textarea1" class="materialize-textarea"></textarea>
                        <label for="textarea1">Notizen</label>
                    </div>
                </div>
            </form>
        </div>
        <i class="small material-icons">notifications_active</i>
        <i class="small material-icons">notifications_off</i>
        <!-- Switch -->
        <div class="switch">
            <label>
                In Bearbeitung
                <input type="checkbox">
                <span class="lever"></span>
                Abgeschlossen
            </label>
        </div>
    </div>
    <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">DONE</a>
    </div>
</div>
<br>
<div class="style-4" style="margin-left: 2%;margin-right:2%;height: 850px;width: 96%; border-style: solid; border-radius: 25px; overflow: scroll;" id="taskholder">
   <!-- <div dayOffset="3" class="task">Test Task</div>
    <div dayOffset="-1">Test Task<div class="planexceed" duration="2">Plan exceed</div><div duration="2" class="deadlineexceed">Deadline</div></div>
    --><br><br>
</div>
<br>
<script>
    M.AutoInit();
</script>
</body>
</html>