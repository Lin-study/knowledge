``` javascript
/**
 *  文件的作用： 用于对比node和npm的版本是否合适（版本号的更改在package.json里面）
 */

// 修改终端的字体颜色
var chalk = require('chalk')
// 下面这个是semver插件，是用来对特定的版本号做判断的，比如
// semver.gt('1.2.3','9.8.7') false 1.2.3版本比9.8.7版本低
// semver.satisfies('1.2.3','1.x || >=2.5.0 || 5.0.0 - 7.2.3') true 1.2.3的版本符合后面的规则
var semver = require('semver')
// 引入packageConfig.json中的（这个文件中用于获取node和npm的版本号）
var packageConfig = require('../package.json')
// 下面这个插件是shelljs，作用是用来执行Unix系统命令
var shell = require('shelljs')

function exec(cmd) {
  // 脚本可以通过 child_process 模块新建子进程，从而执行 Unix 系统命令
  // 下面这段代码实际就是把cmd这个参数传递的值转化成前后没有空格的字符串，也就是版本号
  return require('child_process').execSync(cmd).toString().trim()
}

var versionRequirements = [{
  name: 'node',
  // 使用smever插件将版本信息格式化
  currentVersion: semver.clean(process.version),
  // 对比node的版本
  versionRequirement: packageConfig.engines.node
}, ]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    // 通过执行npm --version命令将参数返回给exec并获取版本号
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function() {
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    // 当版本不合适时，发出警告
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
```

