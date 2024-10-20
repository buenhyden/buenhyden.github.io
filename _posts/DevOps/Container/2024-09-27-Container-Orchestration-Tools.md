---
type: posts
title: Container Orchestration Tools
date: 2024-09-27 15:43:00
categories:
  - DevOps
  - Container-Orchestration
tags:
  - Container-Orchestration
  - DevOps
  - Container
description: Container Orchestration(CO)을 위해 많이 사용되는 도구와 각 도구별 특성을 정리
comments: "true"
toc: "true"
media_subpath: /assets/img/
---

![CO Tools](co-tools.webp "https://www.suse.com/c/rancher_blog/kubernetes-mesos-and-swarm-comparing-the-rancher-orchestration-engine-options/")

## 종류

### Kubernetes

- 구글에서 개발
- 기능이 가장 풍부함
- 널리 사용되는 CO 프레임웍
- 베어 메탈, VM 환경, 퍼블릿 클라우드 등의 다양한 환경에서 작동하도록 설계
- 컨테이너의 롤링 업그레이드 지원
- 강력한 컨테이너 서비스 배포 및 관리 기능
- 컨테이너를 쉽고 빠르게 배포/확장/관리하고 이를 자동화 해주는 가장 널리 사용되는 오픈소스 플랫폼

#### 특성

- yaml을 이용하여 클러스터의 모든 서비스를 정의
- POD 스케줄링을 통해 복잡한 애플리케이션의 배포 관리 가능
- 하나의 마스터 서버와 노드가 필요
- Discovery layer, Master Layer의 각 레이어에서 최소한 3개씩 필요

#### 특징

- Planet Scale (수 많은 컨테이너를 구동할 수 있는 확장성)
- Never Outgrow (다양한 요구 사항을 만족시킬 수 있는 유연함)
- Run Anywhere (온프레미스, 퍼블릭 클라우드, 하이브리드 환경 어디서나 동작)

### Docker Swarm

- Docker 호스트 클러스터를 조정하기 가장 쉬운 오케스트레이션 프레임 워크
- 여러 개의 Docker 호스트를 함께 클러스터링하여 단일 가상 Docker 호스트를 생성
- 호스트 OS에 Agent만 설치하면 간단하게 작동하고 설정이 쉬움
- Docker 명령어와 Compose를 그대로 사용가능

#### 특성

- 도커 기반에서 컨테이너 클러스터를 만들고 관리하는 툴
- 쿠버네티스에 비해 설정이 쉽다는 장점을 가짐
- manager 노드와 worker노드를 통해 컨테이너를 관리

#### 구성

- manager node (클러스터의 상태 유지 및 스케줄링 \<worker 노드에 컨테이너 배포>)
- worker node (애플리케이션이 실행되는 노드)

### Apache Mesos

- 수만 대의 물리적 시스템으로 확장할 수 있도록 설계된 오케스트레이션 프레임워크
- 하둡, MPI, Hypertable, Spark 같은 응용프로그램을 동적 클러스터 환경에서 리소스 공유와 분리를 통해 최적화 가능
- Docker 컨테이너를 적극적으로 지원
- 다른 서비스와 함께 응용프로그램을 배치하기에 적합
- 대규모 클러스터링을 지원하고 Hadoop, Kafka 및 Spark와 같은 다른 서비스와 함께 응용 프로그램을 배치해야 하는 환경에 특히 적합

#### 특성

- Json 기반으로 작동하는 컨테이너 오케스트레이션
- 하나의 마스터, 하나의 슬레이브 구조
- 최소 3개의 마스터와 여러 개의 슬레이브가 필요
- 대~초대형 스케일 클러스터에 적합한 도구

## Reference
