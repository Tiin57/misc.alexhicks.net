<?php
// borrowed from http://stackoverflow.com/a/834355/5850070
function str_endswith($haystack, $needle) {
    return (substr($haystack, -strlen($needle)) === $needle);
}

$config = json_decode(file_get_contents(__DIR__ . "/config.json"));
$zip = new ZipArchive;
$zip_filename = "dist/mods_" . date("Y-m-d_H.i.s") . ".zip";
if (!$zip->open(__DIR__ . "/$zip_filename", ZipArchive::CREATE)) {
    die("Error: couldn't open archive for writing.");
}
$zip->addEmptyDir("mods");
$files = array_diff(scandir($config->mod_dir), [".", ".."]);
foreach ($files as $file_name) {
    if (!str_endswith($file_name, ".jar")) {
        continue;
    }
    if (!$zip->addFile($config->mod_dir . $file_name, "mods/$file_name")) {
        die("Error: couldn't write file $file_name to archive.");
    }
}
$zip->close();
header("Location: $zip_filename");
?>
