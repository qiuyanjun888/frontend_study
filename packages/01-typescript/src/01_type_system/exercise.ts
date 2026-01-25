let userName: string = "qyj";
let age: number = 18;
let isYong: boolean = true


let idArr: number[] = [1, 2, 3, 4, 5]
let nameArr: Array<string> = ["jack", "rose", "tim"]

let first = idArr[0]
// 添加元素
idArr.push(6)
idArr.unshift(0)

// 删除元素
idArr.pop()
idArr.shift()


let safeVal: unknown = "hello"
if (typeof safeVal === "string") {
    console.log(safeVal.toUpperCase())
}

let pair: [string, number] = ["qyj", 18]

let [name, age2] = pair
console.log(`pair value is ${name}, ${age2}`)

function throwErr(msg: string): never {
    throw new Error(msg)
}

let idType: number | string
idType = 1
idType = "1"

// idType = false

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"
let method: HttpMethod = "GET"

// method = "PATCH"

interface Named {
    name: string
}

interface Logable {
    log(): void
}

type UnionType = Named & Logable

const obj: UnionType = {
    name: "haha",
    log: () => console.log("haha")
}

obj.log()

interface User {
    name: string
    age: number
    email?: string
}

let peter: User = { name: "peter", age: 30 }
let jack: User = { name: "jack", age: 20, email: "jack@163.com" }

interface Animal {
    name: string
}
// 鸭子类型，像 Animal 就行，它就是 Animal
const cat = { name: "cat", eat: () => console.log("cat eat") }

function greetPet(pet: Animal) {
    console.log("Hello, " + pet.name)
}

greetPet(cat)