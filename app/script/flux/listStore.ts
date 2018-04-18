import { EventEmitter } from 'events';

class ListStore extends EventEmitter {

    items: any;

    constructor() {
        super();
        this.items = [];
    }

    getAll() {
        return this.items;
    }

    addNewItemHandler(text: string) {
        this.items.push(text);
    }

    emitChange() {
        this.emit('change');
    }

    addChangeListener(callback: any) {
        this.on('change', callback);
    }

    removeChangeListener(callback: any) {
        this.removeListener('change', callback);
    }
}

export let MyStore = new ListStore();