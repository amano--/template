#!/usr/bin/env zx
$.verbose = true
// [ Google発のJavaScriptで書けるシェル 「zx」 ](https://dev.classmethod.jp/articles/shell-zx/)
// https://github.com/google/zx

// package.json の workspaces から workspace の一覧を作成し npm install コマンドを生成
const wsBaseDirs = await fs
  .readJson('../package.json')
  .then((packageObj) => packageObj.workspaces.packages.map((v) => v.replace('/*', '')).filter((v) => v !== 'configs'))
  .catch((err) => {
    console.error(err)
  })
console.log('wsBaseDirs=', wsBaseDirs)

// await $`cd ..`
// const files = await $`cd .. && find ${wsBaseDirs.join(' ')} -depth 1 -type d`
cd('..')
// const files = await $`find ${wsBaseDirs.join(' ')} -depth 1 -type d`
// console.log(
//   'files=',
//   files.stdout.split('\n').filter((v) => v.length !== 0)
// )

// const files = wsBaseDirs.map((v) => v + '/*/package.json')
// console.log('files=', files)
let workspaceDirsExistPackageJson = (await globby(wsBaseDirs.map((v) => v + '/*/package.json'))).map((v) =>
  v.replace('/package.json', '')
)
console.log('workspaceDirsExistPackageJson=', workspaceDirsExistPackageJson)

// let packages = await globby(['packages/*/package.json'])

// console.log(JSON.stringify(file.data))
// let count = parseInt(await $`ls -1 | wc -l`)
// console.log(`Files count: ${count}`)

// await Promise.all([$`sleep 1; echo 1`, $`sleep 2; echo 2`, $`sleep 3; echo 3`])

// let resp = await fetch('http://wttr.in')
// if (resp.ok) {
//   console.log(await resp.text())
// }

// let name = await question('What is your username? ')
// let token = await question('Choose env variable: ', {
//   choices: Object.keys(process.env),
// })

// console.log(`${name},${token}`)
