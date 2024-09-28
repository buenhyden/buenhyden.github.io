---
title: Linux Basic Command
date: 2023-10-29T03:38:00+09:00
description: Linux에서 자주 사용하는 명령어 모음
summary: Linux에서 자주 사용하는 명령어 모음
linkTitle: Linux Basic Command
series:
  - Operating System
categories:
  - Operating System
  - Linux
tags:
  - Command
lastmod: 2024-01-03T22:50:44
draft: false
featured: true
---

## Linux Command

|     | Command                | Description                              |
| --- | ---------------------- | ---------------------------------------- |
| 1   | pwd                    | 현재 위치 출력                           |
| 2   | ls                     | 현재 디렉터리 내의 파일과 디렉터리 출력  |
| 3   | cd                     | 디렉터리 이동                            |
| 4   | mkdir                  | 디렉터리 생성                            |
| 5   | cp                     | 파일 또는 디렉터리 복사                  |
| 6   | mv                     | 파일 또는 디렉터리 이동                  |
| 7   | rm                     | 파일 또는 디렉터리 삭제                  |
| 8   | cat                    | 파일 내용을 확인                         |
| 9   | touch                  | 빈 파일을 생성                           |
| 10  | echo                   | 문자열 화면에 표시                       |
| 11  | ip addr/ifconfig       | IP 정보 확인                             |
| 12  | ss                     | 네트워크 상태 확인                       |
| 13  | nc                     | 서버의 포트 확인                         |
| 14  | which, whereis, locate | 명령어 위치 확인                         |
| 15  | tail                   | 파일의 마지막 부분 확인하기              |
| 16  | find                   | 파일이나 디렉터리 찾기                   |
| 17  | ps                     | 현재 실행 중인 프로세스 목록과 상태 확인 |
| 18  | grep                   | 주어진 입력값에서 패턴에 맞는 값 출력    |
| 19  | kill                   | 프로세스 종료                            |
| 20  | alias                  | 명령어 별칭 만들기                       |
| 21  | vi / vim               | 편집기                                   |

### pwd

- work directory의 약자로 작업 중인 디렉터리를 보여줌

```bash
$ pwd
/Users/hyden
```

### ls

- list segments의 약자로 현재 디렉터리의 파일과 디렉터리를 보여준다.

- 보통 단독으로 잘 사용하지 않고 a,l 등의 옵션과 함께 사용

  | Option | Description                                                                                  |
  | ------ | -------------------------------------------------------------------------------------------- |
  | ls -l  | 파일들의 상세 정보를 보여줌                                                                  |
  | ls -a  | 숨김 파일 표시                                                                               |
  | ls -t  | 최신 파일부터 표시                                                                           |
  | ls -rt | 오래된 파일부터 표시                                                                         |
  | ls -F  | 파일을 표시할 때 파일의 타입을 나타내는 문자열을 표시(/ 디렉터리, \* 실행파일, @심볼릭 링크) |
  | ls -R  | 하위 디렉터리의 내용까지 표시                                                                |

- 보통은 위 옵셥들을 조합해 ls -al, ls -alt, ls -altF 등으로 사용

```bash
$ ls -altF
total 95340
drwxr-x--- 28 hyden hyden     4096 Oct 29 12:34 ./
-rw-------  1 hyden hyden   326035 Oct 29 12:34 .zsh_history
drwx------  8 hyden hyden     4096 Oct 29 12:34 .cache/
-rw-------  1 hyden hyden       33 Oct 27 16:40 .lesshst
-rw-------  1 hyden hyden    25052 Oct 27 16:39 .bash_history
-rw-------  1 hyden hyden    38160 Oct 27 16:32 .viminfo
drwx------  6 hyden hyden     4096 Oct 27 15:50 .config/
drwx------  2 hyden hyden     4096 Oct 27 15:36 .ssh/
-rw-rw-r--  1 hyden hyden      287 Oct 27 13:34 .wget-hsts
-r--r--r--  1 hyden hyden   117120 Oct 27 12:31 .zcompdump-devserver-5.8.1.zwc
-rw-rw-r--  1 hyden hyden    50720 Oct 27 12:31 .zcompdump-devserver-5.8.1
-rw-rw-r--  1 hyden hyden    49203 Oct 27 12:31 .zcompdump
drwxr-x---  6 hyden hyden     4096 Oct 26 16:20 istio-1.18.2/
drwxr-xr-x 12 hyden hyden     4096 Oct 26 14:30 .oh-my-zsh/
-rw-r--r--  1 hyden hyden     4789 Oct 26 14:30 .zshrc
drwxr-xr-x  9 hyden hyden     4096 Oct 23 13:01 .minikube/
-rw-r--r--  1 hyden hyden     3919 Oct 20 17:47 .bashrc
-rw-------  1 hyden hyden     2313 Oct  5 12:49 kubeconfig.yaml
drwxrwxr-x  2 hyden hyden     4096 Sep 19 12:52 lang_test/
drwxrwxr-x  2 hyden hyden     4096 Sep 18 20:27 .ncloud/
drwxr-xr-x  5 hyden hyden     4096 Sep 11 19:06 pybind11/
drwxrwxr-x  2 hyden hyden     4096 Sep  8 16:25 data/
-rw-------  1 hyden hyden      151 Sep  8 15:59 .python_history
-rw-rw-r--  1 hyden hyden  1452216 Sep  7 18:59 libboost_regex.so.1.58.0
drwxrwxr-x  2 hyden hyden     4096 Sep  6 14:35 test/
drwxrwxr-x  4 hyden hyden     4096 Sep  6 14:28 ffmpeg/
drwxrwxr-x  2 hyden hyden     4096 Aug 30 16:00 dockerbuild/
drwxr-xr-x  8 root  root      4096 Aug 30 10:50 ../
-rw-rw-r--  1 hyden hyden      435 Aug  3 17:05 default-user-config.yaml
drwxr-x---  3 hyden hyden     4096 Aug  3 15:30 .kube/
drwxrwxr-x  5 hyden hyden     4096 Aug  3 14:47 manage_kubernetes/
-rw-rw-r--  1 hyden hyden       84 Aug  2 18:54 .bash_profile
-rw-rw-r--  1 hyden hyden      508 Aug  2 18:53 ncp-iam-authenticator.sha256
-rwxrwxr-x  1 hyden hyden 11665408 Aug  2 18:53 ncp-iam-authenticator*
-rwx------  1 hyden hyden    11345 Aug  2 10:13 get_helm.sh*
```

- 심볼릭 링크(symbolic link) : 원본 파일을 가리키도록 링크만 연결. 윈도우의 바로가기 링크와 같은 개념

### cd

- change directory의 약자로 디렉터리 이동시 사용하는 명령어
  |Option|Description|
  |------|-----------|
  |cd ~|홈 디렉터리로 이동|
  |cd ..|상위 디렉터리로 이동. cd ../../ 같은 식으로 여러 단계를 한 번에 이동 가능|
  |cd /dir|절대 경로를 지정해 이동 가능|
  |cd -|바로 전의 디렉터리로 이동|

### mkdir

- make directory의 약자로 디렉터리를 만들 때 사용

```bash
# <이름>의 디렉터리를 현재 디렉터리에 만든다
$ mkdir <이름>
```

- 절대 경로를 지정하여 만들 수도 있다.

```bash
# <이름>의 디렉터리를 절대 경로의 디렉터리에 만든다
$ mkdir /home/hyden/<이름>
```

- -p 옵션으로 하위 디렉터리까지 한 번에 생성할 수 있다

```bash
mkdir -p <디렉터리명>/<하위 디렉터리명>
```

### cp

- copy의 약자로 파일 또는 디렉터리를 복사할 때 사용

```bash
# source를 target으로 복사
$ cp source target

# target 파일의 이미 있는 경우 덮어쓰기
$ cp -f source target

# 디렉터리를 복사할 때 사용. 하위 디렉터리도 모두 복사하기
$ cp -R sourceDir targetDir
```

### mv

- move의 약자로 파일 또는 디렉터리의 위치를 옮길 때 사용. 혹은 이름을 변경할 때도 사용

```bash
# afile 이름을 bfile로 변경
$ mv afile bfile

# afile을 상위 디렉터리로 옮김
$ mv afile ../

# afile을 /opt 이하 디렉터리로 옮김
$ mv afile /opt/
```

### rm

- remove의 약자로 파일 또는 디렉터리를 삭제할 때 사용

```bash
# afile을 삭제
$ rm afile

# 디렉터리 adir을 삭제. 삭제 시 확인을 함
$ rm -r adir

# 디렉터리 adir을 삭제. 삭제 시 확인 안 함
$ rm -rf adir

# txt로 끝나는 모든 파일을 삭제할지 물어보면서 삭제
$ rm -i *.txt
```

### cat

- catenate의 약자로 파일의 내용을 확인할 때 사용.

```bash
# test.txt 파일의 내용을 확인
$ cat test.txt
```

### touch

- touch는 빈 파일을 생성. 혹은 파일의 날짜와 시간을 수정할 때 사용합니다

```bash
# afile을 생성
$ touch afile

# afile의 시간을 현재 시간으로 갱신
$ touch -c afile

# bfile의 날짜 정보를 afile의 정보와 동일하게 변경
$ touch -r afile bfile
```

### echo

- echo는 어떤 문자열을 화면에 보여줄 때 사용. echo와 리다이렉션을 사용해 파일을 생성, 추가하는 작업을 많이 합니다.

```bash
# helloworld 출력
$ echo 'helloworld'

# 패스로 지정된 문자열을 출력
$ echo $PATH

# 이스케이프 문자열을 해석
$ echo -e 문자열

# 개행을 표시할 수 있음
$ echo -e "안녕하세요\n이렇게 하면\n새 줄이생겨요"

# ls와 유사하게 현재 디렉터리의 파일과 폴더를 출력
$ echo *

# 리다이렉션 '>'을 사용해 hello.txt 파일 생성. 파일 내용에는 echo로 표시되는 내용이 들어감
$ echo hello redirection > hello.txt

# 추가 연산자 >>를 사용해 기존 파일에 문자열 추가
$ echo hello2 >> hello.txt
```

### ip addr/ifconfig

- 접속한 리눅스의 IP 정보를 알아낼 때 사용.

```bash
$ ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default
qlen 1000
link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
inet 127.0.0.1/8 scope host lo
valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP
group default qlen 50000
link/ether fa:16:3e:5d:0b:d7 brd ff:ff:ff:ff:ff:ff
inet 10.201.1.10/16 brd 10.202.255.255 scope global eth0
valid_lft forever preferred_lft forever
```

- ip addr이 설치되어 있지 않은 경우에는 ifconfig를 사용.

```bash
$ ifconfig
eth0 Link encap:Ethernet HWaddr 06:4d:de:ae:a8:50
inet addr:172.31.27.212 Bcast:172.31.31.255 Mask:255.255.240.0
inet6 addr: fe80::44d:deff:feae:a850/64 Scope:Link
UP BROADCAST RUNNING MULTICAST MTU:9001 Metric:1
RX packets:68903966 errors:0 dropped:0 overruns:0 frame:0
TX packets:75295223 errors:0 dropped:0 overruns:0 carrier:0
collisions:0 txqueuelen:1000
RX bytes:15691124260 (15.6 GB) TX bytes:42265387295 (42.2 GB)

lo Link encap:Local Loopback
inet addr:127.0.0.1 Mask:255.0.0.0
inet6 addr: ::1/128 Scope:Host
UP LOOPBACK RUNNING MTU:65536 Metric:1
RX packets:6623596 errors:0 dropped:0 overruns:0 frame:0
TX packets:6623596 errors:0 dropped:0 overruns:0 carrier:0
collisions:0 txqueuelen:1
RX bytes:349206971 (349.2 MB) TX bytes:349206971 (349.2 MB)
```

### ss

- socket statistics의 약자로 네트워크 상태를 확인하는 데 사용.

- nestat과 동일. 옵션으로 a, t, u, l, p, n 등이 있다.
  |Option|Description|
  |------|-----------|
  |ss -a | 모든 포트 확인|
  |ss -t | TCP 포트 확인|
  |ss -u | UDP 포트 확인|
  |ss -l | LISTEN 상태 포트 확인|
  |ss -p | 프로세스 표시|
  |ss -n | 호스트, 포트, 사용자명을 숫자로 표시|

- TCP 포트 중 LISTEN 상태인 포트의 번호를 알고 싶을 때 다음과 같이.

```bash
$ ss -tln
LISTEN 0 511 *:443 *:*
LISTEN 0 1 127.0.0.1:8006 *:*
LISTEN 0 511 *:80 *:*
```

### nc

- netcat의 약자로 예전에는 포트가 열렸는지 확인하는 데 사용.

```bash
# 포트가 오픈됐는지 확인
$ nc IP주소 포트

# 더 자세한 정보가 남음
$ nc -v IP주소 포트

# 현재 서버의 포트를 오픈(방화벽에 해당 포트 번호가 설정 함)
$ nc -l 포트
```

### which, whereis, locate

- which는 특정 명령어의 위치를 찾아줌.

```bash
$ which git
/usr/local/bin/git

# which -a : 검색 가능한 모든 경로에서 명령어를 찾아준다.
$ which -a git
/usr/local/bin/git
/usr/bin/git

# where : which -a와 같다.
$ where git
/usr/local/bin/git
/usr/bin/git

# whereis는 실행 파일, 소스, man 페이지의 파일을 찾아준다.
$ whereis ssh
ssh: /usr/bin/ssh /usr/share/man/man1/ssh.1

# locate는 파일명을 패턴으로 빠르게 찾아준다.
# 아래 예제는 .java 파일을 찾아주는 명령.
$ locate *.java
```

### tail

- tail은 파일의 마지막 부분을 보여준다. 이와 반대로 head는 파일의 첫 부분을 보여준다.

```bash
# 파일의 마지막 라인부터 숫자만큼의 파일의 라인 수를 보여주기
$ tail -n {숫자} {파일경로}

# 숫자로 지정한 라인부터 보여주기
$ tail -n +{숫자} {파일경로}

# 파일의 마지막 라인부터 숫자로 지정한 바이트 수 만큼 보여주기
$ tail -c {숫자} {파일경로}

# Ctrl + C로 중단하기 전까지 지정한 파일의 마지막에 라인이 추가되면 계속 출력하기
$ tail -f {파일경로} :

# 파일의 마지막 라인부터 지정한 숫자만큼을
# {초}로 지정한 시간이 지날 때마다 리프레시해서 보여주기
$ tail -n {숫자} -s {초} -f {파일경로}
```

### find

- find는 명령어의 뜻 그대로 파일이나 디렉터리를 찾는 데 사용하는 명령어.

```bash
# 확장자 명으로 찾기
$ find {디렉터리} -name '*.bak'

# 디렉터리를 지정해 찾기
$ find {디렉터리} -path '**/검색 시 사용하는 디렉터리명/**.*.js'

# 파일명을 패턴으로 찾기
$ find {디렉터리} -name '*패턴*'

# 파일명을 패턴으로 찾되 특정 경로는 제외하기
$ find {디렉터리} -name '*.py' -not -path '*/site-packates/*'

# 파일을 찾은 다음 명령어 실행하기
$ find {디렉터리} -name '*.ext' -exec wc -l {} \;

# 최근 7일간 수정된 파일을 찾고 삭제하기
$ find {디렉터리} -daystart -mtime -7 -delete

# 0바이트인 파일을 찾고 삭제하기
$ find {디렉터리} -type f -empty -delete
```

### ps

- 현재 실행 중인 프로세스 목록과 상태를 보여준다.

```bash
# 실행 중인 모든 프로세스를 보여주기
$ ps aux

# 실행 중인 모든 프로세스를 전체 커맨드를 포함해 보여주기
$ ps auxww

# 특정 문자열과 매칭되는 프로세스 찾기(grep은 바로 다음에 나옵니다)
$ ps aus | grep {패턴}

# 메모리 사용량에 따라 정렬하기
$ ps --sort size
```

- ps와 grep을 pipe로 사용하여 현재 실행 중인 프로세스 목록중 특정 명칭을 포함하는 프로세스를 찾는 식으로 사용하기도 한다.

### grep

- grep은 입력에서 패턴에 매칭되는 내용을 찾는 명령어.
- grep이라는 이름은 ed의 명령어인 g/re/p(내용 전체를 정규식으로 찾은 다음 프린트하라: globally search for a regular expression and print matching lines)에서 왔음.
- 보통 find, ps 등과 조합해 사용.

```bash
# 파일에서 특정 패턴을 만족하는 부분 찾기
$ grep "패턴" 파일경로

# 파일명과 라인을 함께 표시하기
$ grep --with-filename --line-number "패턴" 파일경로

# 매칭하지 않는 부분 표시하기
$ grep --invert-match "패턴"

# cat과 함께 사용하기
$ cat 파일경로 | grep "패턴"
```

### kill

- 프로세스를 죽이는 명령어
- 프로세스를 죽인다고는 하지만 원리는 프로세스에 중지하라는 시그널을 보내는 것
- SIGKILL, SIGSTOP은 강제 종료이며 나머지는 정상적으로 종료.
- 프로세스 아이디는 ps 명령어로 알아낼 수 있다.

```bash
# kill에서 사용할 수 있는 시그널 표시하기
$ kill -l

# 프로세스 죽이기 SIGTERM(terminate)
$ kill 프로세스ID

# 백그라운드 잡 종료시키기
$ kill {잡ID}

# 프로세스 강제 종료
$ kill -9 | KILL 프로세스ID
```

### alias

- alias를 사용하면 줄여서 사용할 수 있다

```bash
# 모든 alias 표시하기
$ alias

# alias 만들기
# 예) alias ll="ls -al"
$ alias 단어="명령"

# cd ../..을 cd …으로 줄여 쓰기
# cd ../../../은 cd ….으로 가능
$ alias ...=../..
$ alias ....=../../..
$ alias .....=../../../..
$ alias ......=../../../../..

# alias 삭제하기
$ unalias 단어
```

### vi / vim

- vi 혹은 vim은 대부분의 리눅스에 기본적으로 설치되어 있는 텍스트 에디터

```bash
vi test.txt
```

## Reference

[백엔드 개발자라면 알아야 할 리눅스 필수 명령어 21개](https://yozm.wishket.com/magazine/detail/2103/)
