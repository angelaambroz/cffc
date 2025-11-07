# Proof of concept (Nov 2025)

```
# One-liner to get a clean Node environment
docker run -it --rm -v $(pwd):/app -w /app -p 8080:8080 node:20-slim bash

# Inside container:
npm init -y
npm install --save-dev @11ty/eleventy
# etc.
```
