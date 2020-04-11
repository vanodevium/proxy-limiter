## AnyProxy BSG with rate limiter

### Installation
- `yarn install` or `npm i`
- `yarn cp:env` and set environment variables (set APP_ENV to local for sqlite development)
- `yarn local:db` if you want to local development with sqlite

### Running
- `node index.js`
> You can use pm2 or another process manager

### Route certificate
- `yarn certificate`
- ```
  Trust self-assigned certificate
  In ubuntu:
  
  - Go to /usr/local/share/ca-certificates/
  - Create a new folder, i.e. "sudo mkdir school"
  - Copy the .crt file into the school folder
  - Make sure the permissions are OK (755 for the folder, 644 for the file)
  - Run "sudo update-ca-certificates"
  ```

### Testing
- run `./test.sh`