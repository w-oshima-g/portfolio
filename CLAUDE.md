# ポートフォリオサイト制作プロジェクト

## プロジェクト概要

ココナラでのWeb制作受注を目的としたポートフォリオ用サンプルサイト群。
5つの異なる業種・デザインのホームページを制作し、既存サーバにアップロードして公開する。
シングルページ・複数ページの両パターンを含み、制作スキルの幅広さをアピールする。

## ページ構成方針

|サイト                        |構成            |理由                   |
|---------------------------|--------------|---------------------|
|カフェ「KOKE COFFEE」           |シングルページ（スクロール）|飲食店はLP的な縦スクロールが主流    |
|美容院「BLANC HAIR」            |複数ページ         |メニュー・スタッフ等ページ分けが自然   |
|建築事務所「FORM architects」     |複数ページ         |実績ページを独立させると本格感が増す   |
|フリーランスエンジニア「Takuya Nishida」|シングルページ（スクロール）|ポートフォリオサイトはSPA風が主流   |
|音楽アーティスト「SORA」             |複数ページ         |ディスコグラフィ・ライブ情報を独立ページに|

## ディレクトリ構成

```
portfolio/
├── CLAUDE.md
│
├── cafe/                          # シングルページ
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│
├── salon/                         # 複数ページ
│   ├── index.html                 # トップ
│   ├── menu.html                  # メニュー・料金
│   ├── staff.html                 # スタッフ紹介
│   ├── access.html                # アクセス
│   ├── contact.html               # お問い合わせ
│   ├── css/
│   │   ├── style.css              # 共通スタイル
│   │   └── pages/                 # ページ別スタイル
│   │       ├── menu.css
│   │       ├── staff.css
│   │       └── contact.css
│   ├── js/
│   │   ├── common.js              # ナビ・共通処理
│   │   └── main.js
│   └── images/
│
├── architect/                     # 複数ページ
│   ├── index.html                 # トップ
│   ├── works.html                 # 実績一覧
│   ├── works-detail.html          # 実績詳細（サンプル1件）
│   ├── about.html                 # 事務所について
│   ├── contact.html               # お問い合わせ
│   ├── css/
│   │   ├── style.css
│   │   └── pages/
│   ├── js/
│   │   ├── common.js
│   │   └── main.js
│   └── images/
│
├── engineer/                      # シングルページ
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│
└── music/                         # 複数ページ
    ├── index.html                 # トップ
    ├── discography.html           # ディスコグラフィ
    ├── live.html                  # ライブ情報
    ├── profile.html               # プロフィール
    ├── contact.html               # お問い合わせ
    ├── css/
    │   ├── style.css
    │   └── pages/
    ├── js/
    │   ├── common.js
    │   └── main.js
    └── images/
```

## 公開URL構成（サーバアップロード後）

```
# カフェ（シングルページ）
https://yourdomain.com/cafe/

# 美容院（複数ページ）
https://yourdomain.com/salon/
https://yourdomain.com/salon/menu.html
https://yourdomain.com/salon/staff.html
https://yourdomain.com/salon/access.html
https://yourdomain.com/salon/contact.html

# 建築事務所（複数ページ）
https://yourdomain.com/architect/
https://yourdomain.com/architect/works.html
https://yourdomain.com/architect/works-detail.html
https://yourdomain.com/architect/about.html
https://yourdomain.com/architect/contact.html

# フリーランスエンジニア（シングルページ）
https://yourdomain.com/engineer/

# 音楽アーティスト（複数ページ）
https://yourdomain.com/music/
https://yourdomain.com/music/discography.html
https://yourdomain.com/music/live.html
https://yourdomain.com/music/profile.html
https://yourdomain.com/music/contact.html
```

## 技術スタック

- **HTML/CSS/JavaScript** ベース（ビルドツール不要・サーバにそのままアップロード可能）
- **CSS**: ファイル分割OK。アニメーション・グリッド・Flexboxを積極活用
- **JS**: Vanilla JSを基本とする。ライブラリはCDN経由で利用可（GSAP・Swiper等）
- **ページ遷移**: 複数ページサイトはfetch + フェードイン/アウトで滑らかに遷移させる
- **画像**: SVGインライン・CSSグラデーション・疑似要素で表現を優先。写真素材はUnsplash等のフリー素材URLを使用
- **フォント**: Google Fonts使用可
- **共通ナビ**: 複数ページサイトはcommon.jsでナビゲーションの現在地ハイライトを制御

## 各サイトの仕様

### 共通ルール

- **レスポンシブ対応必須**: スマホ（375px）・タブレット（768px）・PC（1440px）すべてで崩れないこと
- **モダン・スタイリッシュ**: 全サイト共通のデザイン方針
- **アニメーション**: スクロール連動・ホバーエフェクト等を積極的に取り入れてクオリティを高める
- **コード品質**: セマンティックなHTML・BEM命名規則を意識したCSS
- **ハンバーガーメニュー**: スマホ時は必ずハンバーガーメニューを実装

### サイト1: カフェ「KOKE COFFEE」（シングルページ）

- **URL**: `/cafe/`
- **デザイン**: ダークモダン×ミニマル
- **カラー**: ほぼ黒(#0a0a0a)・クリーム(#f5f0e8)・アクセントに深緑(#2d4a2d)
- **フォント**: Cormorant Garamond（見出し）+ Noto Sans JP（本文）
- **セクション**: Hero / About / Menu / Access / Contact
- **こだわりポイント**: フルスクリーンHero・メニューのホバーエフェクト・parallax風演出・スムーズスクロールナビ

### サイト2: 美容院「BLANC HAIR」（複数ページ）

- **URL**: `/salon/`
- **デザイン**: 白基調・高級感・余白を広く
- **カラー**: ホワイト(#ffffff)・ライトグレー(#f8f8f8)・ゴールド(#c9a84c)
- **フォント**: Playfair Display（見出し）+ Noto Sans JP（本文）
- **ページ遷移**: フェードイン・アウト（0.3s）
- **ページ別内容**:
  - `index.html`: Hero・コンセプト・サービス概要・新着情報
  - `menu.html`: カット・カラー・パーマ等の料金表
  - `staff.html`: スタイリスト紹介カード一覧
  - `access.html`: 地図・アクセス情報・営業時間
  - `contact.html`: お問い合わせフォーム（バリデーション付き）

### サイト3: 建築事務所「FORM architects」（複数ページ）

- **URL**: `/architect/`
- **デザイン**: グリッドレイアウト・無機質・ドイツ的ミニマリズム
- **カラー**: グレー(#888)・ダークネイビー(#1a1a2e)・ホワイト
- **フォント**: Space Grotesk（全体）
- **ページ遷移**: スライド遷移（左→右）
- **ページ別内容**:
  - `index.html`: Hero・フィロソフィー・サービス概要・実績ピックアップ
  - `works.html`: 実績一覧（マソンリーグリッド）
  - `works-detail.html`: 実績詳細ページ（サンプル1件・画像ギャラリー風）
  - `about.html`: 事務所紹介・メンバー・受賞歴
  - `contact.html`: お問い合わせフォーム

### サイト4: フリーランスエンジニア「Takuya Nishida」（シングルページ）

- **URL**: `/engineer/`
- **デザイン**: ダークUI・ターミナル風・テック系
- **カラー**: ダーク(#0d1117)・シアン(#00d4ff)・グリーン(#39ff14)
- **フォント**: JetBrains Mono（コード部分）+ Inter（本文）
- **セクション**: Hero / Skills / Works / Contact
- **こだわりポイント**: タイピングアニメーション・スキルバー・カード型実績一覧・グロー効果

### サイト5: 音楽アーティスト「SORA」（複数ページ）

- **URL**: `/music/`
- **デザイン**: グラデーション・幻想的・没入感
- **カラー**: 黒(#050510)・パープル(#7b2ff7)・ピンク(#ff2d9b)・グロー効果
- **フォント**: Bebas Neue（見出し）+ Noto Sans JP（本文）
- **ページ遷移**: フェードイン・アウト + 軽いスケールアニメーション
- **ページ別内容**:
  - `index.html`: フルスクリーンHero・最新情報・ピックアップ曲
  - `discography.html`: アルバム・シングル一覧（CDジャケット風カード）
  - `live.html`: ライブスケジュール（タイムライン形式）
  - `profile.html`: アーティストプロフィール・バイオグラフィ
  - `contact.html`: お問い合わせ・ファンレター受付フォーム

## 制作順序

1. `cafe/`（シングルページで土台を作る）
1. `salon/`（複数ページの基本パターンを確立）
1. `architect/`
1. `engineer/`
1. `music/`

## サーバへのアップロード方法

1. `portfolio/` 配下の各ディレクトリをサーバのWebルート（`public_html/` など）にFTP/SFTPでアップロード
1. ディレクトリ構造を保ったままアップロードすることでURLが正しく機能する
1. ビルド不要・そのままアップロードで動作する

## 品質チェックリスト（各サイト完成時に確認）

- [ ] スマホ表示（幅375px）で崩れていないか
- [ ] PC表示（幅1440px）で崩れていないか
- [ ] ハンバーガーメニューが動作するか（スマホ）
- [ ] 複数ページサイトはページ遷移アニメーションが動作するか
- [ ] 複数ページサイトはナビの現在地ハイライトが正しいか
- [ ] スクロールアニメーションが動作するか
- [ ] 全セクション・全ページが実装されているか
- [ ] リンク・ボタンのホバーエフェクトがあるか
- [ ] Contactフォームのバリデーションが動作するか
