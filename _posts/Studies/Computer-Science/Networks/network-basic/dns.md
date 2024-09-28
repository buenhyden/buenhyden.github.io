---
title: DNS(Domain Name System)
linkTitle: DNS(Domain Name System)
description: 특정 컴퓨터(또는 네트워크로 연결된 임의의 장치)의 주소를 찾기 위해, 사람이 이해하기 쉬운 도메인 이름을 숫자로 된 식별 번호(IP 주소)로 변환
summary: 특정 컴퓨터(또는 네트워크로 연결된 임의의 장치)의 주소를 찾기 위해, 사람이 이해하기 쉬운 도메인 이름을 숫자로 된 식별 번호(IP 주소)로 변환
date: 2023-11-26T11:11:06.253Z
lastmod: 2024-01-03T22:45:32
series:
  - Network Basic
categories:
  - Network
  - Network Basic
tags:
  - DNS
authors:
  - Hyunyoun Jo
draft: false
featured: true
---

- 웹사이트에 접속할 때 외우기 어려운 IP 주소 대신 도메인 이름을 사용.
- 도메인 이름을 사용했을 때 입력한 도메인을 실제 네트워크 상에서 사용하는 IP주소로 바꾸고 해당 IP 주소로 접속하는 과정이 필요.
- 이러한 과정, 전체 시스템을 DNS(도메인 네임 시스템)이라고 한다.
- 이러한 시스템은 전세계적으로 약속된 규칙을 공유한다.
- 상위 기관에서 인증된 기관에게 도메인을 생성하거나 IP 주소로 변경할 수 있는 '권한'을 부여.
- DNS는 이처럼 상위 기관과 하위 기관과 같은 '계측 구조'를 가지는 **분산 데이터베이스 구조**를 가진다.

### DNS 구성 요소

- 도메인 네임 스페이스 (Domain Name Space)
- 네임 서버 (Name Server) = 권한 있는 DNS 서버
- 리졸버(Resolver) = 권한 없는 DNS 서버

### DNS 동작 방식

### DNS 구성 요소

#### 도메인 네임 스페이스 (Domain Name Space)

#### 네임 서버 (Name Server = DNS Server)

#### 리졸버 (Resolver)

### DNS 동작 과정

## DNS 레코드 종류

- SOA(Start of Authority) : 권한 시작 지정하고, 권한이 있는 서버를 가리킴.
- A(Host Record) : FQDN과 32비트의 IPv4 주소를 연결
- AAAA(IPv6호스트) : FQDN과 128비트의 IPv6 주소를 연결
- CNAME(Alias Record) : 실제 도메인 이름과 연결괴는 가상 도메인 이름(별칭)
- MX(Mail Exchane Record) : 주어진 사서함에 도달할 수 있는 라우팅 정보 제공.
- SRV(Service Resources) : 비슷한 TCP/IP 서비스를 제공하는 다수의 서버 위치 정보를 제공.
- NS(Name Servers) : 도메인 서버 목록을 지정.

## Reference

[도메인 네임 시스템](https://ko.wikipedia.org/wiki/%EB%8F%84%EB%A9%94%EC%9D%B8_%EB%84%A4%EC%9E%84_%EC%8B%9C%EC%8A%A4%ED%85%9C)  
[DNS란? (도메인 네임 시스템 개념부터 작동 방식까지)](https://hanamon.kr/dns%EB%9E%80-%EB%8F%84%EB%A9%94%EC%9D%B8-%EB%84%A4%EC%9E%84-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B0%9C%EB%85%90%EB%B6%80%ED%84%B0-%EC%9E%91%EB%8F%99-%EB%B0%A9%EC%8B%9D%EA%B9%8C%EC%A7%80/)  
[DNS(Domain Name System)란?](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=gaegurijump&logNo=110186376474)  
[DNS란 뭐고, 네임서버란 뭔지 개념정리](https://gentlysallim.com/dns%EB%9E%80-%EB%AD%90%EA%B3%A0-%EB%84%A4%EC%9E%84%EC%84%9C%EB%B2%84%EB%9E%80-%EB%AD%94%EC%A7%80-%EA%B0%9C%EB%85%90%EC%A0%95%EB%A6%AC/)  
[루트 네임 서버](https://ko.wikipedia.org/wiki/%EB%A3%A8%ED%8A%B8_%EB%84%A4%EC%9E%84_%EC%84%9C%EB%B2%84)
