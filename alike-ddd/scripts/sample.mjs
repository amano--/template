#!/usr/bin/env zx

// [ Google発のJavaScriptで書けるシェル 「zx」 ](https://dev.classmethod.jp/articles/shell-zx/)
// https://github.com/google/zx

console.log('Hello zx!')

let count = parseInt(await $`ls -1 | wc -l`)
console.log(`Files count: ${count}`)

await Promise.all([$`sleep 1; echo 1`, $`sleep 2; echo 2`, $`sleep 3; echo 3`])

let resp = await fetch('http://wttr.in')
if (resp.ok) {
  console.log(await resp.text())
}

let name = await question('What is your username? ')
let token = await question('Choose env variable: ', {
  choices: Object.keys(process.env),
})

console.log(`${name},${token}`)
