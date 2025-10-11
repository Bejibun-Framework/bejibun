# Changelog
All notable changes to this project will be documented in this file.

---

## [v0.1.3](https://github.com/crenata/bejibun/compare/v0.1.2...v0.1.3) - 2025-10-11

### 🩹 Fixes

### 📖 Changes
New Features :
- Adding router for http methods, e.g. `Router.get("get", "TestController@get")`
- Now, router group support object and array

Chore :
- Rename `CorsMethodEnum` to `HttpMethodEnum`
- Move some types to global
- Adding `RouterInvalidException` exception

### ❤️Contributors
- Havea Crenata ([@crenata](https://github.com/crenata))
- Ghulje ([@ghulje](https://github.com/ghulje))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.2](https://github.com/crenata/bejibun/compare/v0.1.1...v0.1.2) - 2025-10-10

### 🩹 Fixes

### 📖 Changes
Refactors :
- Adding builders for some utils
- Change some utils from new instance based to static calls

### ❤️Contributors
- Havea Crenata ([@crenata](https://github.com/crenata))
- Ghulje ([@ghulje](https://github.com/ghulje))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.1](https://github.com/crenata/bejibun/compare/v0.1.0...v0.1.1) - 2025-10-09

### 🩹 Fixes

### 📖 Changes
New Feature :
- Adding cors config
- Handle cors routing for preflight

### ❤️Contributors
- Havea Crenata ([@crenata](https://github.com/crenata))
- Ghulje ([@ghulje](https://github.com/ghulje))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.0](https://github.com/crenata/bejibun/compare/v0.1.0...v0.1.0) - 2025-10-08

### 🩹 Fixes

### 📖 Changes
First release of Bejibun

A typescript framework that run on [Bun](https://bun.com) runtime.

- Adding controllers and base controller
- Adding exceptions handler
- Adding middlewares
- Adding models and base model
- Adding validators and base validator
- Adding config (currently only for database)
- Adding migrations and seeders
- Adding routing

### ❤️Contributors
- Havea Crenata ([@crenata](https://github.com/crenata))
- Ghulje ([@ghulje](https://github.com/ghulje))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md