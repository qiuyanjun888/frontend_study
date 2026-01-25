class Department {
    public employees: string[] = [];

    constructor(
        public name: string,
        public location: string
    ) {
    }

    addEmployee(employee: string) {
        this.employees.push(employee)
    }

    printInfo() {
        console.log(`Department: ${this.name}, Location: ${this.location}, Staff: ${this.employees.length}`)
    }
}

class Employee {
    constructor(
        public readonly id: number,
        public name: string,
        private salary: number
    ) { }

    getDetails() {
        console.log(`ID: ${this.id}, Name: ${this.name}`)
    }
}

class ITDepartment extends Department {
    constructor(
        public admins: string[],
        name: string,
        location: string
    ) {
        super(name, location)
    }
}

function identity<T>(arg: T): T {
    return arg
}

const msg = identity<string>("hello")
const num = identity<number>(123)

function myPair<K, V>(key: K, value: V): [K, V] {
    return [key, value]
}

const pair = myPair<string, number>("id", 1)

interface Box<T> {
    content: T
}

const stringBox: Box<string> = { content: "haha" }
const numBox: Box<number> = { content: 123 }

class DataStorage<T> {
    private data: T[] = []

    addItem(item: T) { this.data.push(item) }

    getItems() { return [...this.data] }

    removeItem(item: T) { this.data.splice(this.data.indexOf(item), 1) }
}

const store = new DataStorage<string>()
store.addItem("acha")
store.addItem("good luck")
console.log(store.getItems())

interface Lengthwise {
    length: number
}

function getLength<T extends Lengthwise>(arg: T) {
    return arg.length
}

console.log(getLength("haha"))
console.log(getLength([1, 2, 3]))


function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}

const obj = { "a": 1, "b": 2, "c": 3 }
console.log(getProperty(obj, "a"))

// --- 总结：Private vs Public & Getters/Setters ---

class Account {
    private _balance: number = 0

    constructor(public owner: string) { }

    get balance() { return this._balance }

    set balance(value: number) {
        if (value < 0) {
            throw new Error("balance should be greater than 0")

        }
        this._balance = value
    }
}

const account = new Account("bruce")
console.log(account.owner)
account.balance = 100
console.log(account.balance)