# Contact Proxy Worker

GitHub Pages 配信のフロントから送信された Contact データを受け取り、  
Worker Secret に保存した `WEB3FORMS_ACCESS_KEY` を使って Web3Forms に中継します。

## セットアップ

```bash
cd workers/contact-proxy
npx wrangler login
npx wrangler secret put WEB3FORMS_ACCESS_KEY
npx wrangler secret put ALLOWED_ORIGINS
npx wrangler deploy
```

`WEB3FORMS_ACCESS_KEY` は `REACT_APP_WEB3FORMS_ACCESS_KEY` / `WEB3_FORMS_ACCESS_KEY` でも読み取り可能です（運用上の命名ゆれ吸収用）。

`ALLOWED_ORIGINS` 例:

```text
https://peace-biz.com,https://peace-biz-corporate-site.pages.dev
```

デプロイ後の Worker URL をフロントの `REACT_APP_CONTACT_API_URL` に設定してください。

## ヘルスチェック

```bash
curl -sS https://<your-worker>.workers.dev/health
```

`ok: true` なら Web3Forms キー設定済みです。  
`ok: false` の場合は Worker Secret 未設定のため、フォームは `Server Misconfigured` で失敗します。

