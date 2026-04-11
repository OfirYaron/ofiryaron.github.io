[_metadata_:author]:- "Ofir Yaron"
[_metadata_:title]:- "Home Assistant on a Synology NAS"
[_metadata_:tags]:- "home-assistant,synology,nas,docker,automation"
[_metadata_:date]:- "11/04/2026"

Your NAS is already running 24/7, has redundant storage, and is significantly more reliable than a Raspberry Pi. There's no reason to run a dedicated device for Home Assistant when a Docker container on your NAS can do the same job — and restart automatically after power cuts, updates, or reboots without any intervention from you.

This guide shows how to deploy it in a way that is correct, minimal, and easy to recover.

---

## Prerequisites

- Synology NAS with Docker (or Container Manager) installed
- Portainer running (optional but recommended for visual management)
- SSH access or File Station access

---

## Step 1: Create the Config Directory

Home Assistant stores all your automations, integrations, and device pairings in its `/config` directory. This must live on your NAS, outside the container, so it survives container updates and replacements.

Via SSH:

```bash
mkdir -p /volume1/docker/homeassistant/config
```

Or create the same path using Synology File Station.

---

## Step 2: Deploy the Stack

This project uses Docker Compose files committed to Git. The Home Assistant stack lives in this folder.

**If you are deploying via Portainer:**

1. Log into Portainer → **Stacks** → **+ Add stack**
2. Name it `home-assistant`
3. Switch to **Upload** and upload the `docker-compose.yaml` from this folder, or paste its contents into the web editor
4. Click **Deploy the stack**

**If you are deploying directly from the NAS via SSH:**

```bash
cd /path/to/this/repo/home-assistant
docker compose up -d
```

---

## The Compose File — What Each Setting Does and Why

```yaml
services:
  homeassistant:
    image: ghcr.io/home-assistant/home-assistant:stable
    container_name: homeassistant
    hostname: homeassistant
    security_opt:
      - no-new-privileges:true
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:8123/"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s
    network_mode: host
    volumes:
      - /volume1/docker/homeassistant/config:/config:rw
    environment:
      TZ: Asia/Jerusalem
    restart: unless-stopped
```

**`network_mode: host`**
Home Assistant uses mDNS and Zeroconf to auto-discover devices (smart bulbs, Chromecasts, Apple TV, etc.) on your local network. These protocols do not cross Docker's default bridge network. Host networking is the correct and supported solution, not a workaround.

**`restart: unless-stopped`**
The container restarts automatically after the NAS reboots or if the process crashes — but it stays stopped if *you* deliberately stop it. Using `always` instead would restart the container even after an intentional `docker stop`, which is the wrong behaviour.

**`TZ: Asia/Jerusalem`**
Setting the timezone via an environment variable is portable across all NAS platforms. The older pattern of bind-mounting `/etc/localtime` from the host can break on non-Synology systems or when DST changes are handled differently by the host OS.

**`security_opt: no-new-privileges:true`**
Prevents any process inside the container from gaining more privileges through setuid/setgid binaries. Correct default for any container that doesn't explicitly need privilege escalation.

**No `privileged: true`**
The original tutorial enables `privileged: true` unconditionally. This grants the container full root access to the host kernel — effectively the same as running without any container isolation. Home Assistant does not need this for normal operation. If you have a USB Zigbee or Z-Wave stick, use a `devices:` entry (commented out in the compose file) to expose only that specific device.

---

## Step 3: Access Home Assistant

Once the container is running and the healthcheck passes:

```
http://<NAS-IP>:8123
```

Follow the onboarding flow to create your owner account, set your location, and connect your first devices.

---

## Recovery

Because your config lives at `/volume1/docker/homeassistant/config` and your compose definition is committed here in Git, recovery after a disk swap or NAS replacement is:

```bash
# On the new NAS, after restoring /volume1/docker/homeassistant/config from backup:
git clone <this-repo>
cd Nas-Config/home-assistant
docker compose up -d
```

That's it. All automations, device pairings, and integrations are in the config directory. Nothing is stored inside the container.

---

## Adding a Zigbee/Z-Wave USB Stick

Uncomment and adjust the `devices` block in `docker-compose.yaml`:

```yaml
    devices:
      - /dev/ttyUSB0:/dev/ttyUSB0
```

To find the correct device path on your Synology:

```bash
ls /dev/tty*
```

Plug the stick in, run the command again, and the new entry is your device. No `privileged: true` required.

---

## Using a Reverse Proxy (Caddy, Nginx, etc.)

If you access Home Assistant via a reverse proxy (e.g. Caddy routing `homeassistant.yourdomain.com` to `localhost:8123`), Home Assistant will reject the requests by default. There is no environment variable to override this — it must be configured in `configuration.yaml`.

Add the following to `/volume1/docker/homeassistant/config/configuration.yaml`:

```yaml
http:
  use_x_forwarded_for: true
  trusted_proxies:
    - 127.0.0.1
```

**`use_x_forwarded_for: true`**
Tells Home Assistant to read the real client IP from the `X-Forwarded-For` header set by the proxy, rather than treating all requests as coming from the proxy itself.

**`trusted_proxies`**
The list of IPs Home Assistant will accept proxy headers from. Since Caddy runs on the same host with `network_mode: host`, `127.0.0.1` is sufficient. If your reverse proxy runs in a Docker bridge network instead, also add its subnet (e.g. `172.17.0.0/16`).

After saving, restart the container:

```bash
docker restart homeassistant
```
