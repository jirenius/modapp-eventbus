[![view on npm](http://img.shields.io/npm/v/modapp-eventbus.svg)](https://www.npmjs.org/package/modapp-eventbus)

# ModApp EventBus

EventBus used for implementing modapp's [Model interface](https://github.com/jirenius/modapp/blob/master/docs/docs.md#Model), [Collection interface](https://github.com/jirenius/modapp/blob/master/docs/docs.md#Model), and [LocaleString interface](https://github.com/jirenius/modapp/blob/master/docs/docs.md#LocaleString).

## Installation

With npm:
```sh
npm install modapp-eventbus --save
```

With yarn:
```sh
yarn add modapp-eventbus
```

## Usage

```javascript
import eventBus from 'modapp-eventbus';

let callback = data => {
	console.log("data");
};

// Add event listener
eventBus.on('client.disconnect', cb);

// Emit an event
eventBus.emit('client.disconnect', /* data */ { foo: "bar" });

// Remove event listener
eventBus.off('client.disconnect', cb);
```

## Documentation

[Markdown documentation](https://github.com/jirenius/modapp-eventbus/blob/master/docs/docs.md)
