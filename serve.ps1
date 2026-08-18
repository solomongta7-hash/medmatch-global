# Minimal static file server for local preview of the MedMatch Global site.
# Usage: powershell -ExecutionPolicy Bypass -File serve.ps1
$root = $PSScriptRoot
$port = 4173
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root at http://localhost:$port/"

$mime = @{
  ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8"
  ".js"="application/javascript; charset=utf-8"; ".svg"="image/svg+xml"
  ".png"="image/png"; ".jpg"="image/jpeg"; ".ico"="image/x-icon"
  ".json"="application/json"; ".woff2"="font/woff2"
  # preview.html loads ES modules, a WASM face model and a .task model file.
  # Without these three the tool works on GitHub Pages but not in local preview,
  # which is the kind of difference that wastes an afternoon.
  ".mjs"="application/javascript; charset=utf-8"
  ".wasm"="application/wasm"; ".task"="application/octet-stream"
}

while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
    $path = $ctx.Request.Url.AbsolutePath
    if ($path -eq "/") { $path = "/index.html" }
    $file = Join-Path $root ($path -replace "/", "\")
    if ((Test-Path $file -PathType Leaf) -and ($file -like "$root*")) {
      $bytes = [System.IO.File]::ReadAllBytes($file)
      $ext = [System.IO.Path]::GetExtension($file).ToLower()
      if ($mime.ContainsKey($ext)) { $ctx.Response.ContentType = $mime[$ext] }
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ctx.Response.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("Not found")
      $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $ctx.Response.OutputStream.Close()
  } catch { }
}
