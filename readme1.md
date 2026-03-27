## 🏗️ Architecture Diagram

```mermaid
graph TD
    A[Browser] --> B[Ingress Controller]
    B --> C[Service]
    C --> D[Pod 1]
    C --> E[Pod 2]
    C --> F[Pod N]

    subgraph Kubernetes Cluster (k3d)
        B
        C
        D
        E
        F
    end
```

### 🔍 Flow Explanation

1. User hits `myapp.local`
2. Ingress routes request
3. Service load balances traffic
4. Pods serve the request

---
