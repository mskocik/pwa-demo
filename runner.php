<?php declare(strict_types=1);

require_once 'vendor/autoload.php';

$run = true;

$lastHash = '';

function createPrecache(&$lastHash) {
    $files = ['another.js', 'app.js', 'index.html'];
    $suffix = \Nette\Utils\Random::generate(24);
    $data = [];
    foreach ($files as $f) {
        $str = md5_file(__DIR__ . "/www/$f");
        $data[] = "{ revision: '$str', url: '/$f' }";
    }
    $data = "self.__precacheManifest = [" . join(',', $data) . '];';
    if ($lastHash !== $data) {
        $f = glob('www/precache*');
        if (count($f) > 0) {
            unlink($f[0]);
        }
        $re = '/precache-manifest.[a-z0-9]*\.js/';
        $sw = preg_replace($re, "precache-manifest.$suffix.js", file_get_contents('www/service-worker.js'));
        file_put_contents(__DIR__ . '/www/service-worker.js', $sw);
        file_put_contents(__DIR__ . "/www/precache-manifest.$suffix.js", $data);

    }
    $lastHash = $data;
}



while ($run) {
    createPrecache($lastHash);
    sleep(1);
}

exit();
