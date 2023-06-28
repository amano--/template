# Java or C# プログラマが React + Typescript を始める前に知っておいたほうが良いこと

## 前提

筆者は基本Java等を使ったサーバーサイドエンジニアなのだが、縁あってこの1-2年フロントエンドにガッツリ関わるようになり、フロントエンドのアーキテクティングをどのようにしたらよいか、を試行錯誤していました。

そんな中、教育等で Javaプログラマに React + Typescript(以下 TSと略称) の教育をする機会が増えたのですが、Java等オブジェクト指向ベースでの言語のプログラマが引っかかりやすい点、理解しにくい点がうまくまとまった適切な資料が僕の観測範囲ではありませんでした。そのため、自分なりに要点をまとめてみようと思いこの記事を書き始めました。

筆者はフロントエンド専門家ではないし、技術者レベルも高くはないので、適当なことを書き散らしている可能性があるので、適当に読んでもらえると幸いです。

## 古いTS と 新しいTS との違いを理解する

まず一番の罠は class interface enum namespace 等 の キーワードが用意されているがゆえに、オブジェクト指向言語に慣れ親しんだ人たちは、これらキーワードを使用してプログラムを書き始めてしまうことです。これが結構罠です。
現在のTSではこれらキーワードを使わなくてもかけます。というより、これらキーワードは AltJS時代の 古いTypeScript仕様の名残というか、後方互換のために残されているようなものなので、禁止して開発を進めたほうが良いとさえ個人的には思ってます。

さて突然、AltJS時代 とか 古いTypeScript仕様 とかいいましたが、そんなこと言われてもわからん、という人のために、まずはTSの歴史について簡単に触れていこうと思います。

### TS の歴史を簡単に振り返る

TSに関する詳しい歴史的経緯については [ TypeScript誕生の背景 ]( https://book.yyts.org/overview/before-typescript ) を参照してもらうとして、ここでは簡単に触れます。

Typescript は MicroSoft社製で、作者は C#の作者と同じ [アンダース・ヘルスバーグ](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%B3%E3%83%80%E3%83%BC%E3%82%B9%E3%83%BB%E3%83%98%E3%83%AB%E3%82%B9%E3%83%90%E3%83%BC%E3%82%B0) です。そのせいか、Typescript の初期(2014年頃)は とても C# っぽく個人的に感じました。この時代のJSは書きにくく、標準化作業が混乱していたこともあって、JSを書きたくない人たちが別の言語の文法でコードを書き、それらコードをJSに変換して使用するというやり方が流行っていました。それら過程で生まれた言語を総称して AltJS言語(JSの代替となる言語)と呼んだりしていたのですが、その一つの言語として生まれたのが TS です。

その後、関数型言語の流行の影響もあり、それら言語の特徴の一つである Structural Subtyping の機能も TS に取り入れられるようになりました。そのため、現在では Structural Subtypingな型システム(この文章では新しいTSと呼称)と JavaやC#のような Nominal Subtypingな型システム(この文章では古いTSと呼称) が両方を内包する複雑な言語になっています。

Structural Subtyping とか Nominal Subtyping は初めて聞く人も多いのキーワードかと思います。ここらへんの違いを理解していないと新しいTSをうまく扱えなかったりするのですが、実は僕もよくわかってなかったりしますw
とはいえ、それなりには理解できるようになったので、次は自分なりにここらへんの違いを説明してみようかと思います。

## Structural Subtyping(構造的部分型)(TypeScript) と Nominal Subtyping(公称的部分型)(Java等) 違いを理解する

- 参考になるサイト
  - [ 構造的部分型 (structural subtyping)](https://typescriptbook.jp/reference/values-types-variables/structural-subtyping)
  - [ TypeScript: 異なる2つの型システム「公称型」と「構造的部分型」 ]( https://qiita.com/suin/items/52cf80021361168f6b0e )
  - [ Typescript の Structural Subtyping ] (https://qiita.com/tell-k/items/1a93acbb42e39377cd48)
  - [ Nominal and Structural Type Systems ](https://soutaro.hatenablog.com/entry/20060912/1158074146)

以下の型は Java ( Nominal Subtyping ) では別の型だが、Structural Subtyping 目線では同じとみなされます。

```java

interface Foo {
  String foo(int a);
}

interface Bar {
  String foo(int a);
}

```

以下は通る。

```java
Foo foo = new Foo() {
    public String foo(int a) {
        return "foo";
    }
};
```

以下は Java ( Nominal Subtyping ) では当然コンパイルエラーになる。しかし、Structural Subtyping 目線では同じとみなされる。
なぜなら、foo メソッドの引数の型と戻り値の型が同じ(データ構造が同じ)だからです。

```java

Foo foo2 = new Bar() {
    public String foo(int a) {
        return "bar";
    }
};
```

次は TSで 同様の定義をしてみます。まずは関数部分のみに着目した定義。

```typescript
type Foo = (a:number) => string
type Bar = (a:number) => string

const hoge = (a:number) => {return "hoge"}  
// 略記法を使えば const hoge = (a:number) => "hoge"  とも書ける 

const foo:Foo = hoge
const bar:Bar = hoge

const foo2:Foo = bar

```

Java等のクラス記法に寄せて、[オブジェクト型の記法](https://typescriptbook.jp/reference/values-types-variables/object/type-annotation-of-objects)を使って再度定義してみます。

```typescript
type Foo = {foo : (a:number) => string}
type Bar = {foo : (a:number) => string}

// Javaでいうと 無名クラスのインスタンスを生成しているイメージ
const hoge = { foo : (a:number) => {return "hoge"}}

const foo:Foo = hoge
const bar:Bar = hoge

// Bar型とFoo型はクラス構造が同じなので bar インスタンスをFoo型変数に代入できます。
const foo2:Foo = bar

```

さらに Java っぽく書いてみましょう。ちなみにこの書き方は個人的に非推奨です。理由は後で説明します

```ts
interface Foo2 {
  foo(a:number):string
}

class Foo2Impl implements Foo2 {
  foo(a:number):string{
    return "Foo2"
  }
}

// Foo2型 を実装(継承)している Foo2Implクラスは、Foo型とクラス構造が同じなので代入できます。
const foo3:Foo = new Foo2Impl()
```

少しだけTSの文法に触れておきます。[const](https://typescript-jp.gitbook.io/deep-dive/future-javascript/const) は Java だと final と同等と思ってもらえれば、理解しやすいと思います。再代入不可の変数の定義をするときに使うキーワード。ちなみに 代入可能な変数の定義のキーワードは [ let ](https://typescript-jp.gitbook.io/deep-dive/future-javascript/let) ですが、ほぼ使う必要がありません。というよりは、個人的に非推奨に近い扱いだとおもっているので、このキーワードを頻出するプログラムはよくないプログラムと個人的に思います。なので、なるべく const で定義するようにしてみてください。

本格的に Typescript を勉強したい場合は [ 仕事ですぐに使える TypeScript ]( https://future-architect.github.io/typescript-guide/typescript-guide.pdf )
や [サバイバルTypeScript](https://typescriptbook.jp/) がとても参考になるかと思うのでぜひ読んでみてください。

## Nominal Subtyping のキーワード(予約語) はなるべく使わないようにする

長々と説明してきましたが何が言いたいのかというと、C# 由来の Nominal Subtyping用キーワード( class interface enum namespace 等)は、後方互換のため残されていようなものであって、現在のTSでは積極的に使うようなものではなくなっていることを強く意識してほしい、ということです。明確に言われることがあまりないのですが、今の TS ではこれらキーワードをつかわなくても書けます。というより使ってはいけない、と言っても良いでしょう。特にReactのコードを書くならなおさらです。

Reactの登場時(2013年) も、コンポーネントの作り方は classベース、つまり Nominal Subtyping 的な方法で作る方法でしたが、現在では Functional Component (FCと略される) と呼ばれる関数を作る方法に変化しています。React でも、classベースの作り方は後方互換のために残されているだけで、今使うべきは FC になっています。

が、ここでも一つの罠があります。[ 公式のチュートリアル ](https://ja.reactjs.org/tutorial/tutorial.html) が、未だに classベース で書かれているのです。結構まえから関数ベースに書き直す、という話を聞いてはいるのですが2022/6月現在 でも書き直されてはいないようです。現在では全く役に立たないとは言いませんが、ほぼ役に立たない知識なのでやる価値は無いと思うのでお勧めしません。

では、新しいTSではどんなキーワードを使えばよいのでしょうか? 

それは type と const です。

新しいTSでは この２つのキーワードでほぼ書けます。class interface enum とか使いません。特にenumとかマジいらない子です。

ということで、Nominal Subtyping用キーワード は捨て type と const でできるだけ書くことを推奨します。

次は TSのコードを読み解く上で 個人的に重要なのでは? 思っている 宣言空間について説明しようと思います。

## JavaScript(値の世界) と Typescript(型の世界) の世界は明確に別れていることを理解する

とりあえず宣言空間をわかっているふうに書き出してみましたが、ぶっちゃけ 僕もよくわかってませんw 
なので、詳しくは以下を参照してください。

- [ 宣言空間 - TypeScript Deep Dive 日本語版 ]( https://typescript-jp.gitbook.io/deep-dive/project/declarationspaces )
- [ TypeScriptの宣言空間とその不満 ]( https://teppeis.hatenablog.com/entry/2014/04/typescript-declaration-spaces )
- [ こわくないTypeScript〜Mapped TypeもConditional Typeも使いこなせ〜 ]( https://blog.uhy.ooo/entry/2020-08-31/dont-fear-ts/)

ここでは雑に説明していきます。

下記コードはTSとして有効なコードですが、なにか違和感ないですか? 

```ts
type a = string
const a = "hoge"
```

同じ変数名っぽいものをつかって２重に定義しているように見えませんか? Javaとかなら「a という変数名はすでに使われています」的なコンパイルエラーがでてきそうなコードに見えます。
しかしTSでは問題ありません。この違和感は、typeキーワードは TS用で、const は JS用 と認識してみるようにすると、少しやわらぐかもしれません。

上記コードをトランスパイルすると、以下になります

```js
const a = "hoge"
```

type 宣言部分がまるっと消えただけですが、このことは TS→JS トランスパイル後に [ 型消去 (type erasure) ]( https://ja.wikipedia.org/wiki/%E5%9E%8B%E6%B6%88%E5%8E%BB ) されることを意味しています。type で宣言した部分は TSの世界(型情報、型宣言空間)なので、トランスパイル後には消えるけど、constで宣言した部分はJSの世界(値情報、変数宣言空間)なのでは、トランスパイル後にも残るということです。TSの歴史で軽く触れているように、TSが JSの文法の上に型システムを付加している設計、つまり型システムの提供に特化していることを考えれば、後付け、取外し可能なようにきっちり世界を分けて作られているのは当然といえば当然ですね。

では、次はここらへんの 「トランスパイル後は型情報が消去される」ことについて少し深堀りします。

## TSでは Java のリフレクションAPI を使ったようなプログラムは書けない

Java だと以下のように リフレクションAPIを通じて、クラス名(型情報)からインスタンスを生成したり、インスタンスからクラス情報を取得できます。

```java
//クラス名からインスタンスを生成できる。
Class c = Class.forName("hoge.MyClass");

//インスタンスからクラス情報を取得できる。
Something target = new Something();
Class<Something> clazz = target.getClass(); 
```

少し言い換えると、Javaでは クラス名(型の世界)からインスタンス(値の世界)を生成できる、あるいはインスタンス(値の世界)からクラス名(型の世界)を取得できる、つまり値の世界と型の世界はリフレクションAPIを通じてつながっていて、行き来できている状態、といえるでしょう。それが可能なのはコンパイル後のバイトコードに型情報が埋め込まれているからです。

TSではどうでしょうか? 

よく知られている通りTSはJSにトランスパイルされます。Javaで例えるならバイトコードにあたるのがJSといえるので、JSに型情報が埋め込まれない限り値の世界と型の世界は行き来できません。つまり通常だとTS→JS トランスパイル時に 型消去 (type erasure) されるので、値の世界から型情報は取得できません。つまり Javaのように リフレクションAPI を使ったコードが書けません。[typeof 演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/typeof) を使えば、object型なのかプリミティブ型なのか程度の情報は得られますが、リフレクションAPIを使ったコードのようにランタイムから取得したインスタンスから型情報を取得するようなことはできません。

それを TS で実現したい場合は [ reflect-metadata ]( https://github.com/rbuckton/reflect-metadata ) のようなライブラリーを使ってトランスパイル時に、値の世界(JS)に型情報を埋め込む必要がありますが、これもデコレーターという昔から話し合っているけど、いつ決まるのかもよくわからない仕様に依存しているため、現状積極的につかえる状態ではありません。

参考 [ TypeScriptによるデコレータの基礎と実践 ]( https://qiita.com/taqm/items/4bfd26dfa1f9610128bc ) [ Decorators ]( https://www.typescriptlang.org/docs/handbook/decorators.html )

型の世界と値の世界の境界をあまり意識しない Java の世界から来るとここらへんの境界の明確さに結構戸惑うので、型の世界と値の世界が別れていることを意識しながらTSコードを読んだり実装したりすると、いろいろなことに気がつくようになると思います。たとえば以下のようなコードはエラーになりますが、型の世界と値の世界が別れていることを理解していないと意味が理解できないはずです。

```ts
// 値の世界(=JS にトランスパイルされる) への宣言
const hoge = ""

// 以下のコードは  「 'hoge' は値を参照していますが、ここでは型として使用されています。'typeof hoge' を意図していましたか?ts(2749) 」 というエラーになる
// type キーワードは 型の世界(=JSにトランスパイルされない)への宣言なので、値の世界を直接設定できない。そのため値の世界から typeof キーワードで 型情報を抽出する必要がある。
type Fuga = hoge

```

時々この手の理解が困難なエラーメッセージに遭遇しますが、型の世界から、型情報が消去された値の世界(トランスパイル語のJSの世界)を参照しようとしていることが原因なので、型の世界(TS)と値の世界(JS) が分離されていることが理解できれば、謎のエラーへの対応もできるようになると思います。

次は、TSに限らないのですが、TSの 関数型言語的な機能部分を理解しようとすると、代数的データ型(ADT) という謎の概念に遭遇するのでそれについて簡単に触れていこうと思います。
### データ型を代数的に扱えるということとは、どういうことか?

TSに限らないのですが 関数型言語の勉強をすすめていくと、代数的データ型(ADT) という謎概念に遭遇します。調べていくうちに「代数的データ型というものの明確な定義はない」的な説明を見つけたりしてびっくりしたりするのだが、どうやらふわっとしたコンセンサスがなんとなくあるふわっとしたキーワードのようだ。「オブジェクト指向言語」とかの「オブジェクト」的な言葉と個人的に理解したｗ 

参考 [TypeScriptで学ぶ代数的データ型](https://zenn.dev/eagle/articles/ts-coproduct-introduction)

なので、とある勉強会で「代数的データ型(ADT)とはなんですか?」 と質問してみたところ

「簡単にいうと、データ型を代数的に扱えるということ。代数的とは データ型を足したり、かけたりできるということ」

と、個人的に非常に理解のすすむアドバイスを頂きました。そのアドバイスで 割とふわっと理解していた [ Union型（合併型） ](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a#union%E5%9E%8B%E5%90%88%E4%BD%B5%E5%9E%8B) 等のTSの型周りの理解が一気に進みました。

TS の学習を進めていくと [ Intersection型（交差型） ](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a#intersection%E5%9E%8B%E4%BA%A4%E5%B7%AE%E5%9E%8B) や [ Union型（合併型） ](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a#union%E5%9E%8B%E5%90%88%E4%BD%B5%E5%9E%8B) などの謎の型に遭遇します。そうこうしていくうちに [ Conditional Types ](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a#conditional-types) などどいう 童貞を殺す型とかに遭遇し心を折られたりします。

今思えばこれらの型をJavaでいう標準クラスの Collection,List,Map のようなものだと理解しようとしていたから混乱していたのだとわかるのですが、その頃は Nominal脳だったためそういう理解しかできませんでした。今では、

「TSでは 型も計算して算出します」

ということに気がついたので Intersection型（交差型）を算出するための 型と型を掛け算する演算子が 「＆」 で Union型（合併型）を算出するための、型と型を足し算する演算子が「 | 」なだけ、と理解できるようになりました。まあ正しい理解なのかどうかははなはだ怪しいところですがｗ、そんなに大きく間違ってはいないとは思うので、間違ってたらどなたかご指摘ください。
### 型が計算できるとは、どういうことか?

プログラミングを勉強し始めると最初の方で「プログラミングの基本は、 順次、分岐、繰り返し」

同じような定義をJavaとTSで書いてみます。

Java
```java

class Parent {
  private String parent
}

class Child extends Parent {
  private String child
}

```

TS

```ts
type Parent = { parent:string }

type Child = Parent & { child:string }
```

Javaのような Nominal SubTyping の言語から、TS に取り組み始めた当初は class キーワードの代わりに type キーワードを使うのだな、くらいの単純な認識でいたのでイコール記号に違和感があり、「必要なくない？」ぐらいに思っていました。しかし「TSでは、型は計算可能」ということ「型には型の世界(TS)、値には値の世界(JS)がある」ことを理解したあとだと イコール記号 が自然に見えるようになりました。

例えば以下のJSを見てみましょう。

```js
const x = 2
const y = 2
const z = x * y

console.log(z === (2 * 2))
console.log(x * y === (2 * 2))
console.log(4 === (x * y))
console.log(4 === z)
// すべて true が表示される

```

なにを当たり前のコードを、と思われるかもしれません。
次は 型計算をするTSを上記のJSコードに似せて書いてみます。

```ts
type X = { x : string }
type Y = { y : string }

type Z = X & Y

const z : Z = { x : 'foo', y : 'bar' }

const z1 : { x : string } & { y : string } = z
const z2 : { x : string , y : string } = z
```

type X = { x : string } X という名前をつけた型別名(Type Alias)に ｘ というプロパティ名(Javaだとフィールド)で

const が type に変わり、右辺が値情報から型情報に変わっただけで、基本的には同質のことをしています。
ただ、const 以降の文が前記のJSのコードからはかけ離れていますが、それは「この型はこの型と同じ」ということをTSのコードで表現するのはちょっと手のこんだことをする必要があるので、型注釈をつかって同じ型であることをわかるようにしたためです。型注釈(Type Annotation)とは、const z : Z のコロン(:) 以降のTS部分のことです。Javaだと型は基本必須なので前置ですが、TSでは型は省略可能で型推論が可能なので後置です。

伝えたいことは Z と { x : string } & { y : string } と { x : string , y : string } は同じ型である、ということです。Z = X & Y なので XとYをインライン展開したら Z = { x : string } & { y : string }  になるので、同じ型で、計算結果である { x : string , y : string } と、計算式である { x : string } & { y : string } 比較しても当然同じ型になる、というわけです。前述のJSのコードだと「何を当たり前のことを」と思えたコードも、型計算で同様のことをすると「あたり前」には見えなくなったのではないでしょうか？


ここで少し脱線しますが、上記から TSのコードを抜いてみます。
```js
const z = { x : 'foo', y : 'bar'}

const z1 = z
const z2 = z
```

めちゃくちゃシンプルになりましたねw 

### 型別名(Type Alias) は なぜ型名ではなく別名なのか?

### C系言語(Java,C#等) と関数型言語の イコール記号(=) の意味は変わる



 [オブジェクトリテラル]( https://typescriptbook.jp/reference/values-types-variables/object/object-literal ) から型情報は取得できますが、リフレクションAPIを使ったコードのようにランタイムから取得したインスタンスから型情

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


[ TypeScriptにおける型計算の基本 ]( https://qiita.com/recordare/items/58745ef66dd9162e4559 )

[ Typescript -型と関数とクラスとインターフェース- ]( https://www.mushroom-blog.com/371/)
[  ]( )
[  ]( )
[  ]( )
[  ]( )
[  ]( )
[  ]( )
[  ]( )
[  ]( )


型も演算対象であることに気がつく

型には型の演算子がある

## Nominal Subtyping のコードを Structural Subtyping で書き直す方法

```ts
interface MyClass {
  foo(a:number):string
}

class MyClassImpl implements MyClass {
  foo(a:number):string{
    return "MyClassImpl"
  }

}

const instance:MyClass = new MyClassImpl()
```

```typescript
type MyClass = {foo : (a:number) => string}

const instance:MyClass = { foo : (a:number) => {return "MyClassImpl"}} 
```

const MyClass:MyClass = { foo : (a:number) => {return "MyClassImpl"}} 


ちません。 

 が

始まったのですが

や、


、ここらへん明確にしておいたほうが良いと思ったので

か


Structural Subtyping(TypeScript) と Nominal Subtyping(C#) 違いを理解する


```typescript
type Foo = {foo : (a:number) => string}
```

同じ構造に Foo と Bar という <b>別名</b>([type alias](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases))  をつけているので、相互に代入可能なのは当たり前では有るのですが、Nominal脳のままだとちょっと理解に時間がかかる部分だと思う。

Nominal Subtyping だと、クラス名とクラス構造(データ構造と言っても良いかもしれない) が 1対1 なので、クラス名の数だけクラス構造が存在すると言えるが、
Structural Subtyping だと、一つのクラス構造 に対して複数の <b>別名</b> がつくという 1対多 の関係になっている。

ここらへんの違いへの理解が Nominal脳 の人が Structural Subtyping の言語をうまく扱えるようになるための重要なポイントだと個人的に思っている。

[ 集合の代数学 ]( https://ja.wikipedia.org/wiki/%E9%9B%86%E5%90%88%E3%81%AE%E4%BB%A3%E6%95%B0%E5%AD%A6 )

```


```typescript
interface Foo2 {
  foo(a:number):string
}

class Foo2Impl implements Foo2 {
  foo(a:number):string{
    return "Foo3"
  }

}

const foo3:Foo = new Foo2Impl()
```



- Nominal Subtyping    -> 代入できない。 
- Structural Subtyping -> 代入できる。引数と戻り値の型が同じなので、同じ型とみなされる
名前は一つ



## クラス名を捨てる

## = (イコール記号) の意味が違うことに気づく

## 継承関係は 包含関係([部分集合](https://ja.wikipedia.org/wiki/%E9%83%A8%E5%88%86%E9%9B%86%E5%90%88)) へ変わる


## Nominal Subtyping  -> Structural Subtyping 対比表

| Nominal Subtyping | Structural Subtyping  | 備考 | |
| --- | --- | ---  | ---  |
| interface | type |  |
| enum | Union型 or tagged Union| 
| namespace |  | 
| class | const Hoge = {hoge:string} |  |

## 公式チュートリアルが罠


# Java or C# プログラマが React + Typescript で心を折られないために事前に知っておいたほうが良いこと


## クラス名を捨てろ

## 名前を捨てろ

## 公式チュートリアルが罠
