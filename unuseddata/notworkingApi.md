# Get repair requests


## CURL

```bash
curl 'https://fleetmax-api.fleet.lmdmax.com/repair_requests/v1/repair_requests' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0' -H 'Accept: application/json, text/plain, */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br' -H 'x-access-token: bbc6b282d80673f805af7f1f0db5bf1ccb3f02beea0bf8cbe03b42232f13065bf2e3dc8301f44a3ec2b273c1de6efe63682ebfeb79c631fab1bea04ad0577bdc0ad0359757faa6bd058c310a71b6a3009cc8b02c3f36434f24db8e80a014b2613d269ce44c68f8fa932c9f8cc6ec18be109a139e5bf2fbc269f2bfe30e92d172f58b8acaf9f5d93625d5ab5e4b5ba769e8d0c54a1260858bbd77fbc7829c347e032ae4109a47e334e07b47f6de1315f6a07300f14eb30abaa9cde96d9921de12d9b3d5a1a648d0dff2e7271898e963889ea0cb89dbcd8fa3c859f44f91b57a044910067b65a5b21e56ec00c7570ab65a5aabead55c94d54b153326879392164c' -H 'x-access-user: 76159103' -H 'Origin: http://localhost:3000' -H 'Connection: keep-alive' -H 'Referer: http://localhost:3000/' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: cross-site' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'TE: trailers'
```

## Response

```json
{"success":false,"message":"Failed to authenticate token at Lv2"}
```


# Get all technicians

### CURL

```bash
curl 'https://fleetmax-api.fleet.lmdmax.com/technicians/v1/technicians?vendor_account_id=76159103' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0' -H 'Accept: application/json, text/plain, */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br' -H 'x-access-token: bbc6b282d80673f805af7f1f0db5bf1ccb3f02beea0bf8cbe03b42232f13065bf2e3dc8301f44a3ec2b273c1de6efe63682ebfeb79c631fab1bea04ad0577bdc0ad0359757faa6bd058c310a71b6a3009cc8b02c3f36434f24db8e80a014b2613d269ce44c68f8fa932c9f8cc6ec18be109a139e5bf2fbc269f2bfe30e92d172f58b8acaf9f5d93625d5ab5e4b5ba769e8d0c54a1260858bbd77fbc7829c347e032ae4109a47e334e07b47f6de1315f6a07300f14eb30abaa9cde96d9921de12d9b3d5a1a648d0dff2e7271898e963889ea0cb89dbcd8fa3c859f44f91b57a044910067b65a5b21e56ec00c7570ab65a5aabead55c94d54b153326879392164c' -H 'x-access-user: 76159103' -H 'Origin: http://localhost:3000' -H 'Connection: keep-alive' -H 'Referer: http://localhost:3000/' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: cross-site' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'TE: trailers'
```

### Response

```json
{"success":false,"message":"Failed to authenticate token at Lv2"}
```