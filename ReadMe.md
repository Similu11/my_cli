1. package.json中添加
   "private"："true"  禁止发布
2. bin/index
   #!/usr/bin/env node  找到操作系统的node环境
   npm link 将命令添加到全局
   打开 powerShell 用管理员身份运行
   输入命令： set-ExecutionPolicy RemoteSigned 
   输入A
   再输入命令，即可执行
3.figlet输出ASCII字符
  @darkobits/lolcatjs  将输出字符转变为渐变色

4.Commander 负责将命令行参数解析为选项和命令参数
5.inquirer 命令行交互工具
6.chalk 控制台输出字体样式工具
7.json2ts 接口生成ts interface工具
8.ora 控制台loading工具
9.shelljs js编写shell脚本工具