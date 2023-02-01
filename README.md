# EchoMusicWeb

- A web project work with echo-music-api
- Base on react, tailwindcss and vite

## Started

```bash
pmpm install
```

---

## Develop

```bash
pnpm dev
```

---

## Build

```bash
pnpm build
```

---

## Config

- Config api baseUrl in `src/common/request.ts`

```typescript
// src/common/request.ts
import axios from "axios";

const baseUrl = "http://127.0.0.1:3001"; // replace the base url

const instance = axios.create({ baseURL: baseUrl });
```
