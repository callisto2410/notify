# Notify

The implementation of simple notifications.

## Installation

To install:
```sh
npm install --save-dev @umbrella/notify
```

## Usage

TypeScript with Webpack:
```ts
import "./node_modules/animate.css/animate.css";

import "@umbrella/notify/dist/notify.css";

import Notify from "@umbrella/notify";

Notify.defaults = {
    duration: 15000,
}

Notify.success("For example, when designing a brochure or book, a designer ...");
```
