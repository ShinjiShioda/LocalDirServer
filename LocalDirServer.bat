rem LocalDirServer.js launch Batch file
rem copyright 2024 Shinji Shioda
rem node.js execution file set in PATH Environment Value(no full pass)
@echo off
title File Server
rem "C:\Program Files\nodejs\node.exe" %~dp0\LocalDirServer.js
node.exe %~dp0\LocalDirServer.js %1 %2 %3
