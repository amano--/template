#!/usr/bin/env zx
$.verbose = true
// [ Google発のJavaScriptで書けるシェル 「zx」 ](https://dev.classmethod.jp/articles/shell-zx/)
// https://github.com/google/zx

const schemaUrl = 'schema/schema.json'
// 'https://petstore.swagger.io/v2/swagger.json'

$`rm -rf ./auto`

// gen by https://github.com/aspida/openapi2aspida
$`npx openapi2aspida -i ${schemaUrl} -o ./auto/openapi/aspida/`

// gen by https://github.com/ferdikoomen/openapi-typescript-codegen
// $`npx openapi -i ${schemaUrl} -o ./auto/openapi/ts-codegen/`
