# NgxCapacitorHttp

<p align="center">
  <a href="https://www.npmjs.com/package/ngx-capacitor-http"><img src="https://img.shields.io/npm/l/ngx-capacitor-http?style=flat-square" /></a>
<br>
  <a href="https://www.npmjs.com/package/ngx-capacitor-http"><img src="https://img.shields.io/npm/dw/ngx-capacitor-http?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/ngx-capacitor-http"><img src="https://img.shields.io/npm/v/ngx-capacitor-http?style=flat-square" /></a>
</p>

This plugin enables developers to use the Angular Http API for building their applications, while benefiting from performant native http calls using [`@capacitor-community/http`](https://github.com/capacitor-community/http) when running in the Capacitor runtime.

This allows developers to use mechanisms such as Angular interceptors and proxies to modify outgoing requests without writing platform specific code.

> ⚠️ Capacitor 4.3 introduces Native HTTP support. Projects on `@capacitor/core@4.3` and later do not need to use this Angular plugin.

### Installation

```bash
npm install ngx-capacitor-http
npx cap sync
```

> You will need to install peer-dependencies for `@ionic/angular@^6.0.0` and `@capacitor-community/http@^1.4.1`.

### Usage

To use the plugin, add the module import in your main `AppModule`:

```ts
import { NgxCapacitorHttpModule } from 'ngx-capacitor-http';

@NgModule({
  imports: [NgxCapacitorHttpModule],
})
export class AppModule {}
```

Alternatively you can manually specify the order of the provider in your module:

```ts
import { CapacitorHttpProvider } from 'ngx-capacitor-http';

@NgModule({
  providers: [CapacitorHttpProvider],
})
export class AppModule {}
```

> Note: This library currently only supports HTTP methods. It does not currently handle the Capacitor implementation for download and upload. You will want to manually import the library API in your project for those usages.

### How it works

Using Angular interceptors, at the time of request we validate which runtime the code is executing in. If the runtime is Capacitor, we forward the request data through `@capacitor-community/http` and to the native device layer to perform the request in the background of the WebView application. If the runtime is any other target, such as in a web browser, the request is unmodified and passed to the stock Angular implementation for http requests.

![Diagram](https://github.com/sean-perkins/ngx-capacitor-http/blob/main/.github/NgxCapacitorHttp.png?raw=true)
