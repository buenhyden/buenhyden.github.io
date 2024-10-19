---
type: posts
title: 
date: 2024-10-17 12:59:00
categories:
  - 
tags:
  - 
description: 
comments: "true"
toc: "true" 
media_subpath: /assets/img/
---
# Network Protocol
- 컴퓨터나 원거리 통신 장비 사이에서 메시지를 주고 받는 양식과 규칙의 체계이다.
- 통신 프로토콜은 신호 체계, 인증, 그리고 오류 감지 및 수정 기능을 포함한다.  
![이 다이어그램은 TCP/IP 프로토콜을 TCP/IP 및 OSI 참조 모델 계층에 따라 배열하여 보여준다. 또한 네트워크 인터페이스 계층에서 TCP/IP 하드웨어 드라이버가 개념적으로 위치하는 곳을 보여준다. 이러한 드라이버는 TCP/IP가 LAN 또는 WAN 기술에서 구현될 때 2계층에서 사용되며, SLIP이나 PPP를 사용하는 대신에 사용된다.](protocol.png "http://www.tcpipguide.com/free/t_TCPIPProtocols.htm")  
## FTP
파일 전송 프로토콜 (File Transfer Protocol)의 약자
## SMTP
인터넷을 통해 이메일 메시지를 보내고 받는 데 사용되는 통신 프로토콜
## IMAP
## POP
## NNTP
## UDP
비디오 재생 또는 DNS 조회와 같이 시간에 민감한 전송을 위해 인터넷을 통해 사용
## TCP
## IPSec
네트워크에서의 안전한 연결을 설정하기 위한 통신 규칙 또는 프로토콜 세트로 암호화와 인증을 추가하여 프로토콜을 더욱 안전하게 만든다.
## ICMP
네트워크 장치에서 네트워크 통신 문제를 진단하는 데 사용하는 네트워크 계층 프로토콜
## ARP
## SLIP
## PIP
## SNMP
## HTTP(S)
W3 상에서 정보를 주고받을 수 있는 프로토콜
### HTTP Status Code
특정 HTTP 요청이 성공적으로 완료되었는지 알려준다
### HTTP Request Methods
HTTP는 요청 메서드를 정의하여, 주어진 리소스에 수행하길 원하는 행동을 나타낸다.
## NFS
## DHCP
Dynamic Host Configuration Protocol(동적 호스트 구성 프로토콜)'의 약자로, IP 네트워크에 사용되는 네트워크 프로토콜
## RMON
## TFTP
## IGMP
여러 장치가 하나의 IP 주소를 공유하여 모두 동일한 데이터를 수신할 수 있도록 하는 네트워크 계층 프로토콜
## NTP
인터넷에서 라우터 및 기타 하드웨어 디바이스의 클럭을 동기화하는 데 널리 사용되는 프로토콜
## SSL/TLS
보안 소켓 계층(SSL)은 네트워크상의 두 디바이스 또는 애플리케이션 간에 보안 연결을 생성하는 통신 프로토콜 또는 규칙 세트이고, 전송 계층 보안(TLS)은 기존 SSL 취약성을 수정하는 업그레이드된 SSL 버전

|        | SSL                                              | TLS                                                     |
| ------ | ------------------------------------------------ | ------------------------------------------------------- |
| 의미     | SSL은 Secure Sockets Layer 즉, 보안 소켓 계층을 의미        | TLS는 Transport Layer Security 즉, 전송 계층 보안을 의미           |
| 버전 기록  | SSL은 이제 TLS로 대체되었습니다. SSL은 버전 1.0, 2.0 및 3.0이 있다 | TLS는 SSL의 업그레이드된 버전입니다. TLS는 버전 1.0, 1.1, 1.2 및 1.3이 있다 |
| 사용     | 모든 SSL 버전이 더 이상 사용되지 않는다                         | TLS 버전 1.2 및 1.3이 현재 사용                                 |
| 알림 메시지 | SSL에는 두 가지 유형의 알림 메시지만 있다. 알림 메시지는 암호화되지 않는다.    | TLS 알림 메시지는 암호화되며 더 다양                                  |
| 메시지 인증 | SSL은 MAC을 사용                                     | TLS는 HMAC을 사용                                           |
| 암호 그룹  | SSL은 알려진 보안 취약점이 있는 이전 알고리즘을 지원                  | TLS는 고급 암호화 알고리즘을 사용                                    |
| 핸드셰이크  | SSL 핸드셰이크는 복잡하고 느리다                              | TLS 핸드셰이크는 단계가 적고 연결 속도가 빠르다                            |
## LDAP
사용자가 조직, 구성원 등에 대한 데이터를 찾는 데 도움이 되는 프로토콜입니다. LDAP는 LDAP 디렉터리에 데이터를 저장하고 사용자가 디렉터리에 액세스할 수 있도록 인증하기 위해 주로 사용
## Web Socket
하나의 TCP 접속에 전이중 통신 채널을 제공하는 컴퓨터 통신 프로토콜
![Web Socket](web-socket.png "https://blog.stackademic.com/api-101-introduction-imp-of-api-paradigms-8d8e0e463f96")

### Web Socket이란?

- 통신 프로토콜
- 실시간으로 상호작용하는 웹 서비스를 만드는 표준 기술
- TCP 위에서 동작
## SSH
네트워크 상 다른 컴퓨터의 쉘을 사용할 수 있게 해 주는 프로그램 혹은 그 프로토콜


## Reference
### HTTP(S)
[웹 개발자라면 알고 있어야 할 HTTP의 진화 과정](https://yozm.wishket.com/magazine/detail/1686/)  
[[네트워크] Low Level HTTP 통신](https://devocean.sk.com/experts/techBoardDetail.do?ID=163937&boardType=experts)  
[[네트워크] Raw HTTP Message 확인하기](https://devocean.sk.com/experts/techBoardDetail.do?ID=165318&boardType=experts)
[HTTP vs HTTPS 차이, 알면 사이트의 레벨이 보인다.](https://yozm.wishket.com/magazine/detail/130/)  
[HTTP의 새로운 메서드, 서치(SEARCH)에 대하여](https://yozm.wishket.com/magazine/detail/694/)  
[HTTP, 그리고 HTTPS의 이해](https://yozm.wishket.com/magazine/detail/471/)  
[그림으로 쉽게 보는 HTTPS, SSL, TLS](https://brunch.co.kr/@swimjiy/47)  
[웹 개발자라면 알고 있어야 할 HTTP의 진화 과정](https://wormwlrm.github.io/2022/09/02/Evolution-of-HTTP.html)
[안전한 웹을 위해 HTTPS 이해하기: 1. HTTPS의 작동 원리](https://yozm.wishket.com/magazine/detail/1852/)  
[안전한 웹을 위해 HTTPS 이해하기: 2. HTTPS를 강제하는 HSTS 기술](https://yozm.wishket.com/magazine/detail/1862/)
[HTTP status Code](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)
[HTTP 요청 메서드](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods)

### UDP
[10분 만에 훑어보는 TCP와 UDP](https://wormwlrm.github.io/2021/09/23/Overview-of-TCP-and-UDP.html)
[HTTP/3는 왜 UDP를 선택한 것일까?](https://evan-moon.github.io/2019/10/08/what-is-http3/)  
### SSL/TLS
[AWS - SSL과 TLS의 차이점은 무엇인가요?](https://aws.amazon.com/ko/compare/the-difference-between-ssl-and-tls/)
[그림으로 쉽게 보는 HTTPS, SSL, TLS](https://brunch.co.kr/@swimjiy/47)
[LINT: HTTP/2와 TLS를 통한 네트워크 현대화](https://engineering.linecorp.com/ko/blog/LINT-newtork-modernization-http2-tls)  
### LDAP
[알아두면 쓸데있는 LDAP](https://www.samsungsds.com/kr/insights/ldap.html)  
[[LDAP] 개념 잡기](https://yongho1037.tistory.com/796)  
[LDAP이란 무엇인가](https://hec-ker.tistory.com/319)  
[LDAP에 대해 알아보자](https://medium.com/ecube-labs/ldap%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-4e5aecd358e3)  
[5분 안에 구축하는 LDAP](https://co-de.tistory.com/114)  
[Docker로 간단하게 LDAP 서버 구성하기](https://thearchivelog.dev/article/how-to-setup-ldap-server-with-docker/)  
[LDAP](https://ldap.or.kr/category/ldap/)
[LDAP(Lightweight Directory Access Protocol) 인증이란?](https://www.redhat.com/ko/topics/security/what-is-ldap-authentication#ldap%EC%99%80-active-directory-%EB%B9%84%EA%B5%90)
### Web Socket
[Web Socket 이란?](https://velog.io/@codingbotpark/Web-Socket-%EC%9D%B4%EB%9E%80)
[웹소켓](https://ko.wikipedia.org/wiki/%EC%9B%B9%EC%86%8C%EC%BC%93)
[WebSocket이란 무엇이며 어떻게 생성합니까?](https://appmaster.io/ko/blog/websocketiran-mueosimyeo-eoddeohge-saengseonghabnigga)
[웹소켓으로 개발하기 전 알아야 할 것들](https://yozm.wishket.com/magazine/detail/1911/)
[[웹소켓] WebSocket의 개념 및 사용이유, 작동원리, 문제점](https://nanbuja.com/entry/%EC%9B%B9%EC%86%8C%EC%BC%93-WebSocket%EC%9D%98-%EA%B0%9C%EB%85%90-%EB%B0%8F-%EC%82%AC%EC%9A%A9%EC%9D%B4%EC%9C%A0-%EC%9E%91%EB%8F%99%EC%9B%90%EB%A6%AC-%EB%AC%B8%EC%A0%9C%EC%A0%90)
[[Web] 웹소켓(WebSocket)이란? 웹소켓과 HTTP의 차이](https://code-lab1.tistory.com/300)
### SSH
![SSH 명칭부터 접속까지 한 번에 이해하기 1](https://library.gabia.com/contents/infrahosting/9002/)  
![SSH 명칭부터 접속까지 한 번에 이해하기 2](https://library.gabia.com/contents/9008/)
