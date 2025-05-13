flowchart LR
    %% ─── 스타일
    classDef blk  fill:#f4f6fa,stroke:#8392d6,stroke-width:1.4px,rx:8,ry:8
    classDef edge stroke:#8392d6,stroke-width:1.1px

    %% ─── EDGE (차량) ─────────────────────────────
    subgraph EDGE["차량 Edge (터틀봇 On‑board)"]
        direction TB
        OS["Ubuntu 22.04<br/>ROS 2 Humble<br/>Docker Runtime"]:::blk
        NODES["ROS Nodes<br/>(Camera, IMU, Nav)"]:::blk
        ROSBRIDGE["rosbridge_suite<br/>(Python wss)"]:::blk
        class EDGE blk
        OS --> NODES --> ROSBRIDGE
    end

    %% ─── 네트워크 ────────────────────────────────
    LINK["TLS WebSocket<br/>(WebRTC 데이터채널 대체 가능)"]:::blk

    %% ─── BACKEND GATEWAY ─────────────────────────
    subgraph GW["실시간 게이트웨이 (WS Proxy)"]
        direction TB
        GWAPP["Node.js + NestJS (ws)"]:::blk
        AUTH["JWT Auth<br/>(Auth0 / Keycloak)"]:::blk
        GWAPP --> AUTH
        class GW blk
    end

    %% ─── CORE API 서비스 ─────────────────────────
    subgraph API["Backend API 서비스"]
        direction TB
        FASTAPI["FastAPI (Python) / Express (Node)<br/>REST + GraphQL"]:::blk
        LOGIC["도메인 로직<br/>(세션 관리·로깅)"]:::blk
        CELERY["Celery + RabbitMQ<br/>(비동기 작업)"]:::blk
        FASTAPI --> LOGIC --> CELERY
        class API blk
    end

    %% ─── DB & STORAGE ───────────────────────────
    subgraph DATA["데이터 계층"]
        MYSQL["MySQL 8.x<br/>(AWS RDS 또는 K8s StatefulSet)"]:::blk
        REDIS["Redis (세션·캐시)"]:::blk
        S3["객체 저장 (S3 / MinIO)<br/>(영상 로그)"]:::blk
        MYSQL --> REDIS
        class DATA blk
    end

    %% ─── FRONTEND ───────────────────────────────
    subgraph FE["프런트엔드 (고객센터 대시보드)"]
        direction TB
        REACT["React + TypeScript<br/>roslibjs + MUI / Chakra UI"]:::blk
        STATE["Recoil / Zustand 상태관리"]:::blk
        REACT --> STATE
        class FE blk
    end

    %% ─── DEVOPS & OBSERVABILITY ─────────────────
    subgraph DEV["DevOps / Observability"]
        CI["GitHub Actions CI/CD"]:::blk
        DOCKER["Docker Compose (로컬) → Kubernetes (Prod)"]:::blk
        MON["Prometheus + Grafana<br/>ELK (로그)"]:::blk
        CI --> DOCKER --> MON
        class DEV blk
    end

    %% ─── 연결선 ──────────────────────────────────
    ROSBRIDGE -- wss(JSON) --> LINK
    LINK -- wss(JSON) --> GWAPP
    GWAPP -- gRPC / REST --> FASTAPI
    FASTAPI -- SQLAlchemy/Prisma --> MYSQL
    FASTAPI -- HTTP(S) --> REACT
    FASTAPI -- pre‑signed URL --> S3
    REACT -- wss(JSON) --> GWAPP
