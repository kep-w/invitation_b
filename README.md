# bmw
bmw 试驾活动

### 打包流程
#### 1.安装nodejs(https://nodejs.org/en/)下载安装，确认安装是否成功可以使用  node -v 确认版本号，现在我本机版本是v4.26
#### 2.确认npm 是否安装使用 npm -v (确认版本号,现在我本机的版本是2.14.12，最新版nodejs安装nodejs自带安装了npm)
#### 3.安装grunt插件 命令  npm install -g grunt-cli (确认是否安装完成grunt -v)
#### 4.安装打包各项插件 命令 npm install
#### 5.进入项目目录运行命令 npm run build （默认情况下稍等大约1分钟命令执行完成即可）前3部属于环境配置部分，以后每次只需在上线前运行grunt命令即可

### 上线注意
#### 使用grunt命令打包后，弱控制台显示Done，即打包完成，后面将访问路径指向grunt生成的新目录bmw