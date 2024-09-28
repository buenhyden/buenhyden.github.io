---
title: Cross Origin Resource Sharing(CORS)
description: 추가 HTTP 헤더를 사용하여, 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제
summary: 추가 HTTP 헤더를 사용하여, 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제
linkTitle: Cross Origin Resource Sharing(CORS)
date: 2023-11-15T14:17:29.812Z
lastmod: 2024-01-03T22:45:30
series:
  - Network Basic
categories:
  - Network
  - Network Basic
tags:
  - CORS
authors:
  - Hyunyoun Jo
draft: false
featured: true
---

![CORS](media/images/cors.png "https://securityzines.com/flyers/cors.html")

## CORS Principle

![CORS Principle](media/images/cors_principle.png "https://medium.com/@jiri.caga/issue-call-put-method-on-rest-api-write-in-spring-framework-cross-origin-request-blocked-c68f9390b9b1")

## What is CORS?

- **HTTP-based security mechanism** controlled and enforced by the client (Web Browser)
  - 웹 페이지 상의 제한된 리소스를 최초 자원이 서비스된 도메인 밖의 다른 도메인으로부터 요청할 수 있게 허용하는 구조

### How does it work?

## What is a CORS preflight?

![CORS preflight scheme Server Client](media/images/cors-preflight-scheme-server-client.jpg)

## CORS Headers

![Browser Server preflight request and esponse Headers](media/images/browser-server-preflight-request-and-response-headers.jpg "https://simplelocalize.io/blog/posts/what-is-cors/")

## Why is request blocked by CORS policy?

## How to fix CORS error?

![Response preflight request doesnt pass access control check](media/images/response-preflight-request-doesnt-pass-access-control-check.jpg "https://simplelocalize.io/blog/posts/what-is-cors/")

### Configure a server

### Install a browser extension

![CORS preflight Browser extension solution](media/images/cors-preflight-browser-extension-solution.jpg "https://simplelocalize.io/blog/posts/what-is-cors/")

### Disable browser CORS checks

![Disble CORS preflight in Web Browser](media/images/disabled-cors-preflight-in-web-browser.jpg "https://simplelocalize.io/blog/posts/what-is-cors/")

### Set up proxy Server

![CORS preflight Porxy server solution](media/images/cors-preflight-proxy-server-solution.jpg "https://simplelocalize.io/blog/posts/what-is-cors/")

## Reference

[MDN WEB DOCS](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)  
[simplelocalize.io](https://simplelocalize.io/blog/posts/what-is-cors/)  
[CORS는 왜 이렇게 우리를 힘들게 하는 걸까?](https://yozm.wishket.com/magazine/detail/1225/)
