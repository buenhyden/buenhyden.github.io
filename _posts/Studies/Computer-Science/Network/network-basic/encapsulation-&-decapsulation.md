---
title: Encapsulation & Decapsulation
linkTitle: Encapsulation & Decapsulation
description: 데이터에 헤더(Header)를 붙이고 아래 계층에 보내는 것을 캡슐화(Encapsulation), 데이터에 헤더를 제거하고 위 계층에 보내는 것을 역캡슐화(Decapsulation)
summary: 데이터에 헤더(Header)를 붙이고 아래 계층에 보내는 것을 캡슐화(Encapsulation), 데이터에 헤더를 제거하고 위 계층에 보내는 것을 역캡슐화(Decapsulation)
date: 2023-12-10T15:28:58.133Z
draft: false
series:
  - Network Basic
categories:
  - Network
  - Network Basic
tags:
  - Encapsulation
  - Decapsulation
authors:
  - Hyunyoun Jo
lastmod: 2024-01-03T22:45:35
featured: true
---

## 데이터 캡슐화(Encapsulation)와 역캡슐화(Decapsulation)

- 데이터 전송시 캡슐화가 이뤄지고 수신시 역캡슐화(Decapsulation)가 이뤄진다.
- 데이터에 헤더(Header)를 붙이고 아래 계층에 보내는 것을 캡슐화(Encapsulation), 데이터에 헤더를 제거하고 위 계층에 보내는 것을 역캡슐화(Decapsulation)라고 한다.
  ![OSI 7계층 데이터 캡슐](media/images/images_poiuyy0420_post_ad150139-1620-40c0-a12a-9b245a169dd1_iso7.jpg "https://velog.io/@poiuyy0420/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-OSI-7-%EA%B3%84%EC%B8%B5-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC")  
  AH : Application Header  
  PH : Presentation Header  
  SH : Session Header  
  TH : Transport Header  
  NH : Network Header / NT : Network Tail  
  DH : Data Link Header / DT : Data Link Tail

## Reference

[[데이터통신 - 3] 캡슐화와 역캡슐화](https://gunjoon.tistory.com/15)  
[TIL - 네트워크 캡슐화 & 역캡슐화 (encapsulation & decapsulation)](https://velog.io/@qmasem/TIL-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%BA%A1%EC%8A%90%ED%99%94-%EC%97%AD%EC%BA%A1%EC%8A%90%ED%99%94-encapsulation-decapsulation)
