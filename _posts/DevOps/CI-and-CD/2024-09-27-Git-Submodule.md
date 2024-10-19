---
type: posts
title: Git Submodule
date: 2024-09-27 15:45:00
categories:
  - DevOps
  - CI/CD
  - Git
tags:
  - DevOps
  - CI/CD
  - Git
description: Git 저장소 (메인 저장소) 안에 다른 Git 저장소 (서브 저장소 - 재사용 및 공유 가능한 공통 "모듈"들을 주로 의미) 를 디렉토리로 분리해 넣는 것
comments: "true"
toc: "true"
media_subpath: /assets/img/
---

프로젝트 수행중 다른 프로젝트를 함께 사용해야할 경우가 종종 있다. 함께 사용할 다른 프로젝트는 외부에서 개발한 라이브러리라던가 내부 여러 프로젝트에서 공통으로 사용할 라이브러리일 수 있다.
이런 상황에서 자주 생기는 잇슈는 두 프로젝트를 서로 별개로 다루면서도 그 중 하나를 다른 하나 안에서 사용할 수 있어야 한다는 것.

## Submodule이란?

Git 저장소 안에 다른 Git 저장소를 디렉토리로 분리해 넣는 것
다른 독립된 Git 저장소를 Clone해 내 Git 저장소 안에 포함할 수 있으며 각 저장소의 Commit은 독립적으로 관리

## Submodule 명령어

`git submodule <저장소의 URL> <추가하고자 하는 폴더>`

- 추가하고자 하는 폴더를 입력하지 않으면 저장소 URL의 repo name으로 지정된다.

## Reference

[Git Submodule](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%EC%84%9C%EB%B8%8C%EB%AA%A8%EB%93%88)  
[Git Submodule 사용하기](https://devocean.sk.com/search/techBoardDetail.do?ID=165172&boardType=)
