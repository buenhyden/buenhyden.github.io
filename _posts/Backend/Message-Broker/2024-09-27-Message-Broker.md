---
type: posts
title: Message Broker
date: 2024-09-27 14:58:00
categories:
  - Backend
  - Message-Broker
tags:
  - Backend
  - Message-Broker
description: 애플리케이션, 시스템 및 서비스가 서로 간에 통신하고 정보를 교환할 수 있도록 해주는 소프트웨어
comments: "true"
toc: "true"
media_subpath: /assets/img/
---

![Diagram Message Broker](diagram-message-broker.png "https://ko.wikipedia.org/wiki/%EB%A9%94%EC%8B%9C%EC%A7%80_%EB%B8%8C%EB%A1%9C%EC%BB%A4")

## 메시지 브로커란?

- 비동기 방식으로 메시지를 교환하여 분산된 시스템 혹은 애플리케이션 간의 통신을 돕는다.
  - 상이한 언어로 작성되거나 상이한 플랫폼에서 구현된 경우에도 서로 간에 직접 "대화"를 실시할 수 있다
  - 구성요소 간의 데이터의 플로우를 처리하는 표준화된 수단을 개발자에게 제공
    - 애플리케이션의 구성요소 간에 데이터의 플로우를 처리하는 표준화된 수단을 개발자에게 제공
    - 다수의 플랫폼에 구현된 애플리케이션의 내부적인 통신을 가능하게 하는 분산 통신 계층의 역할을 수행하게 됨
- 생산자와 소비자간 중개자 역할을 하여 두 시스템이 완전히 독립적으로 작동할 수 있도록 돕는다.
  - 다른 애플리케이션 간의 중개자 역할을 함으로써 수신자의 위치, 수신자가 활성인지 여부 또는 수신자의 수를 잘몰라도 송신자가 메시지를 발행할 수 있게 한다.
    - 시스템 내에서 프로세스와 서비스의 디커플링이 용이해질 수 있다
  - 메시징 미들웨어 또는 메시지 지향 미들웨어(MOM) 솔루션 내의 소프트웨어 모듈
- 컴포넌트간 느슨한 결합(Loose couping)을 돕는다
  - 확장성의 증대
  - 장애가 미치는 여파를 줄일 수 있음
- 메시지 큐, 토픽과 같은 데이터 구조를 통해 메시지를 임시로 저장해두었다가 적절한 수신자에게 보낸다.
  - 확실한 메시지 저장 및 전달을 보장해야 하는 메시지 브로커는 이용하는 애플리케이션에서 메시지를 처리할 수 있을 때까지 메시지를 저장하고 순서화하기 위해 메시지 큐라고 하는 하위 구조 또는 구성요소를 사용
  - 메시지 큐에서 메시지는 전송된 순서대로 저장되며, 수신이 확인될 때까지 큐에 남아 있음
  - 데이터의 유실을 방지하며, 공용 네트워크에서 흔하게 나타는 단속적인 연결 혹은 지연 문제가 발생해도 시스템이 계속해서 작동할 수 있게 함
  - 비동기 메시징은 메시지가 다른 메시지에 대해 올바른 순서로 단 한 번만 전달되도록 보장

## Reference

[Message Broker](https://www.ibm.com/kr-ko/topics/message-brokers)  
[제이크서 위키 블로그](https://jake-seo-dev.tistory.com/467)  
[Confluent Schema Registry 도입기!](https://techblog.yogiyo.co.kr/confluent-schema-registry-%EB%8F%84%EC%9E%85%EA%B8%B0-54d112b9b53f)  
[Open Source 기반 Messaging Platform - Apache Pulsar 소개](https://devocean.sk.com/blog/techBoardDetail.do?ID=164597&boardType=techBlog)  
[MQTT에 대한 세부 특징 이를 내장하는 DBMS에 대한 글](https://machbase.com/kr/home/blog/blog10/)
