# Migration Guide - Environment Variables

## Overview
This migration moves configuration from `config/game.json` to environment variables for better Docker deployment practices.

## Breaking Changes

### 1. Manager Password
**Before:** Password was stored in `config/game.json`
```json
{
  "managerPassword": "PASSWORD"
}
```

**After:** Password is now set via environment variable
```bash
MANAGER_PASSWORD=your_secure_password
```

⚠️ **Action Required:** You must set `MANAGER_PASSWORD` in your `docker-compose.yml` or the application will fail to start.

## New Features

### 1. Custom Background Image
You can now set a custom background image via environment variable:
```bash
BACKGROUND_IMAGE_URL=https://example.com/your-background.jpg
```

If not set, the default background color will be used.

## Environment Variables Reference

### Required Variables
- `MANAGER_PASSWORD` - Password for manager authentication (no default, must be set)

### Optional Variables
- `WEB_ORIGIN` - CORS origin for web access (default: `http://localhost:3000`)
- `SOCKET_URL` - Socket server URL (default: `http://localhost:3001`)
- `SOCKET_PORT` - Port for socket server (default: `3001`)
- `BACKGROUND_IMAGE_URL` - Custom background image URL (default: none)

## Docker Compose Configuration

Update your `compose.yml`:

```yaml
services:
  rahoot:
    image: ghcr.io/vonjunge/rahoot:latest
    ports:
      - "3000:3000"
      - "3001:3001"
    volumes:
      - ./config:/app/config
    environment:
      - WEB_ORIGIN=http://localhost:3000
      - SOCKET_URL=http://localhost:3001
      - MANAGER_PASSWORD=your_secure_password_here  # REQUIRED!
      - BACKGROUND_IMAGE_URL=https://example.com/bg.jpg  # Optional
```

## GitHub Actions

The project now includes automated Docker image builds via GitHub Actions:
- Builds are triggered on pushes to `main`/`master` branches
- Tagged releases (e.g., `v1.0.0`) create versioned images
- Images are published to GitHub Container Registry (ghcr.io)

### Pulling Images
```bash
# Latest version
docker pull ghcr.io/vonjunge/rahoot:latest

# Specific version (if tagged)
docker pull ghcr.io/vonjunge/rahoot:v1.0.0
```

## Fixed Issues

1. ✅ Fixed typo: `SOCKER_PORT` → `SOCKET_PORT`
2. ✅ Socket port now uses environment variable instead of hardcoded value
3. ✅ Standardized Zod imports across all packages
4. ✅ Fixed Dockerfile port exposure (was 5505, now correctly 3001)
