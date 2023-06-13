export class Event {
    constructor(entity, event) {
        this.entity = entity;
        this.event = event;
    }

}


class EventsObserver {
    constructor() {
        this.subsribations = new Map();
    }

    subscribe(entity) {
        this.subsribations.set(entity, []);
    }

    unsubscribe(entity) {
        this.subsribations.delete(entity);
    }

    fetch(entity) {
        let result = this.subsribations.get(entity)
        this.subsribations.set(entity, []);
        return result;
    }

    sendEvent(event) {
        this.subsribations.values().forEach(s => {
                s.push(event);
            }
        )
    }
}


export const eventsObserver = new EventsObserver();
