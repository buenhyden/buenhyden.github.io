---
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
  - DNS
  - Domain-Name-System
  - Domain
  - 도메인
  - TLD
  - Network-Class
  - CIDR
  - MTU
description: 인터넷에 연결하는 장치나 도메인에 할당된 고유 식별자로 컴퓨터 네트워크에서 장치들이 서로를 인식하고 통신을 하기 위해서 사용하는 특수한 번호
comments: "true"
toc: "true"
media_subpath: /assets/img/
---
# IP Address(IP 주소)

- IP Address는 인터넷에 연결하는 장치나 도메인에 할당된 고유 식별자로 컴퓨터 네트워크에서 장치들이 서로를 인식하고 통신을 하기 위해서 사용하는 특수한 번호.
- 네트워크에 연결된 장치가 라우터이든, 일반 서버이든, 모든 기계는 이 특수한 번호를 가지고 있어야 한다.
- 이 번호를 이용하여 발신자를 대신하여 메시지가 전송되고 수신자를 향하여 예정된 목적지로 전달된다.
- 각 IP 패킷에는 패킷을 보내는 장치 또는 도메인의 IP 주소와 대상 수신자의 IP 주소가 모두 포함된다.
- 각 IP Address는 '192.168.1.1'과 같은 일련의 숫자로 사람이 읽을 수 있는 도메인 이름을 IP 주소로 변환하는 DNS를 통해 사용자는 이 복잡한 일련의 숫자를 기억하지 않고도 웹 사이트에 액세스할 수 있다.
![IP 주소란 무엇이고 IP 주소는 왜 중요할까요?](ddos-dns.svg "https://www.cloudflare.com/ko-kr/learning/dns/glossary/what-is-my-ip-address/")  

## Network Class

- IPv4 에서 첫 번째 구조 변화를 나타내는 기법

## DNS(Domain Name System)

- **인터넷 전화전화부**로 비유되며 특정 컴퓨터(또는 네트워크로 연결된 임의의 장치)의 주소를 찾기 위해, 사람이 이해하기 쉬운 호스트 이름(예: <www.example.com)을>  실제 네트워크 상에서 사용하는 IP주소(예: 192.168.1.1)로 변환하고 해당 IP 주소로 접속하는 일련의 시스템을 DNS(Domain Name System)이라고 한다.
- DNS는 전세계적으로 약속된 규칙을 공유한다.
- 웹 브라우저는 DNS 확인이 "막후에서" 발생하며 최초의 사용자 요청 외에 사용자 컴퓨터와의 추가적인 대화는 필요하지 않다.

### DNS 서버 유형

- 웹페이지 로드와 관련된 4개의 DNS 서버
- DNS Recursive Resolver(DNS 리커서)
  - 웹브라우저 등의 애플리케이션을 통해 클라이언트 컴퓨터로부터 쿼리를 받도록 고안된 서버.
  - 인터넷 서비스 공급자(ISP), 대기업 또는 기타 타사 DNS 서비스 공급자가 관리한다.
  - 최종 사용자를 대신하여 도메인 이름을 IP 주소로 확인한다.
  - 특정기간(TTL(Time to Live)값으로 정의)동안 요청에 대한 응답을 캐시하여 향후 동일한 도메인에 대한 쿼리를 위해 시스템 효율성을 개선한다.
  - 클라이언트의 DNS 쿼리를 충족시키기 위해 추가 요청을 수행한다.
  - 응답이 캐시된 경우 사용자를 연결하고 요청을 완료할 수 있으나 그렇지 않으면 일련의 Authoritative DNS server를 쿼리하여 IP 주소를 찾고 사용자를 원하는 웹사이트로 연결한다.
- DNS Root Nameserver(루트 이름 서버)
  - 사람이 읽을 수 있는 호스트 이름을 IP 주소로 변환(확인)하는 첫번째 단계.
- DNS TLD Nameserver(TLD 이름 서버)
  - TLD(최상위 도메인) 서버는 특정 IP 주소 검색의 다음 단계이며 호스트 이름의 마지막 부분을 호스팅한다.
- Authoritative Nameserver(권한 있는 이름 서버)
  - 최종 이름 서버로 이름 서버 쿼리의 종착점이다.

 DNS  조회어떻게 작동하는가?

- 사용자가 어떤 웹페이지를 로드하려고 할 때에는 사용자가 웹브라우저에 입력한 내용(예: example.com)을 example.com 웹페이지를 찾는 데 필요한 네트워크 상의 IP 주소로 변환해야 한다.

 DNS 구성 요소

- 도메인 네임 스페이스 (Domain Name Space)
- 네임 서버 (Name Server) = 권한 있는 DNS 서버
- 리졸버(Resolver) = 권한 없는 DNS 서버
 DNS 동작 방식
 DNS 레코드 종류
- SOA(Start of Authority) : 권한 시작 지정하고, 권한이 있는 서버를 가리킴.
- A(Host Record) : FQDN과 32비트의 IPv4 주소를 연결
- AAAA(IPv6호스트) : FQDN과 128비트의 IPv6 주소를 연결
- CNAME(Alias Record) : 실제 도메인 이름과 연결괴는 가상 도메인 이름(별칭)
- MX(Mail Exchane Record) : 주어진 사서함에 도달할 수 있는 라우팅 정보 제공.
- SRV(Service Resources) : 비슷한 TCP/IP 서비스를 제공하는 다수의 서버 위치 정보를 제공.
- NS(Name Servers) : 도메인 서버 목록을 지정.

## TLD(Top-level Domain)
-  도메인 이름의 마지막 마침표 뒤에 오는 모든 것.
	- 도메인 이름 'google.com'에서 '.com'은 TLD
	- 
- DNS 조회 프로세스에서 중요한 역할을 한다.
	- 캐시되지 않은 모든 요청의 경우 사용자가 'google.com'와 같은 도메인 이름을 입력하면 DNS 확인자(DNS Recursive Resolver)는 브라우저 창에서 TLD 서버와 통신하여 검색을 시작한다. 이 경우 TLD는 '.com'이므로 확인자는 TLD DNS 서버에 접속한 다음 확인자에게 Google 원본 서버의 IP 주소를 제공한다.
	- 국제 인터넷 관리 기구(ICANN)는 인터넷에서 사용되는 모든 TLD에 대한 권한을 가지며 이러한 TLD의 책을 다양한 조직에 위임하나.
- 도메인 이름의 목적을 분류하고 전달하는 기능도 한다.  
	- **'.com'** 은 영리 사업체용
	- **'.gov'** 은 미국 정부 기관용
- TLD의 다른 유형
	- 일반 TLD(generic top-level domains, gTLD)
		- 일반 TLD(gTLD)에는 '.com', '.net', '.org' 등 웹에서 볼 수 있는 보다 일반적인 도메인 이름이 포함된다.
		- 국제 인터넷 주소 관리 기구(ICANN)는 새로운 gTLD의 생성을 엄격하게 제한했지만, 2010년에 이러한 제한이 완화됨.
		- '.top', '.xyz', '.loan' 등의 잘 알려지지 않은 수백 개의 gTLD가 있다.
	- 국가 코드 TLD(country-code top-level domains, ccTLD)
		- 국가 코드 TLD(ccTLD)는 국가, 주권 국가, 영토에서 사용하도록 지정되어 있다.
		- 예를 들어, '.uk'(영국), '.au'(호주), '.jp'(일본)이 있다.
		- ICANN에서 운영하는 인터넷 할당 번호 관리 기관(IANA)에서는 각 지역에서 ccTLD를 관리할 적절한 조직을 선택하는 업무를 담당
	- 국제화된 국가 코드 TLD(internationalized country code top-level domains, IDN ccTLD)
		- 라틴어가 아닌 문자 세트
		- 예를 들어, 아랍어 또는 중국어.
	- 스폰서가 없는 최상위 도메인
		- 글로벌 인터넷 커뮤니티를 위해 ICANN 프로세스에 의해 설정된 정책에 따라 직접 운영되는 도메인.
	- 후원 TLD(sponsored top-level domains, sTLD)
		- 전문, 민족, 지리적 커뮤니티를 나타낸다.
		- 각 후원 TLD(sTLD)에는 해당 커뮤니티를 대표하는 위임된 후원 기관이 있다.
		- 예를 들어, '.app'은 개발자 커뮤니티를 위한 TLD이며 Google의 후원을 받는다. 
		- .gov'는 미국 정부에서 사용하기 위한 것.
	- 인프라 TLD
		- 단일 TLD('.arpa')만 포함
		- 현대 인터넷을 개발하는데 도움을 준 미국 연구 기관인 DARPA의 이름을 딴 '.arpa'는 최초의 TLD였으며 현재는 리버스 DNS 조회 촉진과 같은 인프라용으로 지정되어 있다
	- 지정된 TLD
		- 일부 TLD는 지정 목록에 있으므로 영구적으로 사용할 수 없다.
		- 예를 들어, **'.localhost'** 는 로컬 컴퓨터 환경용으로 지정되어 있고 **'.example'** 은 예제 데모용으로 지정되어 있다.
## CIDR
- Classless Inter-Domain Routing 으로 클래스 없는 도메인간 라우팅 기법

## MTU
- Maximum Transmission Unit

## Reference

### IP Address
[IP 주소](https://ko.wikipedia.org/wiki/IP_%EC%A3%BC%EC%86%8C)
[IP 주소의 역사와 서브넷 마스크의 탄생](https://yozm.wishket.com/magazine/detail/2108/)  
### DNS
[도메인 네임 시스템](https://ko.wikipedia.org/wiki/%EB%8F%84%EB%A9%94%EC%9D%B8_%EB%84%A4%EC%9E%84_%EC%8B%9C%EC%8A%A4%ED%85%9C)  
[DNS란? (도메인 네임 시스템 개념부터 작동 방식까지)](https://hanamon.kr/dns%EB%9E%80-%EB%8F%84%EB%A9%94%EC%9D%B8-%EB%84%A4%EC%9E%84-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B0%9C%EB%85%90%EB%B6%80%ED%84%B0-%EC%9E%91%EB%8F%99-%EB%B0%A9%EC%8B%9D%EA%B9%8C%EC%A7%80/)  
[DNS(Domain Name System)란?](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=gaegurijump&logNo=110186376474)  
[DNS란 뭐고, 네임서버란 뭔지 개념정리](https://gentlysallim.com/dns%EB%9E%80-%EB%AD%90%EA%B3%A0-%EB%84%A4%EC%9E%84%EC%84%9C%EB%B2%84%EB%9E%80-%EB%AD%94%EC%A7%80-%EA%B0%9C%EB%85%90%EC%A0%95%EB%A6%AC/)  
[루트 네임 서버](https://ko.wikipedia.org/wiki/%EB%A3%A8%ED%8A%B8_%EB%84%A4%EC%9E%84_%EC%84%9C%EB%B2%84)
[개발자가 알아야할 DNS 동작](https://devocean.sk.com/search/techBoardDetail.do?ID=164603&boardType=)  
[도메인 이름 시스템(DNS)이란 무엇인가요?](https://www.ibm.com/kr-ko/topics/dns)
### TLD
[최상위 도메인 (top-level domain, TLD)](https://developer.mozilla.org/ko/docs/Glossary/TLD)
[최상위 도메인이란?](https://www.cloudflare.com/ko-kr/learning/dns/top-level-domain/)
### Network Class
[[Network] IP주소 클래스(A,B,C class)란?](https://limkydev.tistory.com/168)  
[네트워크 클래스](https://ko.wikipedia.org/wiki/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC_%ED%81%B4%EB%9E%98%EC%8A%A4)  
[[Network]네트워크 클래스(Network Class)](https://hyoje420.tistory.com/31)  
[[Network] 네트워크 클래스, Network Class 에 대하여](https://wonit.tistory.com/554)
### CIDR
[[네트워크] CIDR이란?(사이더 란?)](https://kim-dragon.tistory.com/9)  
[[네트워크] CIDR 범위 쉽게 계산하는 방법](https://kim-dragon.tistory.com/154)
