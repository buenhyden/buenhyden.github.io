---
type: posts
title: IP Address
date: 2024-10-01 08:23:00
categories:
  - Network
  - Protocol
tags:
  - Network
  - IP-Address
  - Public-IP
  - Private-IP
  - Network-Class
  - CIDR
  - IPv4
  - IPv6
  - NAT
  - Network-Address-Translation
  - Subnet
  - Subnet-mask
  - Subnetting
  - 접두어-합침
  - Routing-Prefix-Aggregation
  - Routing-Prefix-Summarization
  - Fragmentation
  - 프래그먼테이션
  - Loopback-Address
description: 인터넷에 연결하는 장치나 도메인에 할당된 고유 식별자로 컴퓨터 네트워크에서 장치들이 서로를 인식하고 통신을 하기 위해서 사용하는 특수한 번호
comments: "true"
toc: "true"
media_subpath: /assets/img/
---
![IP 주소란 무엇이고 IP 주소는 왜 중요할까요?](ddos-dns.svg "https://www.cloudflare.com/ko-kr/learning/dns/glossary/what-is-my-ip-address/")  
# IP Address(IP 주소)  
- IP Address는 인터넷에 연결하는 장치나 도메인에 할당된 고유 식별자로 컴퓨터 네트워크에서 장치들이 서로를 인식하고 통신을 하기 위해서 사용하는 특수한 번호.
- 네트워크에 연결된 장치가 라우터이든, 일반 서버이든, 모든 기계는 이 특수한 번호를 가지고 있어야 한다.
- 이 번호를 이용하여 발신자를 대신하여 메시지가 전송되고 수신자를 향하여 예정된 목적지로 전달된다.
- 각 IP 패킷에는 패킷을 보내는 장치 또는 도메인의 IP 주소와 대상 수신자의 IP 주소가 모두 포함된다.
- 각 IP Address는 '192.168.1.1'과 같은 일련의 숫자로 사람이 읽을 수 있는 도메인 이름을 IP 주소로 변환하는 DNS를 통해 사용자는 이 복잡한 일련의 숫자를 기억하지 않고도 웹 사이트에 액세스할 수 있다.  
- IP Address는 IPv4와 IPv6 중 어떤 프로토콜을 사용하는지에 따라 형식이 다르다.  
## IPv4와 IPv6
-  인터넷 프로토콜(IP) 주소 지정 시스템의 두 가지 버전.
-  IPv6는 IPv4와의 하위 호환성을 제공하지 않는다. 
	- 웹사이트가 IPv4에서 실행되고 있지만 장치와 ISP가 최신 프로토콜을 사용하는 경우 웹사이트에 접속할 수 없다. 
-  두 버전은 동시에 실행할 수 있지만, IPv4와 IPv6 장치 간의 통신을 용이하게 하기 위해서는 특별한 조치를 구현해야 함.  
	-  Network Address Translation(NAT)과 같은 다른 주소 지정 시스템을 계층화하여 추상화는 것이 있다. 
-  IPv4 인터넷 주소 중 약 5억 8800만 개는 예약된 주소이며 나머지는 공개적으로 사용할 수 있다.  
### IPv4 주소의 구성
-  호스트가 속한 네트워크 주소인 Network Address, 호스트의 주소인 Host Address로 구성된다.
		-  Network Address는 어떤 네트워크인지를 나타내 다른 네트워크와 구분하는 역할을 한다. 
		-  Host Address는 해당 네트워크의 어느 호스트인지를 나타내 다른 호스트와 구분하는 역할을 한다. 
- Network Address가 다르다는 것은 서로 다른 네트워크라는 의미이고, 라우터를 통하지 않고는 통신이 불가능하다는 의미이다. 
- 서로 다른 네트워크가 라우터를 통해 통신이 가능한 것은 라우터가 IP 주소의 Network Address를 보고 라우팅하여 데이터를 전송하기 때문이다.   
  ![Anatomy of IPv4 Address](anatomy-of-ipv4-address.webp "https://thecybersecurityman.com/2017/12/29/ip-addresses-version-4/")  
> 네트워크 클래스 (Network Class)
> -  IPv4 도입 초기에는 클래스(Class)를 기준으로 Network Class와 Host Address를 나누는 방식을 사용했지만, 클래스 방식의 비효율성으로 인해 현재는 서브넷 마스크(Subnet mask) 방식을 사용하고 있다. 
> - 클래스 기준은 IP 주소를 앞에서 8비트씩 나눈 그룹을 조합하여 Network Address와 Host Address를 정한 것. 
> - 클래스의 종류  
>   ![IPv4주소 구성](visual102-02.jpg "https://xn--3e0bx5euxnjje69i70af08bea817g.xn--3e0b707e/jsp/resources/ipv4Info.jsp")  
> 	- 클래스 A : IP 주소 32비트 중 앞 8비트를  Network Address로, 다음 24비트를 Host Address를 정한 것
> 		-  제일 첫번째 비트는 클래스 A의 식별비트인 `0`이 할당되기 때문에 00000000 ~ 01111111의 번호가 Network Address로 사용된다. 
> 			- **클래스 A의 네트워크 부는 0 ~ 127 번호가 할당**
> 			- Network Address의 0과 127은 예약된 network ID로 제외된다.  
> 		-  범위는 0.0.0.0 ~ 127.255.255.255.
> 		-  기본 subnet mask는 255.0.0.0.
> 		-  Host Address에서 0.0.0은 네트워크 주소로 사용되고 1.1.1은 브로드캐스트 주소로 사용된다. 
> 	- 클래스 B : IP 주소 32비트 중 앞 16비트를 Network Address로, 다음 16비트를 Host Address를 정한 것
> 		-  맨 앞 2비트는 클래스 B의 식별 비트인 `10`으로 할당되기 때문에 10000000 ~ 10111111의 번호가 Network Address의 첫 8비트로 사용된다.
> 			- **클래스 B의 네트워크 부는 128.0 ~ 191.255 번호가 할당**.
> 			- Network Address의 172.16~172.31은 예약된 network ID로 제외된다.  
> 		-  범위는 128.0.0.0 ~ 191.255.255.255.
> 		-  기본 subnet mask는 255.255.0.0.
> 		-  Host Address에서 0.0.0은 네트워크 주소로 사용되고 1.1.1은 브로드캐스트 주소로 사용된다.
> 	- 클래스 C : IP 주소 32비트 중 앞 24비트를  Network Address로, 다음 8비트를 Host Address를 정한 것
> 		-  맨 앞 3비트는 클래스 C의 식별 비트인 '110'으로 할당되기 때문에 11000000 ~ 11011111의 번호가 Network Address의 첫 8비트로 사용된다.
> 			- **클래스 C의 네트워크 부는 192.0.0 ~ 255.255.255 번호가 할당**.  
> 			- Network Address의 192.168.0~192.168.255은 예약된 network ID로 제외된다.  
> 		-  범위는 192.0.0.0 ~ 223.255.255.255.
> 		-  기본 subnet mask는 255.255.255.0.
> 		-   Host Address에서 0.0.0은 네트워크 주소로 사용되고 1.1.1은 브로드캐스트 주소로 사용된다.
> 	- 클래스 D : 멀티캐스트를 위해서 존재하는 네트워크.
> 	- 클래스 E : 예약된 주소로 미래에 사용될 용도로 구분해 놓은 네트워크.
> 
>> 서브넷(Subnet), 서브넷 마스크 (Subnet mask), 서브넷팅(Subnetting)
>>
>>> 서브넷팅(Subnetting)
>>> -  대규모 네트워크를 더욱 작은 단위의 네트워크로 분할하는 것. 
>>> -  IP 주소의 낭비를 방지하고 브로드캐스트 도메인의 크기를 줄여서 성능을 향상하는 것이 주된 목적이다. 
>>
>>> 서브넷(Subnet)
>>> - 서브넷팅을 통해 분할된 네트워크.  
>>> -  IP 주소 공간을 서브넷으로 분할하면 네트워크를 효율적으로 관리하고, 더 많은 호스트들을 지원할 수 있으며 보안을 강화할 수 있다. 
>>
>>> 서브넷 마스크 (Subnet mask)
>>> -  IP 주소를 서브네팅하는 경우 IP주소와 별도로 어디까지가 Network Address이고 어디까지고 Host Address인지 구별할 수 있는 식별자가 필요한데 이를 서브넷 마스크라고 한다. 
>>> 	-  주어진 IP 주소를 네트워크 환경에 맞게 나누어 주기 위해서 씌워주는 이진수의 조합.
>>>   ![The function of the subnet mask](function-subnet-mask.svg "https://www.networkacademy.io/ccna/ip-subnetting/the-subnet-mask")  ![Number of hosts per subnet](number-hosts-per-subnet.svg "https://www.networkacademy.io/ccna/ip-subnetting/the-subnet-mask")  ![Determining the boundaries of a subnet](determining-a_subnet-boundary.svg "https://www.networkacademy.io/ccna/ip-subnetting/the-subnet-mask")
> 
> CIDR
> -  Classless Inter-Domain Routing 으로 클래스 없는 도메인간 라우팅 기법으로 기존의 IP 주소 할당 방식이었던 Network Class를 대체함. 
> -  네트워크 정보를 여러 개로 나누어진 Sub-Network들을 모두 나타낼 수 있는 하나의 Network로 통합해서 보여주는 방법.
> - CIDR 블록
> 	-  비트(Bit)단위, 접두어 기반의 IP 주소 표준 분석방식이다.  
> 		-  일련의 주소를 무리 지어 하나의 라우팅 테이블 항목에 넣는 것으로 라우팅을 실행한다. 
> 		-  CIDR 블록이라 불리는 그룹에 포함된 여러 IP 주소는 **이진 표기**를 하였을 때 동일한 일련의 초기 비트를 가진다. 
> 	-  점과 숫자로 이루어진 4부분의 주소와 ‘/’뒤의 0에서 32까지의 숫자로 이루어진다. 즉, _A.B.C.D/N_과 같은 형태
> 		-  점과 숫자로 이루어진 부분은 IPv4 주소와 마찬가지로 4개의 8비트 단위 바이트로 이루어진 32비트 이진 숫자이다.
> 		-  ‘/’뒤의 숫자는 _접두어 길이_라고 하며, 주소의 왼쪽으로부터 세어서 공유하는 초기 비트의 수를 가리킨다.
> 	-  만약 이진 형태로 변화한 IP 주소의 첫 자리 비트에서 CIDR 접두어 N비트 길이만큼 일치한다면, 해당 IP 주소는 CIDR 블록의 일부라고 하며, CIDR 접두어와 일치한다고 한다. 
> 	-  IPv6 주소에서도 사용될 수 있으며, 이 경우 긴 주소로 말미암아 접두어 길이는 0~128까지의 범위를 지닌다. 
> ![CIDR 접두어 일치의 예시](487px-IP_Address_Match.svg.png "https://ko.wikipedia.org/wiki/CIDR")  
> - CIDR 블록의 할당  
> 	-  1990년대 후반, 208.130.29.33은 `www.fresssoft.org` 웹 서버에 할당되어 있었는데, 3개의 CIDR 접두어를 가진다. 
> 		-  큰 CIDR 블록인 208.128.0.0/11이 ARIN(북미 RIR)에서 MCI에 할당됨.
> 		-  버지니아주에 있는 재공급업자인 Automation Research Systems는 MCI로부터 인터넷 접속을 승인받아 208.130.28.0/22를 부여받음.
> 		-  ARS는 /24 블록을 공공 서버용으로 할당하였고, 208.130.29.33은 그 중 하나이다.
> 	-  하나의 주소에 대한 이러한 여러 CIDR 접두어는 네트워크상의 서로 다른 영역에서 각각 사용된다. 
> 		-  MCI 네트워크 외부에서는 208.128.0.0/11 접두어가 MCI 트래픽 영역으로 접근하기 위해 사용된다. 
> 		-  MCI 네트워크 내부에서는 208.128.28.0/22가 사용되며, 패킷을 ARS로 보내는 역할을 한다. 
> 		-  208.130.29.0/24는 ARS 네트워크 내부에서만 사용된다. 
> ![An broken down by its CIDR prefixes](640px-CIDR_Address.svg.png "https://ko.wikipedia.org/wiki/CIDR")
>> 접두어 합침 (Routing prefix aggregation, 혹은 summarization)
>> -  16개의 연속된 /24 네트워크(네트워크 주소의 처음 20비트가 모두 일치하는 경우)는 같이 합쳐져서 외부에는 하나의 /20 네트워크로 보일 수 있다. 두 개의 연속된 /20 네트워크는 차례로 하나의 /19 네트워크로 묶일 수 있으며, 이는 계속될 수 있다. 
>> - 인터넷상에서 노선의 수를 많이 감소시켜주며, 라우팅 테이블이 라우터가 감당할 수 없을 정도로 커지는 것을 방지한다. 
>> ![Route Summarization](GUID-CBB50420-82CE-4F46-98BA-24A1BF644290-low.png "https://docs.vmware.com/en/VMware-SD-WAN/6.0/VMware-SD-WAN-Administration-Guide/GUID-72405FEF-C3B9-47E9-A332-869FB35DB1DC.html")
### IPv6 주소의 구성
-  앞 64비트를 Network Address로, 뒤 64비트를 네트워크에 연결된 랜카드 장비 등에 할당하는 Interface Address로 활용한다. (RFC 2373에 의거)
-  Network Address 부분인 64비트 내에서 앞 48비트는 상위 네트워크 주소로 뒤 16비트는 하위 네트워크 주소로 활용한다. (RIR(Regional Internet Registry)간 협의에 기초)  
  ![An example of the different segments of an IPv6 address](whatis-ipv6_address-h.png "https://www.techtarget.com/iotagenda/definition/IPv6-address")  
### IPv4와 IPv6의 유사점
#### 지정된 명명 시스템
- 인터넷에 있는 모든 디바이스의 이름을 고유하게 지정하거나 식별할 수 있도록 설계되었다. 
#### 코어 프로토콜
-  모두 Transmission Control Protocol/Internet Protocol(TCP/IP) 프로토콜 제품군에 속한다. 
#### 비연결 데이터 전송
-  다중 패킷 라우팅을 사용하여 데이터를 작은 블록으로 분할한 후 인터넷을 통해 전송하는 비연결 프로토콜이다.
	- 동일한 데이터의 패킷이 서로 다른 인터넷 트래픽 경로를 사용하여 인터넷을 통해 전송될 수 있으며 이는 수신 디바이스에서 패킷이 올바른 순서로 재구성된다. 
### IPv4와 IPv6의 차이점
#### 주소 공간
-  IPv4는 32비트 주소 체계, 주소 공간은 2³², 즉 42억 9,496만 7,296개의 IP 주소.
-  IPv6는 128비트 주소 체계, 주소 공간은 2¹²⁸, 3.403×10³ 또는 340,282,366,920,938,000,000,000,000,000,000,000,000개의 고유 IP 주소로 훨씬 크다.
#### 명명
-  IPv4에서 주소 이름은 4개의 10진수로 이루어진 숫자 주소(0~255 범위)로 표시되며, 각 숫자는 8비트를 나타내고 세 개의 마침표로 구분된다.  
   _197.0.0.1_
-  IPv6에서 주소 이름은 숫자(0~9)와 문자(A~F)로 구성된 8개의 16진수로 표시되며, 각 숫자는 4비트를 나타내고 콜론으로 구분된다.
   _2600:1400:d:5a3::3bd4
-  그룹 내에 있는 여러 개의 0을 빈 콜론 블록으로 압축할 수 있다.
#### 커뮤니케이션 유형
-  IPv4와 IPv6 모두 다양한 주소 지정 유형을 지원하므로, 한 디바이스가 네트워크의 여러 디바이스와 동시에 통신할 수 있다. 
- IPv4는 다중 패킷 라우팅을 통한 일대일(유니캐스트), 일 대 전부(브로드캐스트) 및 일대다(멀티캐스트) 주소 지정을 지원한다.
-  IPv6에서는 멀티 패킷 라우팅을 통해 유니캐스트, 멀티캐스트 및 애니캐스트 주소 지정을 지원한다.
	-  애니캐스트 통신에서 데이터 패킷은 단일 발신자로부터 동일한 애니캐스트 주소를 공유하는 여러 수신자 중 가장 가까운 수신자로 전송된다.
		- ‘가장 가까운 거리’는 대상에 도달하기 위한 최단 경로 또는 최저 비용을 계산하는 라우팅 프로토콜에 의해 결정된다.
### IPv4와 IPv6의 비교

|             | **IPv4**                                             | **IPv6**                                                                              |
| ----------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 무엇인가요?      | 인터넷 프로토콜 버전 4                                        | 인터넷 프로토콜 버전 6                                                                         |
| 주소 크기       | 32비트 또는 232개의 IP 주소                                  | 128비트 또는 2128개의 IP 주소                                                                 |
| 명명 표준       | 숫자형 IP 주소. 마침표로 구분된 세 자리 숫자의 4개 묶음.<br><br>197.0.0.1 | 영숫자 주소. 콜론으로 구분된 4자리 16진수의 8개 묶음.<br><br>2600:1400:d:5a3::3bd4                        |
| 루프백 주소      | 127.0.0.1                                            | ::1                                                                                   |
| 주소 변환 필요 여부 | 예, Network Address Translation(NAT)을 통해 변환           | 아니요                                                                                   |
| 패킷 주소 지정    | 유니캐스트, 브로드캐스트, 멀티캐스트                                 | 유니캐스트, 멀티캐스트, 애니캐스트                                                                   |
| 주소 구성       | 수동 및 DHCP 구성                                         | Stateless Address Autoconfiguration(SLAAC)을 사용한 디바이스의 자동 구성. DHCPv6는 상태 저장 연결에서도 지원됨. |
| 헤더 크기       | 변수, 20바이트, 선택적 필드 및 플래그가 추가될 때 최대 60바이트까지 증가할 수 있음   | 고정, 40바이트. 개별 확장 헤더의 크기는 다를 수 있음.                                                     |
| 헤더 체크섬      | 예                                                    | 아니요                                                                                   |
| 추가 옵션       | 옵션 컨트롤에 대한 제한적 지원                                    | 라우팅, 프래그먼팅, 서비스 품질 등을 개선하기 위해 다양한 확장 헤더를 사용할 수 있음                                     |
| 개인 정보 보호 정책 | 주소의 마지막 8비트를 숨기는 IP 주소 마스킹                           | 임의의 임시 주소를 사용하는 IP 프라이버시 확장                                                           |
| 프래그먼테이션     | 라우터에서 처리                                             | 송신 측에서만 수행                                                                            |
| DNS 해결 방법   | A 레코드                                                | AAAA 레코드                                                                              |
| 라우팅 효율성     | 헤더에서 처리                                              | 라우팅 테이블에서 처리                                                                          |
> 네트워크 주소 변환 (NAT, Network Address Translation)
> -  IP 패킷의 TCP/UDP 포트 숫자와 소스 및 목적지의 IP 주소 등을 재기록하면서 라우터를 통해 네트워크 트래픽을 주고 받는 기술.
> -  NAT를 이용하는 이유는 대개 사설 네트워크에 속한 여러 개의 호스트가 하나의 공인 IP 주소를 사용하여 인터넷에 접속하기 위함.
> -  등록되지 않은 IP 주소를 사용하는 사설 IP 네트워크가 인터넷에 연결될 수 있도록 한다. 
> -  일반적으로 두 네트워크를 함께 연결하는 라우터에서 작동하며, 패킷이 다른 네트워크로 전달되기 전에 내부 네트워크의 비공개(전역적으로 고유하지 않음) 주소를 올바른 주소로 변환한다. 
> ![Network address translation between a private network and the Internet](NAT_Concept-en.svg "https://en.wikipedia.org/wiki/Network_address_translation")
> 
> Public IP (공인 IP)와 Private IP (사설 IP)  
> ![공인 IP 주소와 사설 IP 주소의 차이](asset-types-of-ip-addresses-static-vs-dynamic-ip-1-ko.svg "https://nordvpn.com/ko/blog/public-ip-and-private-ip/")  
>>  Public IP (공인 IP)
>>  -  인터넷 업체가 사용자에게 할당하며 공유기가 인터넷과 통신하도록 하는 역할을 하는 외부 IP 주소. 
>>  -  사용자의 전체 네트워크에 적용되기에 동일한 인터넷 연결을 사용하는 장치는 IP주소를 공유하게 된다. 
>>  -  인터넷 업체는 공인 IP 주소의 사용자가 누구인지 파악할 수 있기에 공인 IP 주소를 사용하는 경우 인터넷 활동이 추적되고 모니터링될 수 있다.   
>
>>  Private IP (사설 IP)  
>>  -  공유기가 노트북, 스마트 TV, 휴대폰 등 홈 네트워크에 연결된 장치에 할당한 내부 IP 주소를 의미한다. 
>>  -  로컬 네트워크에서 할당되며 다른 네트워크의 IP 주소와 중복될 수 있다. 
>> 	 -  각자의 내부 네트워크에서 사용되기에 다른 네트워크의 IP주소와 중복되더라도 문제가 없다. 
>> 	 -  대신 동일한 로컬 네트워크에 연결된 장치에는 같은 사설 IP 주소를 할당할 수 없다. 
>>  -  사설 IP 주소는 IANA가 확보한 사설 IP 주소 범위 내에서 할당되며 인터넷에 노출되지 않는다. 
>>  -  전 세계에는 수백만 개의 사설 네트워크가 존재하며 사설 네트워크에 연결된 장치에는 다음 사설 IP 대역 내의 IP 주소가 할당된다. 
>>  -  다음 사설 IP 대역 내의 IP 주소가 할당된다.  
>> 	 - 클래스 A : 10.0.0.0~10.255.255.255
>> 	 - 클래스 B : 172.16.0.0~172.31.255.255
>> 	 - 클래스 C : 192.168.0.0~192.168.255.255
>
>Loopback Address (루프백 주소)
>- 컴퓨터가 자신을 가리키는 데 사용하는 특수 목적의 IP 주소.  
>- 용도
>	- 로컬 시스템 테스트.
>	- 네트워크 소프트웨어 디버깅
>	- 로컬 서버와의 통신.
>- 특징
>	- 외부로 라우팅되지 않음.
>	- 물리적 네트워크 인터페이스가 필요 없음. 
>	- 항상 사용 가능하며 항상 작동 상태임. 
>- 동작 원리 : Loopback Address (루프백 주소)로 보내진 데이터는 실제로 네트워크로 나가지 않고, 네트워크 스택 내에서 즉시 **Loopback(루프백)** 되어 다시 수신된다. 
>- 보안 : 외부에서 접근할 수 없어 상대적으로 안전함. 
>- 네트워크 구성 : 대부분의 운영 체제에서 루프백 인터페이스는 자동으로 구성되며, 별도의 설정이 필요없다. 
>- 루프백 범위 : IPv4에서 전체 127.0.0.0/8 네트워크가 루프백을 위해 예약되어 있지만, 일반적으로 127.0.0.1만 사용된다. 
> 
Fragmentation (프래그먼테이션)
> -  네트워크에서 큰 데이터 패킷을 더 작은 조각으로 나누는 프로세스 . 
> -  IPv4와 IPv6의 Fragmentation (프래그먼테이션) 차이점
> 	- **IPv4** : 패킷이 MTU(Maximum Transmission Unit)보다 클 경우, 라우터는 패킷을 나누어 전송한다. 
> 		- **Identification, Flags, Fragment Offset** 필드를 사용하여 단편화를 처리한다. 
> 	- **IPv6** : 송신 측에서만 단편화를 수행한다. 라우터는 단편화를 하지 않으며, 패킷이 MTU보다 크면 드롭하고 ICMPv6 "Packet Too Big" 메시지를 보낸다. 
> 		- IPv6에서는 확장 헤더를 사용하여 단편화를 처리한다. 

### IPv4와 IPv6의 header  비교
-  IPv4와 IPv6의 패킷은 서로 다르게 구성되어 있다. 
  ![IPv4 Header vs IPv6 Header](comparing-ipv4-and-ipv6-headers.png "https://www.networkacademy.io/ccna/ipv6/ipv4-vs-ipv6")  

| 필드                  | IPv4                | IPv6                | 설명                         | Bit                     |
| ------------------- | ------------------- | ------------------- | -------------------------- | ----------------------- |
| Version             | Version             | Version             | IP 프로토콜 버전                 | 4                       |
| IHL                 | IHL                 | -                   | 헤더 길이 (IPv6에서는 고정 길이로 제거됨) | 4                       |
| Type of Service     | Type of Service     | Traffic Class       | 패킷 우선순위 또는 서비스 유형 지정 지정    | 8                       |
| Total Length        | Total Length        | Payload Length      | 데이터 페이로드 길이                | 16                      |
| Identification      | Identification      | -                   | 단편화 관련 필드 (IPv6에서는 제거됨)    | 16                      |
| Flags               | Flags               | -                   | 단편화 관련 필드 (IPv6에서는 제거됨)    | 3                       |
| Fragment Offset     | Fragment Offset     | -                   | 단편화 관련 필드 (IPv6에서는 제거됨)    | 13                      |
| TTL                 | TTL                 | Hop Limit           | 패킷의 최대 홉 수                 | 8                       |
| Protocol            | Protocol            | Next Header         | 상위 계층 프로토콜 식별              | 8                       |
| Header Checksum     | Header Checksum     | -                   | 오류 검출 (IPv6에서는 제거됨)        | 16                      |
| Source Address      | Source Address      | Source Address      | 송신자의 IP 주소                 | IPv4 : 32<br>IPv6 : 128 |
| Destination Address | Destination Address | Destination Address | 수신자의 IP 주소                 | IPv4 : 32<br>IPv6 : 128 |
| Options             | Options             | -                   | 추가 옵션 (IPv6에서는 확장 헤더로 대체됨) |                         |
| Padding             | Padding             | -                   | 패딩 (IPv6에서는 제거됨)           |                         |
| Flow Label          | -                   | Flow Label          | 플로우 식별을 위한 레이블             | 20                      |

## Reference
### IP Address
[IP 주소](https://ko.wikipedia.org/wiki/IP_%EC%A3%BC%EC%86%8C)
[IP 주소의 역사와 서브넷 마스크의 탄생](https://yozm.wishket.com/magazine/detail/2108/)  
[네트워크 정복하기 13. IP 주소 의미와 체계 및 서브넷 마스크](https://sangbeomkim.tistory.com/121)
[IP Addresses (Version 4)](https://thecybersecurityman.com/2017/12/29/ip-addresses-version-4/)
### IPv4와 IPv6
[IPv4 vs IPv6 - Understanding the differences](https://www.networkacademy.io/ccna/ipv6/ipv4-vs-ipv6)
[IPv4와 IPv6의 차이점은 무엇입니까?](https://nordvpn.com/ko/blog/ipv6-ipv4/)
[IPv4와 IPv6의 차이점은 무엇인가요?](https://aws.amazon.com/ko/compare/the-difference-between-ipv4-and-ipv6/)
[IPv6주소란?](https://xn--3e0bx5euxnjje69i70af08bea817g.xn--3e0b707e/jsp/resources/ipv6Info.jsp)
### CIDR
[[네트워크] CIDR이란?(사이더 란?)](https://kim-dragon.tistory.com/9)  
[[네트워크] CIDR 범위 쉽게 계산하는 방법](https://kim-dragon.tistory.com/154)
[CIDR](https://ko.wikipedia.org/wiki/CIDR)
### NAT
[네트워크 주소 변환](https://ko.wikipedia.org/wiki/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC_%EC%A3%BC%EC%86%8C_%EB%B3%80%ED%99%98)
[Network address translation](https://en.wikipedia.org/wiki/Network_address_translation)
[NAT(Network Address Tranlation) FAQ 검토](https://www.cisco.com/c/ko_kr/support/docs/ip/network-address-translation-nat/26704-nat-faq-00.html#toc-hId--1420991877)
[NAT(Network Address Translation) 이란 무엇인가?](https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-NAT-%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)
### Public IP & Private IP
[IP 기초 (사설IP / 공인IP / NAT) 개념 정말 쉽게 정리](https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-IP-%EA%B8%B0%EC%B4%88-%EC%82%AC%EC%84%A4IP-%EA%B3%B5%EC%9D%B8IP-NAT-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A7%90-%EC%89%BD%EA%B2%8C-%EC%A0%95%EB%A6%AC)
[공인 IP, 사설 IP… 다양한 IP 유형의 차이는?](https://nordvpn.com/ko/blog/public-ip-and-private-ip/)
### Network Class
[[Network] IP주소 클래스(A,B,C class)란?](https://limkydev.tistory.com/168)  
[네트워크 클래스](https://ko.wikipedia.org/wiki/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC_%ED%81%B4%EB%9E%98%EC%8A%A4)  
[[Network]네트워크 클래스(Network Class)](https://hyoje420.tistory.com/31)  
[[Network] 네트워크 클래스, Network Class 에 대하여](https://wonit.tistory.com/554)
[LFCA: Learn Classes of Network IP Addressing Range – Part 11](https://www.tecmint.com/network-ip-addressing-range/)
### Subnet
[서브넷이란? | 서브넷의 작동 방식](https://www.cloudflare.com/ko-kr/learning/network-layer/what-is-a-subnet/)
[\[Subnet mask\] 서브넷, 서브넷 마스크, 서브넷팅에 대해서!](https://louis-j.tistory.com/entry/Subnet-mask-%EC%84%9C%EB%B8%8C%EB%84%B7-%EC%84%9C%EB%B8%8C%EB%84%B7%EB%A7%88%EC%8A%A4%ED%81%AC-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C#google_vignette)
[The Subnet Mask](https://www.networkacademy.io/ccna/ip-subnetting/the-subnet-mask
[다시 돌아보는 기본 : 서브넷의 이해](https://www.itworld.co.kr/news/191458)  
[[Network]서브넷(Subnet)](https://hyoje420.tistory.com/32)
[\[네트워크\] 서브넷,  서브넷마스크, 서브넷팅이란?](https://code-lab1.tistory.com/34)
[서브넷이란? | 서브넷의 작동 방식](https://www.cloudflare.com/ko-kr/learning/network-layer/what-is-a-subnet/)

