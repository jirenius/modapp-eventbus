<a name="EventBus"></a>

## EventBus
EventBus is a bus for subscribing to and emitting events.

**Kind**: global class  

* [EventBus](#EventBus)
    * [new EventBus()](#new_EventBus_new)
    * _instance_
        * [.on([target], events, handler, [namespace])](#EventBus+on) ⇒ <code>this</code>
        * [.off([target], events, [handler], [namespace])](#EventBus+off) ⇒ <code>this</code>
        * [.emit([target], event, [data], [namespace])](#EventBus+emit) ⇒ <code>this</code>
    * _inner_
        * [~eventCallback](#EventBus..eventCallback) : <code>function</code>

<a name="new_EventBus_new"></a>

### new EventBus()
Creates an event bus.

<a name="EventBus+on"></a>

### eventBus.on([target], events, handler, [namespace]) ⇒ <code>this</code>
Attach an event handler function for one or more events.

**Kind**: instance method of [<code>EventBus</code>](#EventBus)  

| Param | Type | Description |
| --- | --- | --- |
| [target] | <code>object</code> | An optional target object. The handler will only be called if target matches the target of the emitted event. |
| events | <code>string</code> | One or more space-separated events (eg. 'disconnect'). Null or empty means any event. |
| handler | [<code>eventCallback</code>](#EventBus..eventCallback) | A function to execute when the event is emitted. |
| [namespace] | <code>string</code> | Namespace string that will be added, separated with a dot, to every event name. If no events is null, only events with that namespace will be affected. |

<a name="EventBus+off"></a>

### eventBus.off([target], events, [handler], [namespace]) ⇒ <code>this</code>
Remove an event handler.

**Kind**: instance method of [<code>EventBus</code>](#EventBus)  

| Param | Type | Description |
| --- | --- | --- |
| [target] | <code>object</code> | An optional target object. The handler will only be removed if target matches the target of the handler. |
| events | <code>string</code> | One or more space-separated events (eg. 'disconnect'). Null or empty means any event. |
| [handler] | <code>function</code> | An option handler function. The handler will only be remove if it is the same handler. |
| [namespace] | <code>string</code> | Namespace string that will be added, separated with a dot, to every event name. |

<a name="EventBus+emit"></a>

### eventBus.emit([target], event, [data], [namespace]) ⇒ <code>this</code>
Emits an event and triggers the base handler to be called, followed by any other handler bound.

**Kind**: instance method of [<code>EventBus</code>](#EventBus)  

| Param | Type | Description |
| --- | --- | --- |
| [target] | <code>object</code> | Target object of the event |
| event | <code>string</code> | Name of the event. May include the namespace, if the namespace parameter is not provided. |
| [data] | <code>object</code> | Event data object. May be modified by the base handler, but shouldn't be changed any other handler. |
| [namespace] | <code>string</code> | Namespace string that will be added, separated with a dot, before the event name. |

<a name="EventBus..eventCallback"></a>

### EventBus~eventCallback : <code>function</code>
Event callback

**Kind**: inner typedef of [<code>EventBus</code>](#EventBus)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Event data object |
| target | <code>object</code> | Target object |
| event | <code>string</code> | Event name including namespace |
| action | <code>string</code> | Event action. This is the suffix of the event being listened to, or null if listening to the actual event. |

