# modstrap-notify

The implementation of notifications.

## Installation

To install a specific version:
```shell script
npm i https://github.com/callisto2410/modstrap-notify.git#v1.0.0
```

To install the current version:
```shell script
npm i https://github.com/callisto2410/modstrap-notify.git
```

## Usage

TypeScript
```ts
import Notify from "@modstrap/notify";

Notify.defaults = {
    duration: 15000,
}

Notify.success("For example, when designing a brochure or book, a designer ...");
```
