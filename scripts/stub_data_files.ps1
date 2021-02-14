param ($year, $day)

$padded_day = '{0:d2}' -f [int]$day
$dir_path = "..\input\$($year)\$($padded_day)"
$files = "input.txt", "tc1.txt", "tc2.txt"

Write-Host "Creating stub files for AoC Year $($year) Day $($padded_day)"
New-Item -ItemType Directory -Force -Path $dir_path

foreach ($f in $files) {
    $file_path = "$($dir_path)\$($f)"
    if (Test-Path $file_path) {
        Write-Host "$($file_path) already exist"
    }
    else {
        New-Item -ItemType File -Path $dir_path -Name $f
    }
}
