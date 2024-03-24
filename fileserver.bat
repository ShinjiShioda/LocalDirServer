rem fileserver.js launch Batch file
rem copyright 2024 Shinji Shioda
rem node.js execution file set in PATH Environment Value(no full pass)
@echo off
title File Server
rem "C:\Program Files\nodejs\node.exe" %~dp0\fileserver.js
node.exe %~dp0\fileserver.js %1 %2 %3
