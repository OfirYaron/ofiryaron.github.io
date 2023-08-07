Certainly! Here's an updated version of the article, modified to use WireGuard as the VPN service of choice.

Introduction¶

This is a guide on how to send all traffic from a group of pods to a gateway pod, which will then route the traffic further using WireGuard VPN.

Requirements¶

- One or more namespaces where you deploy pods to be routed.
- Another namespace to deploy the gateway pod to. It is critical to deploy the gateway to a different namespace than the routed pods.
- VPN client settings for WireGuard (credentials, hostname, etc).

Deploying the pod gateway¶

Namespace¶

You need a namespace with the label routed-gateway set to true. In this tutorial, the namespace will be called vpn:

```yaml
# namespace.yaml
---
apiVersion: v1
kind: Namespace
metadata:
  name: vpn
  labels:
    routed-gateway: "true"
```

Pod Gateway Helm release¶

You need to deploy the pod-gateway helm chart. Assuming you use GitOps to deploy the routed pods, you might use the following template to deploy the gateway pod:

```yaml
# HelmRelease.yaml
---
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: vpn-gateway
  namespace: default
  labels:
spec:
  interval: 5m
  chart:
    spec:
      # renovate: registryUrl=https://k8s-at-home.com/charts/
      chart: pod-gateway
      version: 2.0.0
      sourceRef:
        kind: HelmRepository
        name: k8s-at-home-charts
        namespace: flux-system
      interval: 5m

  # See https://github.com/k8s-at-home/charts/blob/master/charts/pod-gateway/values.yaml
  values:
    routed_namespaces:
    - vpn
    addons:
      vpn:
        enabled: true
        type: wireguard
        wireguard:
          configFileSecret: wireguard
          privateKeySecret: wireguard-privatekey
          publicKeySecret: wireguard-publickey

          livenessProbe:
            exec:
              command:
                - sh
                - -c
                - if [ $(wget -q -O- https://ipinfo.io/country) == 'BE' ]; then exit 0; else exit $?; fi
            initialDelaySeconds: 30
            periodSeconds: 60
            failureThreshold: 1

          networkPolicy:
            enabled: true

            egress:
            - to:
              - ipBlock:
                  cidr: 0.0.0.0/0
              ports:
              - port: 51820
                protocol: UDP
```

The above should deploy a gateway and a gateway-hook:

- The gateway-hook has the task of modifying created PODs in the vpn namespace to be configured to use the VPN gateway.
- The gateway provides a WireGuard tunnel, a DHCP server, and a DNS server for client pods to connect to.

Test deployment¶

Then you can deploy a test deployment to test it:

```yaml
# TestDeployment.yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: terminal
  namespace: vpn
  labels:
    app: terminal
spec:
  replicas: 1
  selector:
    matchLabels:
      app: terminal
  template:
    metadata:
      labels:
        app: terminal
    spec:
      containers:
      - name: alpine
        image: alpine
        command:
        - /bin/sh
        - -c
        - while true; do
            sleep 600 &
           