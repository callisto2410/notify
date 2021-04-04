# Notify

The implementation of simple notifications.

## Installation
```sh
npm install --save-dev @ordinateio/notify
```

## Usage
```ts
import "./node_modules/animate.css/animate.css";
import "@ordinateio/notify/dist/notify.css";

import Notify from "@ordinateio/notify";

Notify.defaults = {
    duration: 15000,
}

Notify.success("For example, when designing a brochure or book, a designer ...");
```
