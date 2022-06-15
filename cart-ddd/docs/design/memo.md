
### 購買(purchase)システム

サイズ指定のある商品
配送方法の制限がある

### 境界つけられたコンテキスト(Bounded Context) 候補

おすすめ商品( recommend )

graphql で apiを実装

"noErrorTruncation": true 聞いていない問題への対処

インフラ(ブラウザ Fetch先 DB) 等 ランタイム上のメモリにないものとやり取りする = モック化したいメソッド の集まり
インフラ層実装を用いた単体テストの切替方法の調査

集約をまたいだ整合性をとるコマンドの実装
メッセージの多言語対応のテンプレートリテラル対応
  - 何件検索されました的なやつ
Paged対応
  

Page query 実装

スキーマ駆動ベースでのやり方の検証

循環依存の解消

入力Formの実装
  共通コンポーネントの実装

入力バリデーションの実装

商品をカートに追加する
  品切れ
  キャンペーン中
  タイムセール中
  
コンポーネントの命名規則
  XxxPanel


ユーザー操作による状態変化の実装方法
  イベントハンドラ内に実装
  Hook分離
    fetch hook に mount 時 fetch させないようにする?
  renderHook
  
コンパニオンオブジェクト的な使い方はありか?
コンパニオンオブジェクトパターン


## Open API Schema とTypescript

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

[ TypeScript typescript-json-schema generateSchemaの例 ](https://typescript.hotexamples.com/jp/examples/typescript-json-schema/-/generateSchema/typescript-generateschema-function-examples.html)
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
