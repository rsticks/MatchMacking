
export class Queue<T> {

    private elements: Array<T>;
    private _size: number | undefined;

    public constructor(capacity?: number) {
        this.elements = new Array<T>();
        this._size = capacity;
    }

    public push(o: T) {
        if (o == null) {
            return false;
        }
        // Если передан параметр size, размер очереди устанавливается
        if (this._size != undefined && !isNaN(this._size)) {
            if (this.elements.length == this._size) {
                this.pop();
            }
        }
        this.elements.unshift(o);
        return true;
    }

    public pop(): T {
        // @ts-ignore
        return this.elements.pop();
    }

    public size(): number {
        return this.elements.length;
    }

    public empty(): boolean {
        return this.size() == 0;
    }

    public clear() {
        // @ts-ignore
        delete this.elements;
        this.elements = new Array<T>();
    }
}

