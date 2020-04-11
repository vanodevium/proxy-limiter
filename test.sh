#!/bin/bash

curl --proxy 127.0.0.1:8001 https://httpbin.org/ip -H "x-project: test" && echo "done1" &
curl --proxy 127.0.0.1:8001 https://httpbin.org/ip -H "x-project: test" && echo "done2" &
curl --proxy 127.0.0.1:8001 https://httpbin.org/ip -H "x-project: test" && echo "done3" &
curl --proxy 127.0.0.1:8001 https://httpbin.org/ip -H "x-project: test" && echo "done4" &
curl --proxy 127.0.0.1:8001 https://httpbin.org/ip -H "x-project: " && echo "done5" &

wait