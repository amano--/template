#!/usr/bin/env zx
$.verbose = true
// [ Google発のJavaScriptで書けるシェル 「zx」 ](https://dev.classmethod.jp/articles/shell-zx/)
// https://github.com/google/zx

$`yarn openapi -i https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore-expanded.json -o ./auto/openapi-ts-codegen/`
