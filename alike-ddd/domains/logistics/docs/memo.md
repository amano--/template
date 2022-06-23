
[ QuickType ](https://github.com/quicktype/quicktype)

```json
"scripts": {
  "qt": "npx quicktype schema/quickType/schemaForQuicktype.ts -o schema/models/logistics.json --lang schema",
  "tjs": "npx typescript-json-schema  schema/quickType/schemaForQuicktype.ts logisticsSchema",
}
```

[ typescript-json-schema ](https://github.com/YousefED/typescript-json-schema)

npm i typescript-json-schema -D

[ TypeScript, JSON Schema, Ajv の組み合わせを考える ](https://blog.ojisan.io/typescript-json-schema-ajv/)

[ TypeScriptの型定義からバリデーションコードを生成するツールを書いた ](https://efcl.info/2021/03/26/create-validator-ts/)

```
 npx quicktype schema/from_ts/schemaForQuickType.ts -o schema/models/madeByQuickType.json --lang schema
 npx typescript-json-schema  schema/from_ts/schema.ts DeliveryOrder --topRef --title
 npx typescript-json-schema  schema/from_ts/schema.ts DeliveryOrder -o schema/models/dataTypesFromTJS.json --topRef --titles 
```

[OpenAPI TypeScript Code GeneratorをASTを利用して作成しました](https://himenon.github.io/docs/press-release/openapi-typescript-code-generator/)

https://github.com/Himenon/openapi-typescript-code-generator

自作の Template をベースにコードを生成したい場合は良さそう。[サンプル](https://raw.githubusercontent.com/Himenon/github-rest-api-client/master/source/ghes-3.0.ts) をみるかぎりenum を Union型にできてる。ドメインオブジェクトの名前に $ export interface license$simple 

npx json-schema-to-openapi-schema convert schema/models/dataTypesFromTJS.json


[  ]()
[  ]()
[  ]()
[  ]()
[  ]()
[  ]()
[  ]()
[  ]()
[  ]()
[  ]()
[  ]()
[  ]()
