/**
 * EventBus used for implementing modapp's Model interface, Collection interface, and LocaleString interface.
 */

import { default as EventBus } from './class/EventBus.js';

/**
 * EventBus instance.
 * @type {EventBus}
 */
let eventBus = new EventBus();

export { EventBus };
export default eventBus;
