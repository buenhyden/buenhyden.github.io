---
title: Harbor
description: an open source registry that secures artifacts with policies and role-based access control, ensures images are scanned and free from vulnerabilities, and signs images as trusted
linkTitle: Harbor
date: 2023-11-23T07:46:43.773Z
lastmod: 2024-01-03T23:18:20
series:
  - Container
categories:
  - Dev Ops
  - Container
  - Container Registry
tags:
  - Harbor
authors:
  - Hyunyoun Jo
draft: false
featured: true
summary: an open source registry that secures artifacts with policies and role-based access control, ensures images are scanned and free from vulnerabilities, and signs images as trusted
---

## Harbor란?

- 2020년 중순쯤 CNCF의 graduated된 OpenSource project
- Docker Hub처럼 Image를 저장할 수 있는 저장소
  - docker registry와 다르게 Web 기반 User Interface를 제공
- 다수의 registry 생성 가능

## 특징

- secures artifacts with policies and role-based access control
- ensures images are scanned and free from vulnerabilities, and signs images as trusted

## 설치 방법

1. Harbor 다운로드

```bash
wget https://github.com/goharbor/harbor/releases/download/v2.9.1/harbor-offline-installer-v2.9.1.tgz
```

2. 압축해제

```bash
tar xvf harbor-offline-installer-v2.9.1.tgz
```

3. harbor 폴더 이동후 harbor.yml.tmpl → harbor.yml 복사

```bash
cd harbor
cp harbor.yml.tmpl harbor.yml
```

4. harbor.yml 파일 수정

```bash
vi harbor.yml

# 왼쪽은 숫자는 2.9.1 버전의 yml 파일 기준 라인 No
# 수정해야할 부분은
# 5. hostname
# 10. http용 port
# 15. https용 port
# 17. https용 certificate
# 18. https용 private_key
# 36. harbor_admin_password : 관리자용 비밀번호

  1 # Configuration file of Harbor
  2
  3 # The IP address or hostname to access admin UI and registry service.
  4 # DO NOT use localhost or 127.0.0.1, because Harbor needs to be accessed by external clients.
  5 hostname: ~~~~~~~~~~~~~~
  6
  7 # http related config
  8 http:
  9   # port for http, default is 80. If https enabled, this port will redirect to https port
 10   port: ~~~~
 11
 12 # https related config
 13 https:
 14   # https port for harbor, default is 443
 15   port: ~~~~
 16   # The path of cert and key files for nginx
 17   certificate: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 18   private_key: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 19
 20 # # Uncomment following will enable tls communication between all harbor components
 21 # internal_tls:
 22 #   # set enabled to true means internal tls is enabled
 23 #   enabled: true
 24 #   # put your cert and key files on dir
 25 #   dir: /etc/harbor/tls/internal
 26 #   # enable strong ssl ciphers (default: false)
 27 #   strong_ssl_ciphers: false
 28
 29 # Uncomment external_url if you want to enable external proxy
 30 # And when it enabled the hostname will no longer used
 31 #external_url: https://dev.eq4all.co.kr:5001
 32
 33 # The initial password of Harbor admin
 34 # It only works in first time to install harbor
 35 # Remember Change the admin password from UI after launching Harbor.
 36 harbor_admin_password: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

5. harbor 설치

```bash
# 준비
./prepare

# 설치 document를 참조
./install.sh
```

6. harbor 접속
   ![harbor login page](media/images/login-page-harbor.png)

7. 로그인 (처음 접속시)

- username : admin
- password:
  ![harbor after login](media/images/harbor-after-login.png)

## Docker Authentication

- container Registry에 빌드한 Image를 넣기 위해서는 docker에 해당 container Registry에 대한 인증이 필요함
  - 계정을 추가할 경우, 해당 계정을 이용하여 docker에 로그인하는 것이 필요

```bash
docker login https://xxxxxxxxxxxxxxxx:yyyy
Username:
Password:

Authenticating with existing credentials...
WARNING! Your password will be stored unencrypted in /home/hyden/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```

## Docker Image Push

1. build된 docker image 명 앞에 내부 Registry 주소를 붙인다.

```bash
docker tag <IMAGE NAME> <Registry 주소>/<Project 이름>/<IMAGE NAME>
```

3. 내부 registry 주소가 붙은 이미지를 docker push 명령어를 이용하여 container registry에 집어넣는다

```bash
docker push <Registry 주소>/<Project 이름>/<IMAGE NAME>
```

4. kubernetes의 특정 namespace에 harbor 인증 등록

```bash
sudo kubectl create secret docker-registry <secet name> --namespace <namespace> --docker-server=<Registry 주소> --docker-username=<username> --docker-password=<password> --docker-email=<email>
```

## Reference

[Harbor Official Homepage](https://goharbor.io/)  
[컨테이너 이미지 저장소 HA(High Available) 로 구성하기 (feat. Harbor)](https://devocean.sk.com/search/techBoardDetail.do?ID=165200&boardType=&query=test&searchData=&page=&subIndex=&idList=)
