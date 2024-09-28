---
title: Kubernetes
date: 2023-10-15T12:46:00+09:00
description: 컨테이너화된 애플리케이션의 자동 디플로이, 스케일링 등을 제공하는 관리시스템으로, 오픈 소스 기반
summary: 컨테이너화된 애플리케이션의 자동 디플로이, 스케일링 등을 제공하는 관리시스템으로, 오픈 소스 기반
linkTitle: Kubernetes
series:
  - Container Orchestration(CO)
categories:
  - Dev Ops
  - Container
  - Container Orchestration(CO)
tags:
  - Kubernetes
lastmod: 2024-01-03T23:16:53
featured: true
---

![Kubernetes](media/images/kubernetes.png "https://kubernetes.io/ko/docs/concepts/overview/components/")

## Roadmap

<p align="center">
<iframe width="768" height="1024" src="https://roadmap.sh/kubernetes?s=652b754df43a58c923ce9d26" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>#

## Reference

[Kubernetes Official Homepage](https://kubernetes.io/)  
[쿠버네티스 안내서 설치부터 배포까지 <실습편>](https://subicura.com/k8s/?utm_source=subicura.com&utm_medium=banner&utm_campaign=blog)  
[쿠버네티스 시작하기 - Kubernetes란 무엇인가?](https://subicura.com/2019/05/19/kubernetes-basic-1.html)  
[쿠버네티스 시작하기 - 설치부터 배포까지](https://subicura.com/2020/12/13/kubernetes-basic-2.html)  
[쿠버네티스 멀티 클러스터 구축을 위한 고려사항](https://www.samsungsds.com/kr/insights/kubernetes_multi_cluster.html)  
[쿠버네티스(Kubernetes) 네트워크 정리](https://yozm.wishket.com/magazine/detail/2251/)  
[쿠버네티스 워크로드와 통신하는 방법: 1. 서비스](https://yozm.wishket.com/magazine/detail/1909/)  
[쿠버네티스 워크로드와 통신하는 방법: 2. 인그레스](https://yozm.wishket.com/magazine/detail/1916/)  
[쿠버네티스 환경의 대표적 보안 기능 3가지](https://yozm.wishket.com/magazine/detail/1953/)  
[2023년 쿠버네티스 표준 아키텍처](https://yozm.wishket.com/magazine/detail/1998/)  
[쿠버네티스 개념과 구성요소ㅣ도커, 컨테이너 오케스트레이션](https://www.codestates.com/blog/content/%EC%BF%A0%EB%B2%84%EB%84%A4%ED%8B%B0%EC%8A%A4)  
[쿠버네티스 보안 자동화, 가능할까요?](https://www.samsungsds.com/kr/insights/kubernetes_security_automation.html)  
[3. 쿠버네티스의 모든것](https://tommypagy.tistory.com/category/3.%20%EC%BF%A0%EB%B2%84%EB%84%A4%ED%8B%B0%EC%8A%A4%EC%9D%98%20%EB%AA%A8%EB%93%A0%EA%B2%83)  
[Kuberenetes 설치](https://kh-guard.tistory.com/category/Kubernetes/Kuberenetes%20%EC%84%A4%EC%B9%98)
[온프레미스 쿠버네티스 프로덕션 환경 10개월 운영기](https://blog.doctor-cha.com/on-premise-kubernetes-production-environment-10-month-operation-review)  
[온프레미스 쿠버네티스에서 NAS, GPU 사용하기 (with RKE2, NFS, gpu-operator)](https://blog.doctor-cha.com/using-nas-gpu-on-premise-kubernetes)  
[쿠버네티스 oauth-proxy로 구글 SSO 적용하기](https://blog.doctor-cha.com/google-sso-with-kubernetes-oauth-proxy)  
[Kubernetes Namespace 간 Secret 을 자동 복사하기 (feat. Kubed)](https://devocean.sk.com/search/techBoardDetail.do?ID=163434&boardType=)  
[(K8S) 쿠버네티스 환경변수 설정, 컨피그맵(ConfigMap)과 시크릿(Secret)](https://zerojsh00.github.io/posts/Configure-Environment-Variables/)  
[[AWS EKS-연재1] eksctl 을 사용한 AWS EKS 생성](https://devocean.sk.com/blog/techBoardDetail.do?ID=163654)  
[[AWS EKS-연재2] AWS EKS 에 Istio 설치 및 설정](https://devocean.sk.com/blog/techBoardDetail.do?ID=163655)  
[[AWS EKS-연재3] Istio 와 Application Load Balancer 연결](https://devocean.sk.com/blog/techBoardDetail.do?ID=163656)  
[[AWS EKS-연재4] Kubernetes 의 Resources 설정을 위한 VPA 및 Goldilocks](https://devocean.sk.com/search/techBoardDetail.do?ID=163657)  
[[AWS EKS-연재5] AWS EKS 의 Cluster Autoscaler 설정](https://devocean.sk.com/search/techBoardDetail.do?ID=163658)  
[[AWS EKS-연재6] Loki를 이용한 손쉬운 Kubernetes Logging](https://devocean.sk.com/experts/techBoardDetail.do?ID=163659&boardType=experts&page=&searchData=&subIndex=&idList=)  
[[AWS EKS-연재7] Kubernetes/Istio 를 위한 Datadog 설정](https://devocean.sk.com/experts/techBoardDetail.do?ID=163660&boardType=experts)  
[[AWS EKS-연재8] Argo CD 설치 및 설정](https://devocean.sk.com/experts/techBoardDetail.do?ID=163661&boardType=experts&page=&searchData=&subIndex=&idList=)  
[Prometheus를 사용한 kubernetes 모니터링](https://devocean.sk.com/blog/techBoardDetail.do?ID=163447&boardType=techBlog)  
[Prometheus Operator 로 설치하기(1)](https://devocean.sk.com/blog/techBoardDetail.do?ID=163168&boardType=techBlog)  
[Operator를 활용한 Prometheus 간단히 설치하기(2) - Exporter 편](https://devocean.sk.com/blog/techBoardDetail.do?ID=163266&boardType=techBlog)  
[AWS(ALB)에서 Istio를 활용한 Kubernetes Pod별 방화벽 적용](https://devocean.sk.com/blog/techBoardDetail.do?ID=164716&boardType=techBlog)  
[kubectl 명령을 사용하여 kustomize 사용하기](https://devocean.sk.com/blog/techBoardDetail.do?ID=164526&boardType=techBlog)  
[OPA GateKeeper를 사용해보자](https://devocean.sk.com/search/techBoardDetail.do?ID=164004&boardType=)  
[OPA의 활용사례 - kubescape](https://devocean.sk.com/search/techBoardDetail.do?ID=164199&boardType=)  
[Kustomize 활용법 (feat. GitOps 로 가는 여정)](https://devocean.sk.com/search/techBoardDetail.do?ID=164522&boardType=)  
[kubernetes의 접근제어방법](https://devocean.sk.com/search/techBoardDetail.do?ID=163941&boardType=)  
[Keycloak을 이용한 K8S 사용자 분리](https://seungjuitmemo.tistory.com/299)  
[쿠버네티스 프로비저닝 툴과의 만남부터 헤어짐까지 . . .](https://tech.kakao.com/2023/02/10/making-of-kubernetes-provisioning-tool/)  
[Kubernetes의 네트워크 이슈를 해결할 수 있는 network-node-manager](https://tech.kakao.com/2021/03/03/network-node-manager/)  
[실용주의 데브옵스 for MSA](https://tech.kakao.com/2021/07/16/devops-for-msa/)  
[Kubernetes 운영을 위한 etcd 기본 동작 원리의 이해](https://tech.kakao.com/2021/12/20/kubernetes-etcd/)  
[Kubernetes 클러스터에 배포할 애플리케이션 로컬 디버깅 및 개발하기](https://meetup.nhncloud.com/posts/364)  
[Custom Metric(ex. RPS)으로 HPA 설정하기](https://tech.scatterlab.co.kr/kubernetes-hpa-custom-metric/)  
[쿠버네티스에서 노드가 추가될 때마다 슬랙 알람 쏘기](https://tech.scatterlab.co.kr/kubernetes-event-alarm/)  
[쿠버네티스 오퍼레이터 적용하기](https://dev.gmarket.com/65)  
[OWASP Kubernetes Top 10: A Comprehensive Guide](https://medium.com/@seifeddinerajhi/owasp-kubernetes-top-10-a-comprehensive-guide-f03af6fd66ed)  
[Service Discovery 통합을 위한 Kubernetes Operator 구현 - Eurekube Operator](https://11st-tech.github.io/2022/07/20/eurekube-operator/)  
[Kubernetes 실습 (CKA 대비)](https://blog.psnote.co.kr/222)  
[Kubernetes Scheduler 설명](https://devocean.sk.com/experts/techBoardDetail.do?ID=163909&boardType=experts)  
[[Kubernetes] ConfigMap / Secret: config 정보를 container 외부에서](https://ooeunz.tistory.com/128)  
[Kubernetes의 네트워크 이슈를 해결할 수 있는 network-node-manager](https://tech.kakao.com/2021/03/03/network-node-manager/)  
[[번역] 쿠버네티스에서 쉽게 저지르는 10가지 실수](https://coffeewhale.com/kubernetes/mistake/2020/11/29/mistake-10/?utm_source=gaerae.com&utm_campaign=%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%8A%A4%EB%9F%BD%EB%8B%A4)  
[Kubernetes 아키텍처 구성해보기](https://www.whatap.io/ko/blog/183/index.html)  
[쿠버네티스의 등장 배경과 주요 특징](https://www.whatap.io/ko/blog/142/index.html)  
[모니터링 관점에서의 쿠버네티스 주요 지표](https://www.whatap.io/ko/blog/132/index.html)  
[Kubernetes](https://zerobig-k8s.tistory.com/category/Kubernetes)
