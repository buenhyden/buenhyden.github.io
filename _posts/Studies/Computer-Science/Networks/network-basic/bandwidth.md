---
title: Bandwidth
linkTitle: Bandwidth
description: 특정한 기능을 수행할 수 있는 주파수의 범위
summary: 특정한 기능을 수행할 수 있는 주파수의 범위
date: 2023-11-25T12:37:01.427Z
lastmod: 2024-01-03T22:45:24
series:
  - Network Basic
categories:
  - Network
  - Network Basic
tags:
  - Bandwidth
authors:
  - Hyunyoun Jo
draft: false
featured: true
---

## 대역폭의 종류

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
    ![Compare the differences between network bandwidth vs. throughput.](media/images/network_bandwidth_vs_throughput-f.png "https://www.techtarget.com/searchnetworking/feature/Network-bandwidth-vs-throughput-Whats-the-difference")

#### Bandwidth(대역폭)와 Throughput(네트워크 출력 또는 처리율)은 동일한가?

Bandwidth는 일정 시간 내에 처리 가능한 최대의 데이터 처리 능력이고 **Throughtput(네트워크 출력 또는 처리율)**은 네트워크에서 얼마나 많은 데이터가 단위 시간 내에 목적지에 전달될 수 있는지에 대한 지표  
**Throughtput(네트워크 출력 또는 처리율)**은 시간에 따라 달라지는 가변적인 값.
IT 시스템의 네트워크 레이어에서 출력이 일정하지 않다는 것은 문제가 발생했을 가능성이 높다!

- 네트워크 구간 중간에 패킷 손실이 발생
- 출력을 담당하는 네트워크 컴포넌트에서 문제가 발생
  : 네트워크 출력을 지속적으로 모니터링하는 것이 필요.
  - 실시간 모니터링하고 대시보드 그래프를 통해 모니터링하면서 Threshold 값의 범위를 넘어가는 경우 알람을 발생하는 방식을 많이 사용

![Bandwidth vs. Throughput](media/images/throughput-bandwidth.png "https://obkio.com/blog/network-speed-bandwidth-throughput/")

#### 지연 (Delay, Latency)

- 지연 시간은 발신지로부터 첫 번째 비트가 목적지를 향해 떠난 후에 온전히 전체 메세지가 목적지에 모두 도착할 때까지 소요되는 시간
- 지연은 전파시간, 전송시간, 큐시간, 처리시간의 합
  `Latency = propagation time + transsmission time + queuing time + processing delay`
  - propagation : 전파 시간
    - 발신지로부터 목적지까지 이동하는 시간
    - 전파시간 = 거리 / 전파 속도
  - transsmission : 전송 시간
    - 첫 번째 비트와 마지막 비트의 도착 시간 차이
    - 전송시간 = 메세지 길이 / 대역폭
  - queuing time : 큐 시간
    - 메세지를 처리하기 전까지 메세지를 대기시키는 시간
    - 네트워크에 부하에 따라 좌우된다

#### IT 시스템 설계 시 용량 산정을 할 때 고려해야 할 대표적인 지표

- IT 시스템을 통해 동시에 얼마나 많은 사용자를 처리할 수 있을지 - **동시 사용자 수**
- IT 시스템이 사용자 1명당 보통 얼마의 리소스를 소비하는지 - **처리량**
- IT 시스템이 사용자에게 얼마나 빠른 시간 내에 응답해야 하는지 - **성능**
- IT 시스템이 단위 시간 내에 얼마나 많은 작업을 해야 하는지 - **TPS(Transaction Per Second)**
- 기타 등등 (기능성, 신뢰성, 효율성 ...)

## Reference

[네트워크 - 대역폭, bandwidth란 무엇인가](https://m.blog.naver.com/on21life/221340548735)  
[대역폭, bandwidth란 ?](https://velog.io/@ragnarok_code/%EB%8C%80%EC%97%AD%ED%8F%AD-bandwidth%EB%9E%80)  
[전송속도와 대역폭 이란 무엇인가?](https://trts1004.tistory.com/12109599)  
[[데이터통신] 네트워크 성능 - 대역폭(Bandwidth), 처리율](https://uzun.dev/118)  
[BW, B/W Bandwidth, Spectral Bandwdith 대역폭, 주파수 대역폭, 파장 대역폭, 스펙트럼 폭, 스펙트럼 대역폭](http://www.ktword.co.kr/test/view/view.php?m_temp1=1157)
