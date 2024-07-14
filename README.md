**<p align="center"><font size="10px">社会实践平台</font></p>**

<div align="center">

![](https://img.shields.io/badge/Star-6-yellow)
![](https://img.shields.io/badge/SpringBoot-3.2.5-red)

![](https://img.shields.io/badge/Maven-4.0.0-blue)
![](https://img.shields.io/badge/MyBatis-3.0.3-orange)
</div>

# 项目概览
本项目是一个基于 Java、Spring Boot 和 MvBatis 的后端服务仓库，专注于提供社区与高校突击队之间的需求匹配功能。

本项目为用户查询、发布和匹配社区需求，高校突击队根据自身能力和兴趣查找适合的社区项目等功能提供了合适高效的API。

组长：陈骏炜
组员：陈梓键、姚梓童、徐玥、林一熙

后端代码在 src 文件夹中，前端代码在 wx 文件夹中，如需部署，请联系组长。


# 注意事项
## 本地测试 3306端口被占用
`netstat -ano | findstr :3306`
`taskkill /PID {对应进程号} /F`
