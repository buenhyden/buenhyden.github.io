---
title: TLS & SSL
description: 보안 소켓 계층(SSL)은 네트워크상의 두 디바이스 또는 애플리케이션 간에 보안 연결을 생성하는 통신 프로토콜 또는 규칙 세트이고, 전송 계층 보안(TLS)은 기존 SSL 취약성을 수정하는 업그레이드된 SSL 버전
summary: 보안 소켓 계층(SSL)은 네트워크상의 두 디바이스 또는 애플리케이션 간에 보안 연결을 생성하는 통신 프로토콜 또는 규칙 세트이고, 전송 계층 보안(TLS)은 기존 SSL 취약성을 수정하는 업그레이드된 SSL 버전
linkTitle: TLS & SSL
date: 2023-11-12T10:25:14.475Z
lastmod: 2024-01-03T22:50:27
series:
  - Protocol
categories:
  - Network
  - Protocol
tags:
  - TLS/SSL
draft: false
featured: true
---

![Protocol](media/images/protocol.png "http://www.tcpipguide.com/free/t_TCPIPProtocols.htm")

|             | SSL                                                                         | TLS                                                                         |
| ----------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 의미        | SSL은 Secure Sockets Layer 즉, 보안 소켓 계층을 의미                        | TLS는 Transport Layer Security 즉, 전송 계층 보안을 의미                    |
| 버전 기록   | SSL은 이제 TLS로 대체되었습니다. SSL은 버전 1.0, 2.0 및 3.0이 있다          | TLS는 SSL의 업그레이드된 버전입니다. TLS는 버전 1.0, 1.1, 1.2 및 1.3이 있다 |
| 사용        | 모든 SSL 버전이 더 이상 사용되지 않는다                                     | TLS 버전 1.2 및 1.3이 현재 사용                                             |
| 알림 메시지 | SSL에는 두 가지 유형의 알림 메시지만 있다. 알림 메시지는 암호화되지 않는다. | TLS 알림 메시지는 암호화되며 더 다양                                        |
| 메시지 인증 | SSL은 MAC을 사용                                                            | TLS는 HMAC을 사용                                                           |
| 암호 그룹   | SSL은 알려진 보안 취약점이 있는 이전 알고리즘을 지원                        | TLS는 고급 암호화 알고리즘을 사용                                           |
| 핸드셰이크  | SSL 핸드셰이크는 복잡하고 느리다                                            | TLS 핸드셰이크는 단계가 적고 연결 속도가 빠르다                             |

## Reference

[AWS - SSL과 TLS의 차이점은 무엇인가요?](https://aws.amazon.com/ko/compare/the-difference-between-ssl-and-tls/)
[그림으로 쉽게 보는 HTTPS, SSL, TLS](https://brunch.co.kr/@swimjiy/47)
