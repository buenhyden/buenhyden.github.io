# buenhyden.github.io

`buenhyden.github.io`의 GitHub Pages 배포 저장소입니다. 블로그 원본과 빌드 코드는 비공개 저장소 `buenhyden/blog-data`에 있고, 이 저장소에는 그 원본을 검증해 빌드하고 Pages에 올리는 workflow만 둡니다. 사이트 파일을 직접 고치거나 커밋하지 않습니다.

## 구성

| 경로 | 역할 |
| :-- | :-- |
| `.github/workflows/pages-build-deploy.yml` | `Pages CI Build and Deploy`. 원본 확인, 빌드, 배포, 배포 뒤 확인 |
| `.github/workflows/validate-pages-contract.yml` | `.github/scripts/**`·`.github/workflows/**`가 바뀌는 PR과 `main` push에서 배포 workflow 계약을 검사 |
| `.github/scripts/validate-pages-workflow.mjs` | 배포 workflow의 action 고정 SHA, job 권한, job 순서, 배포 뒤 확인 경로를 검사 |
| `.github/scripts/validate-pages-workflow.test.mjs` | 위 검사기의 회귀 시험 |

## 배포 흐름

1. `blog-data`의 `main`에 변경이 병합되고 원본 CI가 성공하면, `blog-data`의 `.github/workflows/trigger-pages-build.yml`이 이 저장소의 `Pages CI Build and Deploy`를 `workflow_dispatch`로 부릅니다. 사이트에 영향이 없는 변경이면 부르지 않습니다.
2. 입력은 원본 저장소·브랜치·웹 디렉터리·커밋 SHA·이벤트·실행 id·시도 번호·HTML 표식입니다. 원본은 `buenhyden/blog-data`의 `main` push만 받습니다.
3. `build` job이 그 원본 CI 실행이 성공했는지 확인하고, 정확한 원본 커밋을 받아 다시 빌드합니다. Pages artifact만 남기고 비공개 원본은 올리기 전에 지웁니다.
4. `deploy` job이 artifact를 GitHub Pages에 배포하고, `smoke_post_deploy` job이 실제 사이트의 manifest와 HTML 표식을 확인합니다.

workflow는 기본 권한을 모두 막고 job마다 필요한 권한만 줍니다. 비공개 원본은 범위를 좁힌 저장소 secret으로 읽습니다.

## blog-data와의 관계

이 저장소는 `blog-data`에 `site/pages` submodule로 등록되어 있습니다. `blog-data`는 이 저장소의 커밋 하나를 가리킬 뿐 배포에 쓰지 않으며, 배포는 위 흐름대로 이 저장소의 `main`에서만 일어납니다. 배포 절차와 재시도, 인계는 `blog-data`의 `docs/05.operations/03.runbooks/0003-deploy.md`가 정합니다.

workflow를 바꿀 때는 이 저장소에서 PR을 열고 계약 검사가 통과한 뒤 병합합니다. 병합한 뒤 `blog-data`에서 submodule을 새 커밋으로 올립니다.

```bash
git -C site/pages pull --ff-only origin main
git add site/pages
```

## 로컬 확인

```bash
node --test .github/scripts/validate-pages-workflow.test.mjs
node .github/scripts/validate-pages-workflow.mjs
```
