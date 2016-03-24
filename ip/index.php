<?php
$ip = $_SERVER["REMOTE_ADDR"];
if (isset($_GET["ip"])) {
    $ip = $_GET["ip"];
}
$ipRegex = "/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/";
if (preg_match($ipRegex, $ip) === false) {
    echo("Invalid IP.");
    exit;
}
$data = json_decode(file_get_contents("http://ipinfo.io/$ip/geo"));
$locationString = $data->city . ", " . $data->region . ", " . $data->country;
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>IP Info</title>
    </head>
    <body>
        <h3>IP: <?=$ip?></h3>
        <h4>Location: <?=$locationString?></h4>
    </body>
</html>
