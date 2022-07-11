export class EventBus {
	constructor();
	on(target: object | null, events: string | null, handler: () => void, namespace?: string): this;
	off(target: object | null, events: string | null, handler?: () => void, namespace?: string): this;
	emit(target: object | null, events: string | null, data: unknown, namespace?: string): this;
}

declare const eventBus: EventBus;
export default eventBus;
