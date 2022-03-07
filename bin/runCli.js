#!/usr/bin/env node
const figlet = require('figlet');
const version = require('../package.json').version;
const Printer = require('@darkobits/lolcatjs');
const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const json2ts = require("json2ts");
const ora = require('ora');
// const userHome = require('user-home');
const shell = require('shelljs');
const downLoad = require('download-git-repo');
const templateUrl = "direct:https://github.com/hpeeNew/Monitoring-platform_server.git"
const program = new Command();
const txt = figlet.textSync('FLYING', {
    font: '3D-ASCII',
    horizontalLayout: 'full',
    verticalLayout: 'controlled smushing',
    width: 150,
    whitespaceBreak: true
}) + '\n' + `                                                           熙程脚手架 V${version}`;
const title = Printer.fromString(txt);
const bindHandler = {
    init() {
        inquirer
            .prompt([
                {
                    type: 'text',
                    name: "projectName",
                    message: "😸 请输入项目名称"
                },
                {
                    type: 'list',
                    name: "jsKind",
                    message: "😸 请输入该项目开发语言",
                    choices: ['✡ ES6', '✡ TypeScript']
                }
            ])
            .then((answers) => {
                //准备一个比较完备的项目  { projectName: '001', jsKind: '✡ TypeScript' }
                //git下载这个包
                //shelljs 根据用户的选择，对下载的包进行修改，删除
                //在用户的桌面创建最终的命令
                //引导他开发
                if (answers.projectName) {
                    const spinner = ora({ interval: 100 }).start();
                    spinner.text = '⏰  downLoad template...';
                    const _pwd = shell.pwd().stdout;
                    const _projectPath = `${_pwd}/${answers.projectName}`;
                    shell.cd(_pwd);
                    shell.rm('-rf', _projectPath);
                    shell.mkdir(answers.projectName);
                    downLoad(templateUrl, _projectPath, { clone: true }, err => {
                        spinner.stop();
                        if (err) {
                            console.error(`模板下载失败${err.message}`);
                        } else {
                            shell.sed('-i', 'server', answers.projectName, _projectPath + '/package.json');
                        }
                    })
                }
            })
            .catch((error) => {
                if (error.isTtyError) {

                } else {

                }
            });
    },
    json2ts(jsonurl) {
        if (jsonurl) {
            const spinner = ora({ interval: 100 }).start();
            spinner.text = '⏰  开始帮爷,获取接口数据...';
            const jsonContent = {
                code: 1,
                info: {
                    message: "请求成功",
                    data: [{
                        total: 13,
                        title: '001号地板建材'
                    }]
                }
            }
            setTimeout(() => {
                spinner.color = 'yellow';
                spinner.text = '⏰  帮爷,生成数据InterFace中...';
            }, 1000);
            setTimeout(() => {
                //warn
                spinner.succeed('OK');
                console.log(json2ts.convert(JSON.stringify(jsonContent)));
            }, 5000);
        } else {
            console.log(chalk.red('🙏  请输入接口地址 🙏'));
        }
        /**
         * fetch 接口，将返回值传给json2ts，后生成 接口interface ，后可以输出，也可以写入一个文件中
         */
    }
};
program.version(Printer.fromString(txt), '-v,--version');
program.option('init', '🚀 初始化项目');
program.option('json2ts', '🏆 将后台接口生成interface');
program.usage("<cmd> [env]")
    .arguments("<cmd> [env]")
    .action(function (cmd, otherParms) {
        const handle = bindHandler[cmd];
        if (handle) {
            handle(otherParms);
        } else {
            console.log(chalk.yellow('🙇 非常遗憾') + "【 " + chalk.red(cmd) + " 】" + chalk.yellow("敬请期待"));
            console.log(chalk.green('https://github.com/fileRead'));
        }
    })
program.parse(process.argv);

