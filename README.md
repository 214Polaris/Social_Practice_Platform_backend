## 本地测试 3306端口被占用
`netstat -ano | findstr :3306`
`taskkill /PID {对应进程号} /F`