---
title: chocolatey
date: 2023-11-20T20:26:05.655Z
linkTitle: chocolatey
description: 윈도우 소프트웨어를 위한 머신 수준의 명령 줄 패키지 관리자이자 인스톨러
summary: 
draft: false
series:
  - Operating System
categories:
  - Operating System
  - Windows
tags:
  - chocolatey
authors:
  - Hyunyoun Jo
lastmod: 2024-01-03T22:51:07
featured: true
---

## Chocolatey

The Package Manager for Windows

## 설치조건

- Supported Windows client and server Operating Systems (can run on older Operating Systems)
  - Clients
    - Windows 11
    - Windows 10 22H2
    - Windows 10 21H2
  - Servers
    - Windows Server 2022
    - Windows Server 2019
    - Windows Server 2016
    - Windows Server 2012 R2
    - Windows Server 2012
    - Windows Server 2008 R2 (in Azure only)
- PowerShell v2+ (minimum is v3 for install from this website due to TLS 1.2 requirement)
- .NET Framework 4.8 (the installation will attempt to install .NET 4.8 if you do not have it installed)

## Windows Chocolatey 설치

1. 관리자 모드로 PowerShell 실행
2. Get-ExecutionPolicy로 권한 확인

```bash
Get-ExecutionPolicy
```

3. Restricted라면 AllSigned나 Bypass로 설정

```bash
# ExcutionPolicy를 AllSigned로 설정
$ Set-ExecutionPolicy AllSigned

# ExcutionPolicy를 Bypass로 설정
$ Set-ExecutionPolicy Bypass -Scope Process
```

4. Chocolatey 공식 설치 스크립트 실행

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

## Upgrade

```bash
choco upgrade chocolatey
```

## Delete

### chocolatey 삭제

```bash
Remove-Item -Recurse -Force "$env:ChocolateyInstall" -WhatIf
[System.Text.RegularExpressions.Regex]::Replace([Microsoft.Win32.Registry]::CurrentUser.OpenSubKey('Environment').GetValue('PATH', '', [Microsoft.Win32.RegistryValueOptions]::DoNotExpandEnvironmentNames).ToString(), [System.Text.RegularExpressions.Regex]::Escape("$env:ChocolateyInstall\bin") + '(?>;)?', '', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase) | %{[System.Environment]::SetEnvironmentVariable('PATH', $_, 'User')}
[System.Text.RegularExpressions.Regex]::Replace([Microsoft.Win32.Registry]::LocalMachine.OpenSubKey('SYSTEM\CurrentControlSet\Control\Session Manager\Environment\').GetValue('PATH', '', [Microsoft.Win32.RegistryValueOptions]::DoNotExpandEnvironmentNames).ToString(),  [System.Text.RegularExpressions.Regex]::Escape("$env:ChocolateyInstall\bin") + '(?>;)?', '', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase) | %{[System.Environment]::SetEnvironmentVariable('PATH', $_, 'Machine')}
```

### chocolatey에서 관리하던 툴 디렉터리 삭제

```bash
if ($env:ChocolateyBinRoot -ne '' -and $env:ChocolateyBinRoot -ne $null) { Remove-Item -Recurse -Force "$env:ChocolateyBinRoot" -WhatIf }
if ($env:ChocolateyToolsRoot -ne '' -and $env:ChocolateyToolsRoot -ne $null) { Remove-Item -Recurse -Force "$env:ChocolateyToolsRoot" -WhatIf }
[System.Environment]::SetEnvironmentVariable("ChocolateyBinRoot", $null, 'User')
[System.Environment]::SetEnvironmentVariable("ChocolateyToolsLocation", $null, 'User')
```

## 패키지 상세 정보 보기

```bash
choco info <패키지 명>
choco search <패키지 명> -f
```

![chocolatey-package-info](media/images/chocolatey-package-info.png)

## Install Package

- Chocolatey가 지원하는 패키지 목록
  - [Chocolatey Packages](https://community.chocolatey.org/packages)

```bash
choco install <패키지 명>
```

## Uninstall Package

```bash
choco uninstall <패키지 명>
```

## Upgrade Package

```bash
choco upgrade <패키지 명>
# 설치된 패키지 전체
choco upgrade all
```

## Reference

[Chocolatey Official Homepage](https://chocolatey.org/)
