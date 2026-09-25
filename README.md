# 🚀 Getting started with Strapi

## Requirements

- **Node.js 22.12 – 24.x** (required by puppeteer 25 and firebase-admin 14)
- Strapi **5.55.1**, MySQL 8.4

## 🐳 Docker

The image is built on `node:22-bookworm-slim` and uses the system Chromium
(`PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium`) for PDF generation.

```
docker compose build strapi
docker compose up -d
```

## Upgrading

Use the Strapi upgrade tool rather than editing versions by hand:

```
npx @strapi/upgrade minor
```

Do **not** run `npm audit fix --force` — npm's suggested "fix" for the
remaining advisories is a downgrade to Strapi 4. The advisories still listed
by `npm audit` come from dependencies pinned inside Strapi itself
(`qs`, `vite`, `esbuild`, `sharp`, `stream-json`, `react-router`, ...) and
are resolved by upstream Strapi releases.

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
