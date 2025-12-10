# Changelog
All notable changes to this project will be documented in this file.

---

## [v0.1.53](https://github.com/crenata/bejibun/compare/v0.1.52...v0.1.53) - 2025-12-10

### 🩹 Fixes

### 📖 Changes
#### Upgrade [@bejibun/core](https://github.com/crenata/bejibun-core) to v0.1.60
- Convert `ip` to safe filename for rate limiter.

### ❤️Contributors
- Ghulje ([@ghulje](https://github.com/ghulje))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.52](https://github.com/crenata/bejibun/compare/v0.1.51...v0.1.52) - 2025-12-09

### 🩹 Fixes

### 📖 Changes
#### Upgrade [@bejibun/utils](https://github.com/crenata/bejibun-utils) to v0.1.25
- `Object.serialize(value: any)` Convert object values into actual value, e.g. `{name: ""}` into `{name: null}`.
- `Object.parseFormData(value: any)` Convert form data to object and serialized.

#### Upgrade [@bejibun/core](https://github.com/crenata/bejibun-core) to v0.1.58
- Implement `serialize` and `parseFormData` from [@bejibun/utils](https://github.com/crenata/bejibun-utils) to `BaseController` for cleaner data and more actual data validation.

### ❤️Contributors
- Ghulje ([@ghulje](https://github.com/ghulje))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.51](https://github.com/crenata/bejibun/compare/v0.1.50...v0.1.51) - 2025-12-05

### 🩹 Fixes
- Hang, when redis not connected - [#7](https://github.com/crenata/bejibun-core/issues/7)
- Handling for invalid syntax validation - [#8](https://github.com/crenata/bejibun-core/issues/8)
- Body serialize for empty form data field - [#9](https://github.com/crenata/bejibun-core/issues/9)

#### [@bejibun/utils](https://github.com/crenata/bejibun-utils)
- Empty validation for file - [#1](https://github.com/crenata/bejibun-utils/issues/1)

### 📖 Changes
#### Upgrade [@bejibun/utils](https://github.com/crenata/bejibun-utils) to v0.1.23
- Empty validation for file

#### Upgrade [@bejibun/cache](https://github.com/crenata/bejibun-cache) to v0.1.12
- Adding `local` connection for file schema.

Now, [@bejibun/cache](https://github.com/crenata/bejibun-cache) has local and redis for cache system.
If the connection use local, this will cache data as file on storage/cache.

### ❤️Contributors
- Havea Crenata ([@crenata](https://github.com/crenata))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.50](https://github.com/crenata/bejibun/compare/v0.1.49...v0.1.50) - 2025-11-29

### 🩹 Fixes
- Body parser for multiple keys - [#2](https://github.com/crenata/bejibun-core/issues/2)
- x402 on nester router - [#3](https://github.com/crenata/bejibun-core/issues/3)
- Storage directory undefined - [#4](https://github.com/crenata/bejibun-core/issues/4)
- Unknown actual error on runtime exception - [#5](https://github.com/crenata/bejibun-core/issues/5)

### 📖 Changes
- Storage adjustment: random string filename.

### ❤️Contributors
- Havea Crenata ([@crenata](https://github.com/crenata))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.49](https://github.com/crenata/bejibun/compare/v0.1.48...v0.1.49) - 2025-11-24

### 🩹 Fixes

### 📖 Changes
What's New :
- Adding `Rate Limiter` to limit any action in a certain time.

Available `Rate Limiter` functions :
- `.attempt(key, limit, callback, duration)` throw an error if limit reached.
- `.tooManyAttempts(key, limit, duration)` method to check if limit has reached.
- `.clear(key)` reset the counter.

### ❤️Contributors
- Havea Crenata ([@crenata](https://github.com/crenata))
- Ghulje ([@ghulje](https://github.com/ghulje))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.48](https://github.com/crenata/bejibun/compare/v0.1.47...v0.1.48) - 2025-11-09

### 🩹 Fixes

### 📖 Changes
What's New :

Cache with Redis, currently only redis.

- `.remember()` Fetch data from cache if exists
- `.has()` Check if cache exists
- `.get()` Fetch data from cache
- `.add()` Insert data to cache, will return false if cache is already exists
- `.put()` Update cache data
- `.forget()` Delete cache

### ❤️Contributors
- Havea Crenata ([@crenata](https://github.com/crenata))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.47](https://github.com/crenata/bejibun/compare/v0.1.46...v0.1.47) - 2025-11-04

### 🩹 Fixes

### 📖 Changes
What's New :

Everyone can create their own packages,
and now `Bejibun` support for commands from external packages
and can be added to `config/command.ts`.

```ts
const config: Array<Record<string, any>> = [
    /*
    {
        path: "your-dependencies/your-directory-commands",
        path: "@bejibun/database/commands" // Example
    }
    */
];

export default config;
```

Or the external package itself can automatically add them to `config/command.ts`
using the configuration package by creating `configure.ts` in your package root.

When the user runs `bun ace install your-package` it will automatically run the configuration package.

So when user runs `bun ace` your command will appear in the list.

### ❤️Contributors
- Ghulje ([@ghulje](https://github.com/ghulje))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.46](https://github.com/crenata/bejibun/compare/v0.1.45...v0.1.46) - 2025-10-27

### 🩹 Fixes

### 📖 Changes
What's New :
- Adding `make:command <file>` to create a new command file
- Adding `make:controller <file>` to create a new controller file
- Adding `make:middleware <file>` to create a new middleware file
- Adding `make:model <file>` to create a new model file
- Adding `make:validator <file>` to create a new validator file

### ❤️Contributors
- Havea Crenata ([@crenata](https://github.com/crenata))
- Ghulje ([@ghulje](https://github.com/ghulje))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.45](https://github.com/crenata/bejibun/compare/v0.1.44...v0.1.45) - 2025-10-21

### 🩹 Fixes

### 📖 Changes
What's New :
- Move exception handler into `@bejibun/core` and extends to it
- Move `server.ts` into `@bejibun/core`
- Restructure routes directory

Chore :
- Rename `process.env` to `Bun.env`

### ❤️Contributors
- Havea Crenata ([@crenata](https://github.com/crenata))
- Ghulje ([@ghulje](https://github.com/ghulje))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.44](https://github.com/crenata/bejibun/compare/v0.1.43...v0.1.44) - 2025-10-19

### 🩹 Fixes

### 📖 Changes
What's New :
- Now, you can add your own commands on `commands` directory

### ❤️Contributors
- Havea Crenata ([@crenata](https://github.com/crenata))
- Ghulje ([@ghulje](https://github.com/ghulje))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.43](https://github.com/crenata/bejibun/compare/v0.1.42...v0.1.43) - 2025-10-18

### 🩹 Fixes

### 📖 Changes
What's New :
- Move `ace` into `@bejibun/core` package

### ❤️Contributors
- Havea Crenata ([@crenata](https://github.com/crenata))
- Ghulje ([@ghulje](https://github.com/ghulje))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.42](https://github.com/crenata/bejibun/compare/v0.1.41...v0.1.42) - 2025-10-14

### 🩹 Fixes

### 📖 Changes
What's New :
- Move base class into `@bejibun/core` package
- Integrate with `@bejibun/core` package

### ❤️Contributors
- Havea Crenata ([@crenata](https://github.com/crenata))
- Ghulje ([@ghulje](https://github.com/ghulje))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.41](https://github.com/crenata/bejibun/compare/v0.1.4...v0.1.41) - 2025-10-12

### 🩹 Fixes

### 📖 Changes
What's New :
- Move redis into `@bejibun/redis` package
- Move enum, str, and some utils to `@bejibun/core` package

### ❤️Contributors
- Havea Crenata ([@crenata](https://github.com/crenata))
- Ghulje ([@ghulje](https://github.com/ghulje))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.4](https://github.com/crenata/bejibun/compare/v0.1.3...v0.1.4) - 2025-10-12

### 🩹 Fixes

### 📖 Changes
What's New :
- Redis

Available Redis :
- `.connection()` Multiple redis services
- `.get()` Get value stored on redis
- `.set()` Set value to redis
- `.del()` Delete value stored on redis
- `.subscribe()` Subscribe redis event
- `subcriber.unsubscribe()` Unsubscribe redis event
- `.publish()` Publish messages to subscriber
- `.pipeline()` Redis pipeline
- `.on()` Subscribe events for `connect` | `disconnect` | `error` 
- `.off()` Unsubscribe events for `connect` | `disconnect` | `error` 
- `.connect()` Manually connect to redis
- `.disconnect()` Manually disconnect from redis, will close all connections if not specify connection name

### ❤️Contributors
- Havea Crenata ([@crenata](https://github.com/crenata))
- Ghulje ([@ghulje](https://github.com/ghulje))

**Full Changelog**: https://github.com/crenata/bejibun/blob/master/CHANGELOG.md

---

## [v0.1.3](https://github.com/crenata/bejibun/compare/v0.1.2...v0.1.3) - 2025-10-11

### 🩹 Fixes

### 📖 Changes
What's New :
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
What's New :
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