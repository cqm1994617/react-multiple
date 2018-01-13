# react-multiple

Webpack打包多页React项目的脚手架。

# 版本

React v16.2.0

webpack v3.10.0

# 使用

```
git clone https://github.com/cqm1994617/react-multiple.git

cd react-multipage

npm start

http://localhost:8089/

```

如果要创建新页面，``src/page``目录下新建文件夹，文件夹名即为页面的路由名。
比如新建一个test目录，在test文件夹中新建index.html和index.js，之后就可以在浏览器中输入 http://localhost:8089/test 访问新建的页面。

**注意：新增页面文件时，需要先npm run dev之后再重新npm start**

开发端口：server/devServer中修改port即可，默认为8089

# 命令

npm start: 本地环境启动

npm run dev: 打测试包，不压缩代码，不使用extract-text-webpack-plugin插件

npm run build: 打正式包，压缩代码并使用extract-text-webpack-plugin插件

