param ($year, $day)

$padded_day = '{0:d2}' -f [int]$day
$dir_path = "$(Get-Location)\..\python\aoc\$($year)"
$files = "$($padded_day).py"

Write-Host "Creating stub .py files for AoC Year $($year) Day $($padded_day)"
New-Item -ItemType Directory -Force -Path $dir_path

foreach ($f in $files) {
    $file_path = "$($dir_path)\$($f)"
    if (Test-Path $file_path) {
        Write-Host "$($file_path) already exist"
    }
    else {
        New-Item -ItemType File -Path $dir_path -Name $f
$content = @"
def parse_data(data: str) -> None:
    pass


def solve_1(data: str) -> int:
    pass


def solve_2(data: str) -> int:
    pass
"@ 
        [IO.File]::WriteAllLines($file_path, $content)
    }
}
