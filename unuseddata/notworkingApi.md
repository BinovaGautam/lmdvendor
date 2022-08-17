# Create Quotation

### CURL

```bash
curl 'https://fleetmax-api.fleet.lmdmax.com/quotations/v1/quotations/16' -X POST -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0' -H 'Accept: application/json, text/plain, */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br' -H 'x-access-token: 0712775807fdbcf4a819f03f76f048d76d51c7d7063cd59f33d529c333d61f4b06d1f42628750cadf7674f3acb12d58cbb15aa0e1c0c5f94879367f2e85163fd9d669195005d4832efd1735aafc989f2f08983763d8354b44e50304e44d409f7df2e6715556795bb7c64e404720ab0ad186b20c3f4de5d04b7233b545adaf954dff0c56bbaf6b32c0938ef3c50e25ec933291771a31ba298e454af92c9bd3e0585ca6988ef6e1ac0319787d542ee2083328c4ac349ce134971b4f2feceb4628f58639b3445fe0c2e17d61938f0927468f7f693b86cd1548f942e2a023b57e27c25aa685f39607dc941726800d8aa746aefe419dc29592f05d3b609b92ff8f2f5' -H 'x-access-user: 26272454' -H 'Content-Type: multipart/form-data; boundary=---------------------------17724909394670137823882602319' -H 'Origin: http://localhost:3000' -H 'Connection: keep-alive' -H 'Referer: http://localhost:3000/' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: cross-site' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'TE: trailers' --data-binary $'-----------------------------17724909394670137823882602319\r\nContent-Disposition: form-data; name="estimated_amount"\r\n\r\n323\r\n-----------------------------17724909394670137823882602319\r\nContent-Disposition: form-data; name="work_hour"\r\n\r\n2\r\n-----------------------------17724909394670137823882602319\r\nContent-Disposition: form-data; name="vendor_account_id"\r\n\r\n26272454\r\n-----------------------------17724909394670137823882602319\r\nContent-Disposition: form-data; name="quotation"; filename="ethical+mens+clothing+brands+-+Armed+Angels+cardigan.png"\r\nContent-Type: image/png\r\n\r\n-----------------------------17724909394670137823882602319--\r\n'
```

### Response

```bash
{"success":false,"message":"User not authorized!","data":null,"metadata":null,"status":401,"action":"repair_request","signature":"1660725754802.TZJG1mKqv9zd3","type":"repair_requests","id":null}
```