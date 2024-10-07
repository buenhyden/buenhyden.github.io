---
title: Traffic and Bandwidth
date: 2024-09-30 08:23:00
categories:
  - Network
  - Protocol
tags:
  - Traffic
  - 트래픽
  - Latency
  - Bandwidth
  - 대역폭
  - System-Design
description: 
comments: "true"
toc: "true"
media_subpath: /assets/img/
---
# Traffic
- 서버와 스위치 등 네트워크 장치에서 흐르는 데이터의 양
- 웹사이트에 트래픽이 많다는 것은 사용자 접속이 많아서 전송하는 데이터의 양이 많다는 것을 의미
- 트래픽이 너무 많으면 서버에 과부하가 걸려서 기능에 문제가 생길 수 있다
- 시스템을 관리하는 사람은 웹페이지의 트래픽 상황이 적절한지 계속 살펴보고 필요한 조치를 취해야 한다.
- 교통량(traffic)이라는 용어와 구별하기 위해 웹트래픽(web traffic) 또는 네트워크 트래픽(network traffic)이라고도 한다
- 일반적으로 바이트 단위(KBytes, MBytes, GBytes 등등)으로 표현
- `트래픽 = 용량 * 사용자 수 * 개수`
 ### 웹트래픽 분석
 - 방문자 수
 - 방문자 당 페이지 뷰 평균 수
 - 평균 방문 시간
 - 평균 페이지 뷰 시간
 - 도메인 클래스
 - 트래픽이 많은 시간대
 - 요청을 가장 많이 받은 페이지
 - 요청을 가장 많이 받은 엔트리(entry) 페이지
 - 요청을 가장 많이 받은 출구(exit) 페이지
 - 최상위 경로
 - 참조자
# Bandwidth (대역폭)- 특정한 기능을 수행할 수 있는 주파수의 범위
- 
- ## 대역폭의 종류
### 주파수 대역폭
- 신호가 차지하고 있는 주파수의 범위/폭
- 광학, 광통신 등에서는 주파수 대역폭보다 파장 대역폭을 더 많이 쓴다
- 통상, 대역폭은 **정보를 실을 수 있는 능력과 비례**
- Hz(Hertz) : 복합 신호에 포함된 주파수 영역 또는 채널이 통과시킬 수 있는 주파수 영역
	- 1Hz는 **1초에 한 번**을 의미
	- SI 기본 단위로 표현하면
	```katex
	      1s^{-1} \\
	 ```
### 파장 대역폭
- 시간 역수의 개념 **주파수 대역폭**과는 달리, 공간 길이의 개념을 갖는 **파장 대역폭**은 다음의 관계를 갖음
 ```katex
   λ = υ/ f \\
   파장( λ), 속도( υ), 주파수( f ) 의 관계식
  ```
### 데이터 처리 대역폭
  - 네트워크 또는 채널이 **일정 시간 내에 처리 가능한 최대의 데이터 처리능력**
  - 어떤 링크가 수용할 수 있는 트래픽의 최대 가용 용량 (단위 : 초당 처리 가능 비트 수)
	  - bps(bit per second) : 채널이나 링크, 네트워크 등이 통과시킬 수 있는 초당 비트의 수
  - 대역폭은 링크의 잠재 성능의 측정치 (상한)
  - 네트워크의 실질적인 성능을 나타내지 않는다.
>
![Compare the differences between network bandwidth vs. throughput.](network_bandwidth_vs_throughput-f.png "https://www.techtarget.com/searchnetworking/feature/Network-bandwidth-vs-throughput-Whats-the-difference")
Bandwidth(대역폭)와 Throughput(네트워크 출력 또는 처리율)은 동일한가?
-  **Bandwidth**는 일정 시간 내에 처리 가능한 최대의 데이터 처리 능력
-  **Throughtput(네트워크 출력 또는 처리율)**은 네트워크에서 얼마나 많은 데이터가 단위 시간 내에 목적지에 전달될 수 있는지에 대한 지표  
- **Throughtput(네트워크 출력 또는 처리율)**은 시간에 따라 달라지는 가변적인 값.
	- IT 시스템의 네트워크 레이어에서 출력이 일정하지 않다는 것은 문제가 발생했을 가능성이 높다!
- 네트워크 구간 중간에 패킷 손실이 발생하거나 출력을 담당하는 네트워크 컴포넌트에서 문제가 발생
   : 네트워크 출력을 지속적으로 모니터링하는 것이 필요.
- 실시간 모니터링하고 대시보드 그래프를 통해 모니터링하면서 Threshold 값의 범위를 넘어가는 경우 알람을 발생하는 방식을 많이 사용
![Bandwidth vs. Throughput](throughput-bandwidth.png "https://obkio.com/blog/network-speed-bandwidth-throughput/")
## 지연 (Delay, Latency)
- 지연 시간은 발신지로부터 첫 번째 비트가 목적지를 향해 떠난 후에 온전히 전체 메세지가 목적지에 모두 도착할 때까지 소요되는 시간
- 지연은 전파시간, 전송시간, 큐시간, 처리시간의 합
 `Latency = propagation time + transsmission time + queuing time + processing delay`
	 - propagation : 전파 시간
	   발신지로부터 목적지까지 이동하는 시간
	   전파시간 = 거리 / 전파 속도
	 - transsmission : 전송 시간
	   첫 번째 비트와 마지막 비트의 도착 시간 차이
	   전송시간 = 메세지 길이 / 대역폭
	 - queuing time : 큐 시간
	   메세지를 처리하기 전까지 메세지를 대기시키는 시간
	   네트워크에 부하에 따라 좌우된다
# IT 시스템 설계 시 용량 산정을 할 때 고려해야 할 대표적인 지표
- IT 시스템을 통해 동시에 얼마나 많은 사용자를 처리할 수 있을지 - **동시 사용자 수**
- IT 시스템이 사용자 1명당 보통 얼마의 리소스를 소비하는지 - **처리량**
- IT 시스템이 사용자에게 얼마나 빠른 시간 내에 응답해야 하는지 - **성능**
- IT 시스템이 단위 시간 내에 얼마나 많은 작업을 해야 하는지 - **TPS(Transaction Per Second)**
- 기타 등등 (기능성, 신뢰성, 효율성 ...)

# Reference
## Traffic
[1.트래픽이란?](https://velog.io/@dj_90/1.%ED%8A%B8%EB%9E%98%ED%94%BD%EC%9D%B4%EB%9E%80)  
[트래픽](https://wiki.hash.kr/index.php/%ED%8A%B8%EB%9E%98%ED%94%BD)  
[웹 트래픽](https://ko.wikipedia.org/wiki/%EC%9B%B9_%ED%8A%B8%EB%9E%98%ED%94%BD)
## Bandwidth
[네트워크 - 대역폭, bandwidth란 무엇인가](https://m.blog.naver.com/on21life/221340548735)  
[대역폭, bandwidth란 ?](https://velog.io/@ragnarok_code/%EB%8C%80%EC%97%AD%ED%8F%AD-bandwidth%EB%9E%80)  
[전송속도와 대역폭 이란 무엇인가?](https://trts1004.tistory.com/12109599)  
[[데이터통신] 네트워크 성능 - 대역폭(Bandwidth), 처리율](https://uzun.dev/118)  
