# Notify

The implementation of simple notifications.

## Installation

```
npm install --save-dev @ordinateio/notify
```

## Usage

```ts
import "@ordinateio/notify/dist/index.css";
import {Notify} from "@ordinateio/notify";

let notify = new Notify({
    duration: 20000,
});

notify.success("For example, when designing a brochure or book, a designer ...");
```
