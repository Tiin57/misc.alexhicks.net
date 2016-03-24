<?php
$excludedDirectories = [".git", "..", "."];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Miscellaneous Utilities</title>
    <style>
    /* Yes, so creative */
    a {
        color: blue;
    }
    a:visited {
        color: blue;
    }
    </style>
</head>
<body>
    <h3>Hello!</h3>
    <p>You're here.</p>
    <ul>
        <?php
        $preUrl = dirname($_SERVER["PHP_SELF"]);
        $files = array_diff(scandir(__DIR__), $excludedDirectories);
        $dirs = [];
        foreach ($files as $k => $file) {
            if (is_dir(__DIR__ . "/" . $file)) {
                $dirs[] = $file;
            }
        }
        foreach ($dirs as $k => $dir):
            ?>
            <li><a href="<?=$preUrl?>/<?=$dir?>"><?=$dir?></a></li>
        <?php endforeach; ?>
    </ul>
</body>
</html>
