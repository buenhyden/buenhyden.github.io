---
type: posts
title: IP(Internet Protocol)
date: 2024-09-30 08:23:00
categories:
  - Network
  - Protocol
tags:
  - IP
  - Network
  - Packet
  - Protocol
  - Router
  - Switch
  - 트래픽
  - Traffic
  - Bandwidth
  - Latency
  - Packet-Loss
  - IP-Delivery-Modes
  - Unicast
  - Broadcast
  - Multicast
  - Anycast
description: 데이터 패킷이 네트워크를 통해 이동하고 올바른 대상에 도착할 수 있도록 데이터 패킷을 라우팅하고 주소를 지정하기 위한 프로토콜 또는 규칙의 집합
comments: "true"
toc: "true"
media_subpath: /assets/img/
---
![Client - Sever](Client-server-model.svg "https://ko.wikipedia.org/wiki/%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8_%EC%84%9C%EB%B2%84_%EB%AA%A8%EB%8D%B8#/media/%ED%8C%8C%EC%9D%BC:Client-server-model.svg")  
# IP (Internet Protocol)
![Internet Protocol(IP) Address Diagram](internet_protocol_ip_address_diagram.svg "https://www.cloudflare.com/ko-kr/learning/network-layer/internet-protocol/")  
- 데이터 패킷이 네트워크를 통해 이동하고 올바른 대상에 도착할 수 있도록 데이터 패킷을 라우팅하고 주소를 지정하기 위한 프로토콜 또는 규칙의 집합
- 인터넷을 통과하는 데이터는 패킷(Packet)이라고 하는 더 작은 조각으로 나뉜다.
- IP 정보는 각 패킷에 첨부되며, 이 정보는 라우터가 패킷을 올바른 위치로 보내는 데 도움이 된다.
- 인터넷에 연결하는 모든 장치나 도메인에는 IP 주소가 할당되며, 패킷이 연결된 IP주소로 전달되면 데이터가 필요한 곳에 도착한다.
- 패킷이 목적지에 도착하면 IP와 함께 어떤 전송 프로토콜이 사용되는지에 따라 다르게 처리된다.
- 모든 IP 데이터 패킷은 특정 정보를 특정 순서로 표시해야 하며 모든 IP 주소는 표준화된 형식을 따른다.
## IP 프로토콜의 한계
- 비연결성
  - 패킷을 받을 대상이 없거나 서비스 불능 상태여도 패킷 전송
- 비신뢰성
  - 중간에 패킷이 사라지면?
  - 패킷이 순서대로 안 오면?
- 프로그램 구분
  - 같은 IP를 사용하는 서버에서 통신하는 애플리케이션이 둘 이상이라면?

> 라우터 (Router)와 스위치 (Switch)
>> 라우터 (Router)
>>  -  둘 이상의 패킷 전환 네트워크 또는 서브 네트워크를 연결하는 장치
>>  -  데이터 패킷을 의도한 IP 주소로 전달하여 이러한 네트워크간의 트래픽을 관리하고, 여러 장치가 동일한 인터넷 연결을 사용할 수 있도록 하는 기능을 제공한다.
>>  -  대부분의 라우터는 근거리 통신망(LAN)과 광역 네트워크(WAN) 간의 데이터를 전달한다.  
>>  - 라우터는 어떻게 작동할까?
>> 	 - 패킷을 효과적으로 전달하기 위해 다양한 네트워크 대상에 대한 경로 목록인 **내부 라우팅 테이블**을 사용한다. 
>> 	 - 라우터는 패킷의 헤더를 읽어 어디로 가는지 확인한 다음 라우팅 테이블을 참조하여 해당 대상에 대한 가장 효율적인 경로를 파악하고 패킷을 경로상의 다음 네트워크로 전달한다. 
>
>>스위치 (Switch)
>> - 다른 디바이스를 연결하고 네트워크 내에서 노드 간 통신을 관리하여 데이터 패킷이 최종 목적지에 도달할 수 있도록 하는 디바이스
>> - 라우터가 네트워크 간에 정보를 전송하는 동안 스위치는 단일 네트워크의 노드 간에 정보를 전송한다. 
>> - 스위칭 유형
>> 	- 회선 스위칭 
>> 		- 네트워크 노드 사이에 전용 통신 경로를 설정한다. 
>> 		- 이 전용 경로는 전송 중에 전체 대역폭을 사용할 수 있도록 보장하므로 다른 트래픽이 해당 경로를 따라 이동할 수 없다. 
>> 	- 패킷 스위칭
>> 		- 데이터를 패킷이라는 독립적인 구성 요소로 분해한다. 
>> 		- 패킷은 크기가 작기 때문에 네트워크를 적게 요구한다. 
>> 		- 패킷은 네트워크를 통해 최종 목적지로 이동한다. 
>> 	- 메시지 스위칭
>> 		- 소스 노드에서 메시지 전체를 전송하며, 목적지 노드에 도달할 때까지 스위치에서 스위치로 이동한다. 

> 트래픽 (Traffic), 대역폭 (Bandwidth), 네트워크 출력(Throughput)
>>트래픽 (Traffic)
>> - 서버와 스위치 등 네트워크 장치에서 흐르는 데이터의 양.
>> - 웹사이트에 트래픽이 많다는 것은 사용자 접속이 많아서 전송하는 데이터의 양이 많다는 것을 의미한다.
>> - 트래픽이 너무 많으면 서버에 과부하가 걸려서 기능에 문제가 생길 수 있다.
>> - 시스템을 관리하는 사람은 웹페이지의 트래픽 상황이 적절한지 계속 살펴보고 필요한 조치를 취해야 한다.
>> - 교통량(traffic)이라는 용어와 구별하기 위해 웹트래픽(web traffic) 또는 네트워크 트래픽(network traffic)이라고도 한다.
>> - 일반적으로 바이트 단위(KBytes, MBytes, GBytes 등등)으로 표현
>>   `트래픽 = 용량 * 사용자 수 * 개수`
>> - 웹트래픽 분석
>> 	- 방문자 수
>> 	- 방문자 당 페이지 뷰 평균 수
>> 	- 평균 방문 시간
>> 	- 평균 페이지 뷰 시간
>> 	- 도메인 클래스
>> 	- 트래픽이 많은 시간대
>> 	- 요청을 가장 많이 받은 페이지
>> 	- 요청을 가장 많이 받은 엔트리(entry) 페이지
>> 	- 요청을 가장 많이 받은 출구(exit) 페이지
>> 	- 최상위 경로
>> 	- 참조자
> 
>> 대역폭 (Bandwidth)
>>  - **일정한 시간 내에 데이터 연결을 통과할 수 있는 정보량의 척도**
>>  - 컴퓨팅에서 사용 가능하거나 소비된 정보 용적의 비트레이트.
>>  - 일반적으로 초당 여러 비트로 표현된다. 
>> 	 - `메가 비트(Mbps)` 또는 `기가비트 급(Gbps)` 등의 `비트 레이트(bps)` 배수로 측정
>>  - `네트워크 대역폭(network bandwidth)`, `데이터 대역폭(data bandwidth)`, `디지털 대역폭(digital bandwidth)`이 있다.
>>  - 대역폭은 링크의 잠재 성능의 측정치 (상한)
>>  - 네트워크 대역폭
>> 	 - 네트워크 또는 채널이 **일정 시간 내에 처리 가능한 최대의 데이터 처리능력**을 의미한다.
>> 	 - 대역폭이 높을수록 많은 데이터가 네트워크에 실려서 전달하고 전달받을 수 있다. 
>> 	 - **대역폭 자체는 전달 속도와는 관계가 없으며 오히려 용량(capacity)과 관계가 있다**. 
>> 	 - bps, Mbps, Gbps를 단위로 사용
>> 	 - 네트워크의 실질적인 성능을 나타내지 않는다.
>
>>네트워크 출력(Throughput)
>>- 얼마나 많은 데이터가 단위 시간 내에 목적지에 전달될 수 있는지에 대한 지표.  - **네트워크 출력 또는 처리율 (Throughtput)** 은 시간에 따라 달라지는 가변적인 값이다.
>>- bps(bit/s), Mbps(Mbit/s), Gbps(Gbit/s) 단위로 표현한다. 
>>- IT 시스템의 네트워크 레이어에서 출력이 일정하지 않다?
>>	- 네트워크 구간 중간에 패킷 손실이 발생
>>	- 출력을 담당하는 네트워크 컴포넌트에서 문제가 발생
>>	: 네트워크 출력을 지속적으로 모니터링하는 것이 필요.
>>	실시간 모니터링하고 대시보드 그래프를 통해 모니터링하면서 Threshold 값의 범위를 넘어가는 경우 알람을 발생하는 방식을 많이 사용
>
>>네트워크 출력(Throughput) vs 대역폭 (Bandwidth)의 상관관계  
>>![Compare the differences between network bandwidth vs. throughput.](network_bandwidth_vs_throughput-f.png "https://www.techtarget.com/searchnetworking/feature/Network-bandwidth-vs-throughput-Whats-the-difference")  
>>- 단위 시간 내 많은 양의 데이터를 한 번에 보내기 위한 출력도 높이고, 이를 받아서 전달하는 파이프 역할을 하는 대역폭도 커야 한다. 
>>	- 출력이 높고 대역폭이 작다면, 네트워크 출구에서 대기하는 데이터가 많을 것이고, 이는 시스템의 성능에 안 좋은 영향을 미치게 된다. 
>>	- 출력이 낮은데 대역폭이 크다면, 대역폭과 비용의 낭비가 예상된다.  
>>- 동일한 사용자의 요청이 지속된다고 하더라도, 예상하지 못한 변화가 잦은 이유는 네트워크 상의 변수가 많기 때문이다. 
>>	- 대표적인 요인
>>		- `네트워크 지연(network latency)`: 예상하지 못한 시간(time)이 데이터 전달에 소요되는 현상.
>>		- `네트워크 혼잡(network congestion)`: 전달해야 하는 데이터의 양이 네트워크에 몰리는 현상
>>		- `패킷 손실(packet loss)`: 예상하지 못한 패킷(packet)이 전달하는 동안 손실되는 현상.
>
>> 대기 시간 (Latency) 
>> - 사용자가 요청을 한 시점부터 해당 사용자에게 요청에 대한 응답을 답기까지 걸리는 시간.
>> - 성능 향상의 주요 목표 중 하나는 대기 시간을 줄이는 것.
>> - 대기 시간은 데이터가 네트워크 한 지점에서 다른 지점으로 이동하는 속도를 측정하여 얻을 수 있다. 
>> - 자원에 대한 요청을 보내는 데 걸리는 시간 혹은 자원에 대한 브라우저의 요청이 다시 브라우저로 돌아오기까지 왕복 시간을 측정한다. 
>> - 종류
>> 	- Network Latency
>> 		- 데이터 요청이 요청을 작성하는 컴퓨터에서 응답하는 컴퓨터에 도달하는 데 걸리는 시간을 말한다. 이는 데이터가 응답하는 컴퓨터에서 요청한 컴퓨터로 다시 돌아오는 시간을 포함한다.
>> 	- Disk Latency
>> 		- 컴퓨터(일반적으로 서버)가 요청을 수신한 시점부터 응답을 반환하기까기 걸린 시간을 말한다. 
>
>> 대역폭 (Bandwidth), 네트워크 출력(Throughput) 그리고 Latency
>> ![Bandwidth vs. Throughput](throughput-bandwidth.png "https://obkio.com/blog/network-speed-bandwidth-throughput/")
> 
>>패킷 손실 (Packet Loss)
>>- 송수신되는 패킷이 손실된 상황.
>>- 높은 트래픽으로 인해 노드가 순간적으로 처리해야 할 패킷이 너무 많아지거나 네트워크상에 예기치 못한 장애가 발생해서 패킷을 처리하지 못하면 패킷 손실이 발생할 수 있다. 
>>- 패킷 손실은 `ping`명령어를 통해서 확인할 수 있다. 
>>	- ping 명령어는 수신지로 다수의 패킷을 전송해 도달 가능한지 여부를 알려준다. 
>>	- 몇 개의 패킷을 보내고, 받았는지, 몇 %의 패킷이 손실되었는지를 알 수 있다.  
>>	  ![패킷 손실](패킷-손실-1024x368.png "https://hongong.hanbit.co.kr/network-%ED%8A%B8%EB%9E%98%ED%94%BD%EA%B3%BC-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%B1%EB%8A%A5-%EC%A7%80%ED%91%9C/")

## Packet (패킷, 네트워크 패킷)
-  네트워크를 통해 전송되는 형식화된 데이터 덩어리.
-  모든 네트워크 패킷에는 헤더가 포함되어 있으므로 패킷을 수신하는 장치에서는 패킷의 출처, 패킷의 용도, 패킷의 처리 방법을 알 수 있다. 
-  패킷은 헤더와 페이로드의 두 부분으로 구성된다. 
	-  헤더에는 원본 및 대상  IP 주소와 같은 패킷에 대한 정보가 포함되어 있다.
		-  각 헤더는 네트워킹 프로세스의 다른 부분에서 사용된다. 
		-  패킷 헤더는 특정 유형의 네트워킹 프로토콜에 의해 연결된다. 
		-  프로토콜 중 일부는 해당 프로토콜과 관련된 정보가 있는 패킷에 헤더를 추가한다. 
			-  인터넷을 통과하는 패킷에는 대부분 전송 제어 프로토콜(TCP) 헤더와 인터넷 프로토콜(IP)헤더가 포함된다. 
	-  페이로드는 실제 데이터를 말한다. 
-  패킷 헤더는 각 패킷의 맨 앞에 있다. 라우터, 스위치, 컴퓨터, 패킷을 처리하거나 수신하는 모든 항목에는 헤더가 먼저 표시된다. 
-  패킷 끝에는 트레일러와 푸터를 부착할 수도 있다.
	-  푸터는 헤더와 마찬가지로 패킷에 대한 추가 정보가 포함되어 있다. 
	-  특정 네트워크 프로토콜에서만 트레일러 또는 푸터를 패킷에 연결한다. 대부분은 헤더만 첨부한다.
### 패킷을 사용하는 이유는?
-  패킷이 모두 대상에 도착하는 한 동일한 대상에 대해 서로 다른 네트워크 경로를 사용할 수 있음을 의미한다.
    - 특정 프로토콜에서 패킷은 각 패킷이 다른 경로를 사용하여 도착하더라도 올바른 순서로 최종 목적지에 도착해야 한다.
-  여러 컴퓨터의 패킷이 기본적으로 임의의 순서로 동일한 선로를 통해 이동할 수 있다. 
-  동일한 네트워킹 장비를 통해 동시에 여러 연결을 수행할 수 있다. 그 결과로 수십억 개의 장치가 인터넷에서 동시에 데이터를 교환할 수 있다. 
## IP 패킷이란?
-  인터넷 프로토콜(IP)은 라우팅과 관련된 네트워크 계층 프로토콜로 패킷이 올바른 대상에 도착하는지 확인하는데 사용된다. 
-  패킷은 때때로 사용 중인 프로토콜에 의해 정의된다. IP헤더가 있는 패킷은 **IP 패킷**이라고 할 수 있다. 
-  IP헤더에는 패킷의 출처(소스 IP 주소), 패킷이 이동하는 위치(대상 IP 주소), 패킷 크기, 네트워크 라우터가 패킷을 삭제하기 전에 패킷을 계속 전달해야 하는 기간 등에 대한 정보가 포함되어 있다.
-  패킷이 분편화될 수 있는지 여부를 나타낼 수 있고, 분편화된 패킷의 재조립에 대한 정보가 포함될 수 있다. 



## IP Delivery Modes
- 네트워크에서 데이터를 전송하는 다양한 방식.
![Unicast, Broadcast, Multicast, Anycast](unicast-broadcast-multicast-anycast.jpg "https://ipcisco.com/lesson/unicast-broadcast-multicast-anycast/#google_vignette")  
### Unicast (유니캐스트)
#### 특징
- 1 대 1 통신 방식
- 특정 수신자에게 직접 데이터 전송
#### 장점
#### 단점
#### 사용 시기
### Broadcast (브로드캐스트)
#### 특징
#### 장점
#### 단점
#### 사용 시기
### Multicast (멀티캐스트)
#### 특징
#### 장점
#### 단점
#### 사용 시기
### Anycast (애니캐스트)
#### 특징
#### 장점
#### 단점
#### 사용 시기
## Reference
### IP
[ip로 직접 만들어보는 네트워크 네임스페이스와 브리지 네트워크](https://www.44bits.io/ko/post/container-network-2-ip-command-and-network-namespace)  
### Protocol
[인터넷 프로토콜이란?](https://www.cloudflare.com/ko-kr/learning/network-layer/internet-protocol/)
[인터넷 프로토콜](https://velog.io/@dkdjsema9808/%EC%9D%B8%ED%84%B0%EB%84%B7-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)      
### 라우터(Router)
[라우터란?](https://www.cloudflare.com/ko-kr/learning/network-layer/what-is-a-router/)
### Traffic
[1.트래픽이란?](https://velog.io/@dj_90/1.%ED%8A%B8%EB%9E%98%ED%94%BD%EC%9D%B4%EB%9E%80)  
[트래픽](https://wiki.hash.kr/index.php/%ED%8A%B8%EB%9E%98%ED%94%BD)  
[웹 트래픽](https://ko.wikipedia.org/wiki/%EC%9B%B9_%ED%8A%B8%EB%9E%98%ED%94%BD)
[트래픽과 네트워크 성능 지표](https://hongong.hanbit.co.kr/network-%ED%8A%B8%EB%9E%98%ED%94%BD%EA%B3%BC-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%84%B1%EB%8A%A5-%EC%A7%80%ED%91%9C/)
### Bandwidth
[대역폭, bandwidth란 ?](https://velog.io/@ragnarok_code/%EB%8C%80%EC%97%AD%ED%8F%AD-bandwidth%EB%9E%80)  
[전송속도와 대역폭 이란 무엇인가?](https://trts1004.tistory.com/12109599)  
[[데이터통신] 네트워크 성능 - 대역폭(Bandwidth), 처리율](https://uzun.dev/118)  
### Latency
[대기 시간(Latency) 이해하기](https://developer.mozilla.org/ko/docs/Web/Performance/Understanding_latency)
[[IT용어 #1] 레이턴시(latency), 딜레이(delay), 렉(lag) 지연시간?!](https://blog.naver.com/alamode80/222439499168)
### 패킷
[패킷 (Packet)](https://developer.mozilla.org/ko/docs/Glossary/Packet)
[패킷이란? - 네트워크 패킷의 정의](https://www.cloudflare.com/ko-kr/learning/network-layer/what-is-a-packet/)
[JWT Token을 Header, Cookie 어디에 두는게 좋을까?](https://jusths.tistory.com/350)  
