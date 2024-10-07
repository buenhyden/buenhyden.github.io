---
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
  - IPv4
  - IPv6
  - Router
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

> 라우터(Router)
> -  둘 이상의 패킷 전환 네트워크 또는 서브 네트워크를 연결하는 장치
> -  데이터 패킷을 의도한 IP 주소로 전달하여 이러한 네트워크간의 트래픽을 관리하고, 여러 장치가 동일한 인터넷 연결을 사용할 수 있도록 하는 기능을 제공한다.
> -  대부분의 라우터는 근거리 통신망(LAN)과 광역 네트워크(WAN) 간의 데이터를 전달한다.  
>> 라우터는 어떻게 작동할까?
>> -  패킷을 효과적으로 전달하기 위해 다양한 네트워크 대상에 대한 경로 목록인 내부 라우팅 테이블을 사용한다. 
>> -  라우터는 패킷의 헤더를 읽어 어디로 가는지 확인한 다음 라우팅 테이블을 참조하여 해당 대상에 대한 가장 효율적인 경로를 파악하고 패킷을 경로상의 다음 네트워크로 전달한다. 
## Packet (패킷, 네트워크 패킷)
-  네트워크를 통해 전송되는 형식화된 데이터 덩어리.
-  사용자가 이미지를 로드해야 한다고 가정해보면,
	-  이미지 파일은 웹서버에서 사용자의 컴퓨터로 단번에 전송되지 않는다. 대신 데이터 패킷으로 분해되어 인터넷의 유선, 케이블, 전파를 통해 전송된 다음 사용자의 컴퓨터에서 원본 사진으로 재조립된다.
###  패킷에 포함된 내용
-  사용자 데이터 : payload
	-  애플리케이션을 대신하여 전달되는 데이터
	-  네트워크 프로토콜과 때로는 경로의 장비에 의해 설정된 최대 길이까지 가변 길이
- 제어정보 : 페이로드를 전달하기 위한 정보
	- 소스와 목적지에 대한 네트워크 주소, 순서 정보, 오류 감지 코드 등으로 구성되며 일반적으로 패킷 헤더와 푸터에서 발견
- 홉 제한
	- 패킷이 한 네트워크에서 다음 네트워크로 전달될 때 발생
	- 패킷이 통과할 때마다 1씩 감소하는 필드로 홉 제한이 0에 도달하면 전송 작업이 실패하고 패킷이 삭제된다
	- 시간이 지남에 따라 패킷 수로 인해 폐쇄 회로 내에서 횡단이 발생할 수 있고, 순환하는 패킷 수가 증가하여 궁극적으로 네트워킹 실패로 이어질 수 있다
- 오류 감지 및 수정
	- 데이터가 수신기로 전송될 때 발생하는 오류를 감지하고 수정하는 데 사용되는 코드
	- 역방향 오류 수정과 순방향 오류 수정의 두 가지 유형이 존재
		- 역방향 오류 수정 : 수신자가 발신자에게 전체 데이터 단위를 재전송하도록 요청하는 경우
		- 순방향 오류 수정 : 수신자가 자동으로 오류를 수정하는 오류 수정 코드를 사용하는 것
- 우선순위
	- 어떤 패킷이 다른 패킷보다 더 높은 우선 순위를 가져야 하는지를 나타낸다.
	- 높은 우선순위 대기열은 네트워크가 혼잡할 때 낮은 우선순위 대기열보다 더 빨리 비워지게 된다.
- 주소
	- 네트워크 패킹을 라우팅할 때 송신 호스트의 소스 주소와 수신 호스트의 대상 주소라는 두 개의 네트워크 주소가 필요 
### 패킷 헤더란? 
-  패킷 헤더는 패킷의 내용, 원본, 대상에 대한 정보를 제공하는 일종의 **레이블**
-  패킷은 헤더와 페이로드의 두 부분으로 구성된다. 
	-  헤더에는 원본 및 대상 IP 주소와 같은 패킷에 대한 정보가 포함되어 있다. 
	-  페이로드는 실제 데이터로 이미지를 구성하는 수천 개의 패킷은 각각 페이로드를 가지며, 페이로드는 작은 이미지 조각을 전달한다. 
### 패킷 헤더의 출처는?
-  패킷에는 둘 이상의 헤더가 있으며, 각 헤더는 네트워킹 프로세스의 다른 부분에서 사용된다. 패킷 헤더는 특정 유형의 네트워킹 프로토콜에 의해 연결된다. 
-  프로토콜 중 일부는 해당 프로토콜과 관련된 정보가 있는 패킷에 헤더를 추가한다. 최소한, 인터넷을 통과하는 패킷에는 대부분 전송 제어 프로토콜(TCP) 헤더와 인터넷 프로토콜(IP)헤더가 포함된다. 
### 패킷 트레일러와 푸터란?
-  패킷 헤더는 각 패킷의 맨 앞에 있다. 라우터, 스위치, 컴퓨터, 패킷을 처리하거나 수신하는 모든 항목에는 헤더가 먼저 표시된다. 
-  패킷 끝에는 트레일러와 푸터를 부착할 수도 있다. 푸터는 헤더와 마찬가지로 패킷에 대한 추가 정보가 포함되어 있다. 
-  특정 네트워크 프로토콜에서만 트레일러 또는 푸터를 패킷에 연결한다. 대부분은 헤더만 첨부한다.
 ### IP 패킷이란?
-  인터넷 프로토콜(IP)은 라우팅과 관련된 네트워크 계층 프로토콜로 패킷이 올바른 대상에 도착하는지 확인하는데 사용된다. 
-  패킷은 때때로 사용 중인 프로토콜에 의해 정의된다. IP헤더가 있는 패킷은 **IP 패킷**이라고 할 수 있다. 
-  IP헤더에는 패킷의 출처(소스 IP 주소), 패킷이 이동하는 위치(대상 IP 주소), 패킷 크기, 네트워크 라우터가 패킷을 삭제하기 전에 패킷을 계속 전달해야 하는 기간 등에 대한 정보가 포함되어 있다. 
-  패킷이 분편화될 수 있는지 여부를 나타낼 수 있고, 분편화된 패킷의 재조립에 대한 정보가 포함될 수 있다. 
 ### 패킷을 사용하는 이유는?
 -  인터넷은 **패킷 스위칭** 네트워크로 패킷 스위칭은 네트워킹 장비가 서로 독립적으로 패킷을 처리하는 기능을 말한다. 
 -  패킷이 모두 대상에 도착하는 한 동일한 대상에 대해 서로 다른 네트워크 경로를 사용할 수 있음을 의미한다. (특정 프로토콜에서 패킷은 각 패킷이 다른 경로를 사용하여 도착하더라도 올바른 순서로 최종 목적지에 도착해야 한다.)
 -  패킷 스위칭 덕분에 여러 컴퓨터의 패킷이 기본적으로 임의의 순서로 동일한 선로를 통해 이동할 수 있다.  따라서 동일한 네트워킹 장비를 통해 동시에 여러 연결을 수행할 수 있다. 그 결과로 수십억 개의 장치가 인터넷에서 동시에 데이터를 교환할 수 있다. 
## IPv4와 IPv6의 비교
-  IPv4와 IPv6는 인터넷 프로토콜의 다른 버전.
-  IPv4는 1983년부터 실행되었으며, 현재도 사용중
	-  IPv4주소의 형식은 점으로 구분된 네 개의 숫자(예: '192.0.2.1')
		-  이는 32비트 형식이므로, 2^32^개, 즉 약 43억 개의 고유 IP 주소가 있을 수 있지만, 현재 인터넷을 이용하는 장치의 수에 비해 부족함.
		-  더 많은 IP 주소가 필요해져서 IPv6가 탄생하게 됨. 
-  IPv6 주소는 보다 복잡한 형식을 사용하며, 숫자와 문자가 하나 또는 두 개의 콜론으로 구분된다. (예: '2001:0db8:85a3:0000:0000:8a2e:0370:7334'). 
	- 이 128비트 형식은 2^128^개의 고유 주소를 지원할 수 있다. 
-  IPv6는 보안 및 개인 정보 보호 등의 측면에서도 IPv4를 개선함
-  둘 사이에 차이점이 있지만, IPv4와 IPv6 둘 다 10여년 동안 웹에서 동시에 사용됨. 
	- 두 버전은 동시에 실행할 수 있지만, IPv4와 IPv6 장치 간의 통신을 용이하게 하기 위해서는 특별한 조치를 구현해야 함. 
![Brief comparison of IPv4 and IPv6](Brief-comparison-of-IPv4-and-IPv6.png "https://www.researchgate.net/figure/Brief-comparison-of-IPv4-and-IPv6_fig4_339722884")
- IPv4와 IPv6의 header  
  ![IPv4 Header vs IPv6 Header](comparing-ipv4-and-ipv6-headers.png "https://www.networkacademy.io/ccna/ipv6/ipv4-vs-ipv6")

| IPv4 Field                                                                     | IPv6 Field          | Function                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fields that have the same functionality and the same name in IPv4 and IPv6** |                     |                                                                                                                                                                                                               |
| Version                                                                        | Version             | Indicates the version of the IP protocol in use.                                                                                                                                                              |
| Source Address                                                                 | Source Address      | The network layer identifier of the sender of the packet. 32-bit in IPv4 and is increased to 128-bit in IPv6.                                                                                                 |
| Destination Address                                                            | Destination Address | The network layer identifier of the receiver of the packet. 32-bit in IPv4 and is increased to 128-bit in IPv6.                                                                                               |
| **Fields that have the same functionality but their names were changed**       |                     |                                                                                                                                                                                                               |
| Type of Service                                                                | Traffic Class       | Used for traffic classification and marking. Nowadays, both protocols use the 6-bit Differentiated Services technique (DSCP).                                                                                 |
| Total Length                                                                   | Payload Length      | Indicates the length of the IP packet. In IPv4 the length includes both the IP header and the data. In IPv6, the length includes the data plus any extension headers but does not include the main IP header. |
| Time to Live                                                                   | Hop Limit           | Both fields have the same function. They ensure that packets do not loop around the network indefinitely.                                                                                                     |
| Protocol                                                                       | Next Header         | Indicates the protocol being transported in the payload portion. In IPv6, it could also indicate the existence of an extension header.                                                                        |
| **Fields that exist in IPv4 and have been removed from IPv6**                  |                     |                                                                                                                                                                                                               |
| Internet Header Length                                                         |                     | In IPv4, this field is used in cases when the header is variable length. It is not needed in IPv6, because the v6 header is a fixed-length - 40 bytes.                                                        |
| Identification, Flags, Fragment Offset                                         |                     | In IPv4, these fields are used when doing fragmentation. In IPv6, only the source of the packet is performing fragmentation using the Fragmentation extension header.                                         |
| Header Checksum                                                                |                     | After many years of experience, the designers of IPv6 decided that this field is redundant and not necessary anymore because there are checksum fields in the upper layer protocols.                          |
| Options                                                                        |                     | Options are now handled using the extension headers in IPv6, so this field is not necessary.                                                                                                                  |
| Padding                                                                        |                     | Because IPv6 is fixed-sized, padding is not necessary.                                                                                                                                                        |
| **Fields that are new in IPv6 and do not exist in IPv4**                       |                     |                                                                                                                                                                                                               |
|                                                                                | Flow Label          | A new field in IPv6 that is used for identifying that a packet is part of a sequence and has to be handled the same way as the entire traffic flow.                                                           |

## Reference
### IP
[ip로 직접 만들어보는 네트워크 네임스페이스와 브리지 네트워크](https://www.44bits.io/ko/post/container-network-2-ip-command-and-network-namespace)  
### 라우터(Router)
[라우터란?](https://www.cloudflare.com/ko-kr/learning/network-layer/what-is-a-router/)
### 패킷
[패킷 (Packet)](https://developer.mozilla.org/ko/docs/Glossary/Packet)
[패킷이란? - 네트워크 패킷의 정의](https://www.cloudflare.com/ko-kr/learning/network-layer/what-is-a-packet/)
[JWT Token을 Header, Cookie 어디에 두는게 좋을까?](https://jusths.tistory.com/350)  
### IPv4와 IPv6
[IPv4와 IPv6의 차이점](https://www.juniper.net/kr/ko/research-topics/what-is-ipv4-vs-ipv6.html)
[IPv4 vs IPv6 - Understanding the differences](https://www.networkacademy.io/ccna/ipv6/ipv4-vs-ipv6)
### Protocol
[인터넷 프로토콜이란?](https://www.cloudflare.com/ko-kr/learning/network-layer/internet-protocol/)
[인터넷 프로토콜](https://velog.io/@dkdjsema9808/%EC%9D%B8%ED%84%B0%EB%84%B7-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)  