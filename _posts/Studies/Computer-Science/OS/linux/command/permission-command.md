---
title: Linux Permission Command
date: 2023-10-29T03:38:00+09:00
description: Linux 권한 설정 Command
summary: Linux 권한 설정 Command
linkTitle: Linux Permission Command
series:
  - Operating System
categories:
  - Operating System
  - Linux
tags:
  - Command
authors:
  - Hyunyoun Jo
lastmod: 2024-01-03T22:50:47
draft: false
featured: true
---

![Linux Permissions](media/images/linux-permissions.jpg "https://medium.com/@usamashafique00786/day-4-task-linux-permissions-and-access-control-lists-ef59cebf9324")

- File type : 파일 유형
  |type|Description|
  |----|-----------|
  |-|normal file|
  |d|directory|
  |l|link|
  |p|named pipe|
  |s|socket|
  |c|character device|
  |b|block device|

- Permissions : 각 파일에 접근해서 읽거나 쓰거나 실행할 권리를 갖는 소유자 / 그룹 / 다른 사용자로 나눠서 관리
  ![Linux Permission](media/images/Files-permissions-and-ownership-basics-in-Linux.png "https://pamirwebhost.com/check-linux-file-permissions-with-ls/")

  - Permission은 3개로 나눠서 관리
    | |Description|
    |---------|-----------|
    |User|파일을 만든 소유주|
    |Group|파일을 만든 소유주가 속한 그룹|
    |Other|기타 사용자|

  - Permission은 4가지에 대하여 구분\
    |Permission| | |
    |:----------:|----|-------|
    | |파일|디렉토리|
    |r|파일에 대한 읽기 권한.</br>열기, 읽기 허용|디렉토리 내의 파일을 나열할 수 있게 허용|
    |w|파일에 대한 쓰기 권한.</br>쓰기, 잘라내기 허용.</br>이름 변경이나 파일 삭제 허용되지 않음. 파일 삭제나 파일 이름 변경 디렉토리 속성에 의해 결정|디렉토리 내의 파일들을 생성, 삭제, 이름 변경이 가능하도록 허용|
    |x|파일에 대한 실행 권한.</br>파일이 프로그램으로 처리되고 파일이 실행되도록 허용.</br>스크립트 언어에서 작성된 프로그램 파일들은 읽기 가능으로 설정 되어 있어야만 실행 가능|디렉토리 내에서 탐색을 위해 이동할 수 있도록 허용(디렉토리에 들어올 수 있도록 허용)
    |-|r,w,x에 대한 권한이 없음을 표시|r,w,x에 대한 권한이 없음을 표시|

  - Permission\
    ![Linux File permissions](media/images/linux-file-permissions.jpg "https://medium.com/@gumbershruti1119/day-6-file-permissions-and-access-control-lists-2126f994a5b8")

- number of hard links

- Ownership: 각 파일이나 디렉토리를 소유할 사용자나 그룹을 지정

  - user(owner) name
  - group name

- size

- date/time last modified

- filename

- Example

```bash
drwxr-x--- 28 hyden hyden     4096 Oct 29 12:34 ./
-rw-rw-r--  1 hyden hyden      435 Aug  3 17:05 default-user-config.yaml
```

## Reference

[islove8587](https://m.blog.naver.com/islove8587/221945262618)  
[hack-cracker](https://hack-cracker.tistory.com/32)  
[alex xu](https://twitter.com/alexxubyte/status/1532026886359879681)  
[[여기보기] 파일과 디렉토리에는 정확한 소유권과 적당한 권한을 부여하라](https://yozm.wishket.com/magazine/detail/1668/)
