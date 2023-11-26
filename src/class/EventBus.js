const rm = function(hs, t, h, strict) {
	if (hs) {
		var e, i = hs.length;
		while (i--) {
			e = hs[i];
			if ((e.t === t || (t === null && !strict)) && (h === e.h || (h === null && !strict))) {
				hs.splice(i, 1);
				if (strict) {
					return true;
				}
			}
		}
	}
	return !strict;
};

/**
 * Event callback
 * @callback EventBus~eventCallback
 * @param {?object} data Event data object
 * @param {object} target Target object
 * @param {string} event Event name including namespace
 * @param {?string} action Event action. This is the suffix of the event being listened to, or null if listening to the actual event.
 */

/**
 * EventBus is a bus for subscribing to and emitting events.
 */
class EventBus {

	/**
	 * Creates an event bus.
	 */
	constructor() {
		this._evs = {};
		this._qh = null;
	}

	/**
	 * Attach an event handler function for one or more events.
	 * @param {object} [target] An optional target object. The handler will only be called if target matches the target of the emitted event.
	 * @param {?string} events One or more space-separated events (eg. 'disconnect'). Null or empty means any event.
	 * @param {EventBus~eventCallback} handler A function to execute when the event is emitted.
	 * @param {string} [namespace] Namespace string that will be added, separated with a dot, to every event name. If no events is null, only events with that namespace will be affected.
	 * @returns {this}
	 */
	on(target, events, handler, namespace) {
		var i, hs, name, h;

		// Detect optional parameters
		if (typeof events == 'function') {
			// (events, handler, namespace)
			namespace = handler;
			handler = events;
			events = target;
			target = null;
		}

		h = { t: target || null, h: handler };

		if (!events) {
			name = namespace || "";

			hs = this._evs[name];
			if (!hs) {
				this._evs[name] = [ h ];
			} else {
				hs.push(h);
			}

		} else {
			namespace = namespace ? namespace + '.' : '';

			// Handle multiple events separated by a space
			events = events.match(/\S+/g) || [];

			for (i = 0; i < events.length; i++) {
				name = namespace + events[i];

				hs = this._evs[name];
				if (!hs) {
					this._evs[name] = [ h ];
				} else {
					hs.push(h);
				}
			}
		}

		return this;
	}

	/**
	 * Remove an event handler.
	 * @param {object} [target] An optional target object. The handler will only be removed if target matches the target of the handler.
	 * @param {?string} events One or more space-separated events (eg. 'disconnect'). Null or empty means any event.
	 * @param {function} [handler] An option handler function. The handler will only be remove if it is the same handler.
	 * @param {string} [namespace] Namespace string that will be added, separated with a dot, to every event name.
	 * @param {boolean} [strict] Flag for strict mode where an error will be thrown if the handler doesn't exist.
	 * @returns {this}
	 */
	off(target, events, handler, namespace, strict) {
		var i, hs, name;

		// Detect optional parameters
		if (target === null || typeof target == 'string') {
			// (events, handler, namespace)
			strict = namespace;
			namespace = handler;
			handler = events;
			events = target;
			target = null;
		}

		if (!events) {
			events = [ namespace || "" ];
			namespace = "";
		} else {
			namespace = namespace ? namespace + '.' : '';
			// Handle multiple events separated by a space.
			events = events.match(/\S+/g) || [];
		}

		for (i = 0; i < events.length; i++) {
			name = namespace + events[i];

			hs = this._evs[name];
			if (!rm(hs, target, handler, strict)) {
				let err = new Error("Event handler not found");
				console.error(err, { target: target, events: events, handler: handler, namespace: namespace });
				throw err;
			}
			// No event handlers for event
			if (!hs) {
				continue;
			}
			// Delete array if empty
			if (!hs.length) {
				delete this._evs[name];
			}
		}

		return this;
	}

	/**
	 * Emits an event and triggers the base handler to be called, followed by any other handler bound.
	 * @param {object} [target] Target object of the event
	 * @param {string} event Name of the event. May include the namespace, if the namespace parameter is not provided.
	 * @param {object} [data] Event data object. May be modified by the base handler, but shouldn't be changed any other handler.
	 * @param {string} [namespace] Namespace string that will be added, separated with a dot, before the event name.
	 * @returns {this}
	 */
	emit(target, event, data, namespace) {
		var i, hs, h, sub, action;

		// Detect optional parameters
		if (typeof target == 'string') {
			// (events, data, namespace)
			namespace = data;
			data = event;
			event = target;
			target = null;
		}

		event = (namespace ? namespace + '.' : '') + event;
		sub = event;

		while (true) {
			hs = this._evs[sub];

			if (hs) {
				action = (sub ? event.substr(sub.length + 1) : event) || null;
				i = hs.length;
				while (i--) {
					h = hs[i];
					if (typeof h.h == 'function' && (h.t === null || h.t == target)) {
						this._exec([ data, target, event, action, h.h ]);
					}
				}
			}

			if (!sub) {
				break;
			}

			// Remove last namespace part
			i = sub.lastIndexOf('.');
			sub = i == -1 ? "" : sub.substr(0, i);
		}

		return this;
	}

	_exec(cb) {
		if (this._qh) {
			this._qh.push(cb);
			return;
		}

		this._qh = [ cb ];

		setTimeout(() => {
			let f;
			while (cb = this._qh.shift()) {
				f = cb.pop();
				try {
					f(...cb);
				} catch (e) {
					console.error(e);
				}
			}
			this._qh = null;
		}, 0);
	}
}

export default EventBus;
