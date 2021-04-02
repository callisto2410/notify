# Notify

The implementation of simple notifications.

## Installation

To install from **npm**:
```sh
npm i -D @umbrella/notify
```

To install from **GitHub**:
```sh
npm i -D https://github.com/callisto2410/notify.git#v1.0.0
```

## Usage

TypeScript with WebPack:
```ts
import "../node_modules/animate.css/animate.css";
import "../node_modules/@umbrella/notify/notify.css";

import Notify from "@umbrella/notify";

Notify.defaults = {
    duration: 15000,
}

Notify.success("For example, when designing a brochure or book, a designer ...");
```
