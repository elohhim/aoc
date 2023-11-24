param ($file)

$temp_dir = ".temp"
$gjf_path = ".\$($temp_dir)\google-java-format-1.18.1-all-deps.jar"
$gjf_release_url = "https://github.com/google/google-java-format/releases/download/v1.18.1/google-java-format-1.18.1-all-deps.jar"

if (-Not (Test-Path $gjf_path)) {
    New-Item -ItemType Directory -Path $temp_dir
    Write-Host "Downloading google-java-formatter"
    Invoke-WebRequest -Uri $gjf_release_url -OutFile $gjf_path
}

Write-Host $file
java -jar $gjf_path --replace $file
