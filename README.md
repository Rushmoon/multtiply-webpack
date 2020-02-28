# multtiply-webpack
webpack的各种配置的实验，首先结合webpack-dev-server实现本地调试，然后尝试分模块进行调试，react
- 1.使用了webpack-dev-server插件，满足了本地调试的需要，当npm start的时候，生成JS文件是存在于缓存中的，不会显示在dist中

#### 运行
- 1.npm i
- 2.新建dist文件，文件中内容为html html文件随自己定制，可以参考主目录下的index.html 
- 3.在新建的html中创立script标签引入bunble.js
- 4.运行npm start即可
### 持续更新
- 尝试对webpack的配置进行一系列尝试，最终会形成一个分模块管理打包，分模块本地调试的webpack的前端例子，持续更新
- webpack的配置尝试的同时也会对react的一些组件进行自己的尝试，已实现树组件（正在完善中）
