# Changelog

All notable changes to this project will be documented in this file.

## [2.2.0](https://github.com/lbwa/vas.js/compare/v2.1.0...v2.2.0) (2019-09-21)


### Features

* **DPR:** support hight resolution adaptation ([081d8f3](https://github.com/lbwa/vas.js/commit/081d8f3)), closes [/github.com/chartjs/Chart.js/blob/v2.8.0/src/core/core.helpers.js#L527-L537](https://github.com/lbwa//github.com/chartjs/Chart.js/blob/v2.8.0/src/core/core.helpers.js/issues/L527-L537)

## [2.1.0](https://github.com/lbwa/vas.js/compare/v2.0.0...v2.1.0) (2019-09-15)


### Bug Fixes

* **helper:** correct border center coordinates ([98263fc](https://github.com/lbwa/vas.js/commit/98263fc))


### Features

* **core:** cache startX value ([3c98928](https://github.com/lbwa/vas.js/commit/3c98928))
* **core:** implement custom period ([ecbce22](https://github.com/lbwa/vas.js/commit/ecbce22))
* implement destruction functionality ([9cd89ad](https://github.com/lbwa/vas.js/commit/9cd89ad))
* perform correction based on whether period is even num ([c79c1e6](https://github.com/lbwa/vas.js/commit/c79c1e6))

## [2.0.0](https://github.com/lbwa/vas.js/compare/v1.2.0...v2.0.0) (2019-09-14)


### Features

* **Vas:** rebuild render loop, implement 'render' option ([de8e0e4](https://github.com/lbwa/vas.js/commit/de8e0e4))

## [1.2.0](https://github.com/lbwa/vas.js/compare/v1.1.1...v1.2.0) (2019-07-10)


### Build System

* minify online html file ([ae151cb](https://github.com/lbwa/vas.js/commit/ae151cb))


### Features

* implement background customization ([ca02bf5](https://github.com/lbwa/vas.js/commit/ca02bf5))



### [1.1.1](https://github.com/lbwa/vas.js/compare/v1.1.0...v1.1.1) (2019-07-10)


### Build System

* indicate the main declaration file in package.json ([#4](https://github.com/lbwa/vas.js/issues/4)) ([12e56d9](https://github.com/lbwa/vas.js/commit/12e56d9))



## [1.1.0](https://github.com/lbwa/vas.js/compare/v1.0.0...v1.1.0) (2019-07-09)


### Build System

* modify tsconfig ([8d126c8](https://github.com/lbwa/vas.js/commit/8d126c8))
* use rollup rather than webpack for lightwight bundle ([a4af2e6](https://github.com/lbwa/vas.js/commit/a4af2e6))



## [1.0.0](https://github.com/lbwa/vas.js/compare/v1.0.0-beta.0...v1.0.0) (2019-07-09)


### Bug Fixes

* offset should be ignored when speed option set ([bf75d1f](https://github.com/lbwa/vas.js/commit/bf75d1f))


### Features

* add index.d.ts ([dbf1ae2](https://github.com/lbwa/vas.js/commit/dbf1ae2))
* remove redundant type-judgement function ([4d70009](https://github.com/lbwa/vas.js/commit/4d70009))
* support inversive control ([d24bb5a](https://github.com/lbwa/vas.js/commit/d24bb5a))



## [1.0.0-beta.0](https://github.com/lbwa/vas.js/compare/v1.0.0-alpha.0...v1.0.0-beta.0) (2019-07-08)


### Features

* support static waves when speed is zero ([#1](https://github.com/lbwa/vas.js/issues/1)) ([6929cfc](https://github.com/lbwa/vas.js/commit/6929cfc))



## [1.0.0-alpha.0](https://github.com/lbwa/vas.js/compare/v0.4.1...v1.0.0-alpha.0) (2019-07-07)


### Build System

* mutate global library name ([0b3a0c9](https://github.com/lbwa/vas.js/commit/0b3a0c9))
* set up dev server via webpack-dev-server ([b722550](https://github.com/lbwa/vas.js/commit/b722550))


### Features

* **core:** implement shape container ([cd48182](https://github.com/lbwa/vas.js/commit/cd48182))
* implement `waves` API ([1c32cff](https://github.com/lbwa/vas.js/commit/1c32cff))
* implement animation stepper ([fcab4e8](https://github.com/lbwa/vas.js/commit/fcab4e8))
* implement circle renderer ([dde3b69](https://github.com/lbwa/vas.js/commit/dde3b69))
* implement sine-like drawing ([e15e144](https://github.com/lbwa/vas.js/commit/e15e144))
* initialize ([00acc83](https://github.com/lbwa/vas.js/commit/00acc83))
* support multiple fluid shapes in same scene ([1521e16](https://github.com/lbwa/vas.js/commit/1521e16))
* support multiple speed for every flowing fluid ([960ffc8](https://github.com/lbwa/vas.js/commit/960ffc8))
