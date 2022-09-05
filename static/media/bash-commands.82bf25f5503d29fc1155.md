[_metadata_:author]:- "Ofir Yaron"
[_metadata_:title]:- "Useful Bash Commands"
[_metadata_:tags]:- "bash,commands"
[_metadata_:date]:- "3/9/2022"

Get Local IP
```
curl ifconfig.me
```

Get IP from terminal:
```
wget -qO- https://ipecho.net/plain ; echo
```

Get response from EKS pod by it’s IP:
```
wget -qO- http://10.1.1.249:8080/ ; echo
```