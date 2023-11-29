- 個人資金 元本保証
- 個人資産

  - 政府給付金 元本保証 個人資金へ変換可能。運用益は公共資産に変換される
  - 今年度予算執行権

- 公共資産

  - 個人で執行できる政府予算。単年度会計。執行されなかった場合、来年に持ち越され、全員に再分配され消える。

- 公的個人資産

  - 政府系コンテストの賞金の支払い先。使用用途が限定、または政府機関による簡易チェックが入る。個人の成長の促進、良質な雇用の創出が目的
    - 居住用住宅購入
    - 学費
    - 起業、運営資金
    - 保険金支払い

- 個人保険資産

  - NISA
  - 小規模共済
  - 確定拠出年金 iDeco

- 公的保険資産

  - 償却資産
  - 積立資産

  - 基礎保険
    - 雇用保険、医療保険、自動車事故保険、火災保険、地震保険

## システム

- デジタル決済管理

- アイデア管理

- 課題管理 Why 管理

  - アイデアソン、ハッカソン進捗管理

    - 仮運用管理
      - 人員の募集、割り当て

  - プロジェクト予算管理 WhatHow 管理
  - 評価管理

- 個人情報管理

  - プロファイル管理
  - 公開情報管理

- 組織管理

  - 企業、NPO 情報管理
  - 地味研、趣味研、社会人部活

- 会計管理

- 成長プラン管理

  - 資産状態に応じた成長プランを提案するシステム

- 学習管理

- その他システム

  - 資料アップ、保存管理システム

    - 公証役場的な確定日付の付与付きのデジタルデータの管理、アイデア保護

  - 防災訓練の祭化

### 購買(purchase)システム

サイズ指定のある商品
配送方法の制限がある

### 境界つけられたコンテキスト(Bounded Context) 候補

おすすめ商品( recommend )

graphql で api を実装

"noErrorTruncation": true 聞いていない問題への対処

インフラ(ブラウザ Fetch 先 DB) 等 ランタイム上のメモリにないものとやり取りする = モック化したいメソッド の集まり
インフラ層実装を用いた単体テストの切替方法の調査

集約をまたいだ整合性をとるコマンドの実装
メッセージの多言語対応のテンプレートリテラル対応

- 何件検索されました的なやつ
  Paged 対応

Page query 実装

スキーマ駆動ベースでのやり方の検証

循環依存の解消

入力 Form の実装
共通コンポーネントの実装

入力バリデーションの実装

商品をカートに追加する
品切れ

コンポーネントの命名規則
XxxPanel

ユーザー操作による状態変化の実装方法
イベントハンドラ内に実装
Hook 分離
fetch hook に mount 時 fetch させないようにする?
renderHook

コンパニオンオブジェクト的な使い方はありか?
コンパニオンオブジェクトパターン

相関チェック

## Open API Schema と Typescript

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

[ TypeScript の型定義からバリデーションコードを生成するツールを書いた ](https://efcl.info/2021/03/26/create-validator-ts/)

[ TypeScript typescript-json-schema generateSchema の例 ](https://typescript.hotexamples.com/jp/examples/typescript-json-schema/-/generateSchema/typescript-generateschema-function-examples.html)
[ ]()
[ ]()
[ ]()
[ ]()
[ ]()
[ ]()
[ ]()
[ ]()
[ ]()
[ ]()
[ ]()
