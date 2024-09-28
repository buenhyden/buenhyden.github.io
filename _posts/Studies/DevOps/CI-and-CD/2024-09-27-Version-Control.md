---
title: Version Control
date: 2024-09-27 15:45:00
categories:
  - DevOps
  - CI/CD
tags:
  - DevOps
  - CI/CD
  - Version-Control
description: 동일한 정보에 대한 여러 버전을 관리하는 것
comments: "true"
toc: "true"
media_subpath: /assets/img/
---

## 로컬 버전관리(Local VCS)

데이터베이스를 사용해서 파일의 변경 정보를 관리하는 시스템
RCS(Revision Control System)은 파일에서 변경되는 부분(Patch)만 기억해 용량 문제를 해결
RCS에서 버전 변경은 해당 버전까지의 일련의 변화들(Patch Set)을 적용/해제하는 식으로 동작
![Distributed version control](local-vcs.png "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control")

## 중앙집중식 버전관리(CVCS)

중앙 서버가 별도로 파일들과 이들의 변경 이력을 관리하고 클라이언트는 서버에 접속해서 특정 버전의 스냅샷(snapshot)을 받아서 사용하는 형태로 동작.
클라이언트가 서버로부터 특정 버전의 스냅샷을 받아 사용하는 것을 체크아웃(Checkout)이라 한다.

- 단점
  - 모든 버전 관리 관련 동작은 서버에서 처리되어야 하므로 서버의 부하가 크다
  - 서버가 죽거나 장애가 발생하면 버전 관리가 이루어지지 않는다
  - 오프라인 상태에서는 버전 관리 시스템을 사용할 수 없다
  - 모든 버전 관리 관련 동작은 적어도 한 번 서버를 경유해야 하므로 속도가 느리다.
  - 서버에서 데이터가 망가지거나 삭제되면 복구하기 어렵다
    ![Distributed version control](cvcs.png "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control")

## 분산 버전관리 시스템(DVCS)

파일의 마지막 스냅샷을 Checkout 하지 않고 저장소를 히스토리와 더불어 전부 복제
서버에 문제가 발생하면 이 복제물로 다시 작업을 시작할 수 있고 클라이언트 중에서 아무거나 골라도 서버를 복원할 수 있음
또한 많은 수의 리모트 저장소를 가질 수 있어 다양한 방법으로 협업이 가능

- 단점
  - 중앙 집중식 버전 관리 시스템에 비해 복잡하다
  - 동기화 문제가 있다
    ![Distributed version control](distributed-version-control.png "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control")

## Reference

[Reinventing the Wheel](https://heekangpark.github.io/git/vcs)  
[yoongrammer](https://yoongrammer.tistory.com/17)
