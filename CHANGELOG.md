# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.5.0](https://gitlab.pod23.dss.go.th/sspf/sspf-cms/compare/v0.4.0...v0.5.0) (2026-09-26)


### ⚠ BREAKING CHANGES

* Node.js >= 22.12 is now required (puppeteer 25, firebase-admin 14).

### Features

* **docker:** add Dockerfile and docker-compose for strapi + mysql ([4a5cc94](https://gitlab.pod23.dss.go.th/sspf/sspf-cms/commit/4a5cc943ae5b6e025551b5df113f8100fd92cef3))
* **keycloak:** add token exchange and per-user preferences ([591120c](https://gitlab.pod23.dss.go.th/sspf/sspf-cms/commit/591120c0185a5f80bed5a602603644d9b6d7d2ca))
* **pages:** add CMS-managed static pages for the public site ([12f30d9](https://gitlab.pod23.dss.go.th/sspf/sspf-cms/commit/12f30d9be460ca62c18245cd01fedf8f9bc76660))
* **pdf:** implement PDF generation for registration certificates ([06e26f9](https://gitlab.pod23.dss.go.th/sspf/sspf-cms/commit/06e26f9d739971855ebf101fd29bdfc12e8fcef6))


### Bug Fixes

* update strapi to 5.54.0 ([43d2153](https://gitlab.pod23.dss.go.th/sspf/sspf-cms/commit/43d2153d6cd3aed43a23094a1d9c41779a5f0ee2))
* update strapi to 5.55.1 and resolve npm audit advisories ([71650ad](https://gitlab.pod23.dss.go.th/sspf/sspf-cms/commit/71650ad74b0a97bdc3367cbbd890de446724b64c))

## [0.4.0](https://github.com/sspf-dss/sspf-cms/compare/v0.3.0...v0.4.0) (2025-12-12)


### ⚠ BREAKING CHANGES

* 

### Bug Fixes

* update strapi to 5.32.0 ([382c632](https://github.com/sspf-dss/sspf-cms/commit/382c6328953dc1467ba094f83b40f7b762af9b50))

## [0.3.0](https://github.com/sspf-dss/sspf-cms/compare/v0.2.3...v0.3.0) (2025-12-12)


### ⚠ BREAKING CHANGES

* **update-strapi:** 

### Features

* **update-strapi:** update strapi to 5.31.2 ([5522266](https://github.com/sspf-dss/sspf-cms/commit/55222668c0e65b087ef53415919cec7bab17981e))

### [0.2.3](https://github.com/sspf-dss/sspf-cms/compare/v0.2.2...v0.2.3) (2025-07-18)


### Features

* **add cancelled registerstatus:** add CANCELLED RegisterStatus and Update Strapi to 5.18.1 ([c815e63](https://github.com/sspf-dss/sspf-cms/commit/c815e636deede33c610a3f6615ce0d3a02bb77b2))

### [0.2.2](https://github.com/sspf-dss/sspf-cms/compare/v0.2.1...v0.2.2) (2025-07-02)


### Bug Fixes

* comment firestor related ([cc6e0ec](https://github.com/sspf-dss/sspf-cms/commit/cc6e0ecd4a680799badc17696dc12a8d4d45b119))

### [0.2.1](https://github.com/sspf-dss/sspf-cms/compare/v0.2.0...v0.2.1) (2025-07-02)


### Bug Fixes

* **remove firestore import:** remove firestore import ([f662133](https://github.com/sspf-dss/sspf-cms/commit/f662133702f9113c47ca54ed7882fb21e54876b9))

## [0.2.0](https://github.com/sspf-dss/sspf-cms/compare/v0.1.1...v0.2.0) (2025-07-02)


### ⚠ BREAKING CHANGES

* **email for invoice:** .env must provide google authentication / ReportTemplate must include name:
email_invoice

### Features

* **email for invoice:** adding new Schema for ReportTemplate and sending email when upload invoice ([0a23248](https://github.com/sspf-dss/sspf-cms/commit/0a2324887ed90681378e2a3cae6920372d6b2bc0))
* **strapi:** update Strapi to 5.16.0 ([f633741](https://github.com/sspf-dss/sspf-cms/commit/f6337417987db5650cf963f7186727412d888c17))

### 0.1.1 (2025-06-20)
