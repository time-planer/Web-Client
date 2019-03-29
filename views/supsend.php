<html>
    <head>
        <title>Support</title>
        <meta charset="utf-8">
    </head>
    <body>
        <?php
        $bcc = $_GET['bcc'];
            $texxt = $_GET['text'];
            $wem = "=?utf-8?b?".base64_encode($_GET['wem'])."?=";
            $von = $_GET['von'];
            $an = "support@time-planer.com";
            $empf = "$an";
            $betreff = $_GET['betreff'];
            $from = "From: ";
            $from .= $wem;
            $from .= " <";
            $from .= "$von";
            $from .= ">\n";
            $from .= "Reply-To: ";
            $from .= "$von";
            $from .= "\n";
            $from .= "Content-Type: text/plain; charset=utf-8\n";
        $Mailbetreff = "=?utf-8?b?".base64_encode($betreff)."?=";
        mail($empf, $Mailbetreff, $texxt,$from);


        $bcc = $_GET['bcc'];
                    $texxt = "Hallo ".$_GET['wem']."<br>Ihre Support Anfrage ist bei uns eingegangen, wir werden uns so Bald wie möglich bei Ihnen melden!";
                    $wem = "No-Reply";
                    $von = "no-reply@time-planer.com";
                    $an = "support@time-planer.com";
                    $empf = $_GET['von'];
                    $betreff = "Support-Meldung";
                    $from = "From: ";
                    $from .= $wem;
                    $from .= " <";
                    $from .= "$von";
                    $from .= ">\n";
                    $from .= "Reply-To: ";
                    $from .= "$von";
                    $from .= "\n";
                    $from .= "Content-Type: text/plain; charset=utf-8\n";
                $Mailbetreff = "=?utf-8?b?".base64_encode($betreff)."?=";
                mail($empf, $Mailbetreff, $texxt,$from);
            ?>
        <center><h1 style="margin-top: 20%;font-family: sans-serif;">Ihre E-Mail wurde versendet!</h1></center>
            <meta http-equiv="Refresh" content="3; URL=../index.html">
    </body>
</html>