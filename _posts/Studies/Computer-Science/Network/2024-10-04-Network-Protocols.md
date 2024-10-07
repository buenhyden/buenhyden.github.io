---
title: Network Protocol
date: 2024-10-04 06:18:00
categories:
  - Network
  - Protocol
tags:
  - Network
  - Protocol
  - TCP/IP
  - OSI-7layers
  - Encapsulation
  - Decapsulation
  - 캡슐화
  - 역캡슐화
description: 컴퓨터나 원거리 통신 장비 사이에서 메시지를 주고 받는 양식과 규칙의 체계이다. 통신 프로토콜은 신호 체계, 인증, 그리고 오류 감지 및 수정 기능을 포함
comments: "true"
toc: "true"
media_subpath: /assets/img/
---
# Protocol
- 컴퓨터나 원거리 통신 장비 사이에서 메시지를 주고 받는 양식과 규칙의 체계이다.
- 통신 프로토콜은 신호 체계, 인증, 그리고 오류 감지 및 수정 기능을 포함한다.  
![이 다이어그램은 TCP/IP 프로토콜을 TCP/IP 및 OSI 참조 모델 계층에 따라 배열하여 보여준다. 또한 네트워크 인터페이스 계층에서 TCP/IP 하드웨어 드라이버가 개념적으로 위치하는 곳을 보여준다. 이러한 드라이버는 TCP/IP가 LAN 또는 WAN 기술에서 구현될 때 2계층에서 사용되며, SLIP이나 PPP를 사용하는 대신에 사용된다.](protocol.png "http://www.tcpipguide.com/free/t_TCPIPProtocols.htm")  

## TCP/IP

컴퓨터 사이의 통신 표준 및 네트워크의 라우팅 및 상호연결에 대한 자세한 규칙을 지정하는 프로토콜 스위트로 인터넷에서 광범위하게 사용된다

## OSI 7계층

표준 프로토콜을 사용하여 다양한 통신 시스템이 통신할 수 있도록 국제표준화기구(ISO)에서 만든 개념 모델

- 상이한 컴퓨터 시스템이 서로 통신할 수 있는 표준을 제공
- 컴퓨터 네트워킹의 범용 언어로 볼 수 있다.
- 통신에 관련된 목적을 달성하기 위하여 계층별로 분할하여 분업이 가능  
![OSI 7Layers](osi-model-7-layers.SVG "https://www.cloudflare.com/ko-kr/learning/network-layer/what-is-a-protocol/")  

### 의의

- 네트워크 문제를 분석하고 문제의 원인을 분리하는 데 도움이 될 수 있다.
- 모델의 어느 특정 계층으로 문제를 좁힐 수 있을 경우 불필요한 많은 작업을 피할 수 있다.
- 기술표준인 기존 TCP 4계층 모델이 계층별로 역할이 불명확하여 발생했던 많은 문제들에 대한 해답을 제시

### 7. Application Layer(애플리케이션 계층)

![Application Layer](osi_model_application_layer_7.png "Application Layer")

- 사용자의 데이터와 직접 상호작용하는 유일한 계층
- 웹 브라우저 및 이메일 클라이언트와 같은 소프트웨어 애플리케이션은 통신을 개시하기 위해 애플리케이션 계층에 의지
  - 클라이언트 소프트웨어 애플리케이션은 애플리케이션 계층의 일부는 아님
- 애플리케이션 계층은 소프트웨어가 사용자에게 의미있는 데이터를 제공하기 위해 의존하는 프로토콜과 데이터를 조작하는 역할을 함
- 애플리케이션 계층 프로토콜 : HTTP, SMTP도 포함

### 6. Presentation Layer(프레젠테이션 계층)

![Presentation Layer](osi_model_presentation_layer_6.png "Presentation Layer")

### 5. Session Layer(세션 계층)

![Session Layer](osi_model_session_layer_5.png "Session Layer")

### 4. Transport Layer(전송 계층)

![Transport Layer](osi_model_transport_layer_4.png "Transport Layer")

### 3. Network Layer(네트워크 계층)

![Network Layer](osi_model_network_layer_3.png "Network Layer")

### 2. Data Link Layer (데이터 연결 계층)

![Data Link Layer](data_link_layer_osi_model.png "Data Link Layer")

### 1. Physical Layer (물리적 계층)

![Physical Layer](osi_model_physical_layer_1.png "Physical Layer")

## OSI 7계층 단계별 Network Protocol

![OSI 7계층 단계](osi-model-7-layers-1.png)  

> [!NOTE] 데이터 캡슐화(Encapsulation)와 역캡슐화(Decapsulation)
>
> - 데이터에 헤더(Header)를 붙이고 아래 계층에 보내는 것을 캡슐화(Encapsulation), 데이터에 헤더를 제거하고 위 계층에 보내는 것을 역캡슐화(Decapsulation)
> - 데이터 전송시 캡슐화가 이뤄지고 수신시 역캡슐화(Decapsulation)가 이뤄진다.
> - 데이터에 헤더(Header)를 붙이고 아래 계층에 보내는 것을 캡슐화(Encapsulation), 데이터에 헤더를 제거하고 위 계층에 보내는 것을 역캡슐화(Decapsulation)라고 한다.  
> ![OSI 7계층 데이터 캡슐](images_poiuyy0420_post_ad150139-1620-40c0-a12a-9b245a169dd1_iso7.jpg "https://velog.io/@poiuyy0420/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-OSI-7-%EA%B3%84%EC%B8%B5-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC")  
>    AH : Application Header  
>    PH : Presentation Header  
>    SH : Session Header  
>    TH : Transport Header  
>    NH : Network Header / NT : Network Tail  
>    DH : Data Link Header / DT : Data Link Tail

## Reference
### Protocol
[인터넷 프로토콜이란?](https://www.cloudflare.com/ko-kr/learning/network-layer/internet-protocol/)
[인터넷 프로토콜](https://velog.io/@dkdjsema9808/%EC%9D%B8%ED%84%B0%EB%84%B7-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)  
### TCP/IP
[주니어 개발자를 위한 엄청 쉬운 TCP/IP 4계층 이야기](https://yozm.wishket.com/magazine/detail/1956/)  
[주니어 개발자를 위한 TCP/IP 주요 프로토콜 알아보기](https://yozm.wishket.com/magazine/detail/2005/)  
[10분 만에 훑어보는 TCP와 UDP](https://wormwlrm.github.io/2021/09/23/Overview-of-TCP-and-UDP.html)
### OSI 7Layers
[OSI 모델이란?](https://cloudflare.com/ko-kr/learning/ddos/glossary/open-systems-interconnection-model-osi/)
["데이터가 전달되는 원리" OSI 7계층 모델과 TCP/IP 모델](https://velog.io/@hidaehyunlee/%EB%8D%B0%EC%9D%B4%ED%84%B0%EA%B0%80-%EC%A0%84%EB%8B%AC%EB%90%98%EB%8A%94-%EC%9B%90%EB%A6%AC-OSI-7%EA%B3%84%EC%B8%B5-%EB%AA%A8%EB%8D%B8%EA%B3%BC-TCPIP-%EB%AA%A8%EB%8D%B8#5-tcpip-%EB%AA%A8%EB%8D%B8)  
[OSI 7계층이란? - OSI 계층별 특징, TCP/IP 4계층](https://lxxyeon.tistory.com/155)  
[OSI 7계층](https://itwiki.kr/w/OSI_7%EA%B3%84%EC%B8%B5)  
[OSI 7계층이란 무엇일까?](https://velog.io/@jybin96/OSI-7%EA%B3%84%EC%B8%B5%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C)  
[[네트워크] OSI 7 계층 (OSI 7 LAYER) 기본 개념, 각 계층 설명](https://velog.io/@cgotjh/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-OSI-7-%EA%B3%84%EC%B8%B5-OSI-7-LAYER-%EA%B8%B0%EB%B3%B8-%EA%B0%9C%EB%85%90-%EA%B0%81-%EA%B3%84%EC%B8%B5-%EC%84%A4%EB%AA%85)  
[[네트워크] OSI 7 계층 (OSI 7 Layer)](https://backendcode.tistory.com/167)  
[Common Security Attacks in the OSI Layer Model](https://www.infosectrain.com/blog/common-security-attacks-in-the-osi-layer-model/)  
[Network ① OSI 7 Layers](https://velog.io/@xxell-8/OSI-7-Layers)  
[[네트워크] OSI 7 계층 개념 정리](https://velog.io/@poiuyy0420/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-OSI-7-%EA%B3%84%EC%B8%B5-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC)  
[OSI 7 layer](https://github.com/ssafy-tech-concert/ssafy-tech-concert/blob/master/Computer-Science/OSI%207%20layer.md)
### 캡슐화 & 역캡슐화
[[데이터통신 - 3] 캡슐화와 역캡슐화](https://gunjoon.tistory.com/15)  
[TIL - 네트워크 캡슐화 & 역캡슐화 (encapsulation & decapsulation)](https://velog.io/@qmasem/TIL-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%BA%A1%EC%8A%90%ED%99%94-%EC%97%AD%EC%BA%A1%EC%8A%90%ED%99%94-encapsulation-decapsulation)
