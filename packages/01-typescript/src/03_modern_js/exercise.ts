const oldNums = [1, 2, 3]
const newNums = [...oldNums, 4, 5, 6]

const user = { id: 1, name: "tony" }

const updateUser = {
    ...user,
    age: 30,
    id: 100
}

console.log(newNums)
console.log(updateUser)

const sum = (a: number, b: number, c: number) => a + b + c

let myArgs: [number, number, number] = [1, 2, 3]

console.log(sum(...myArgs))


function logMsg(prefix: string, ...rest: string[]) {
    console.log(prefix, rest.join(", "))
}

logMsg("Error Logs:", "timeout", "invalid input", "oom")

const scores = [10, 20, 30, 40]

const [first, second, ...rest] = scores

console.log(`top score is: ${first}`)
console.log(`second score is: ${second}, remaining scores are: ${rest}`)


function out() {
    const msg = "hello"
    return function inner() {
        console.log(msg)
    }
}

const inner = out()
console.log(inner)
inner()


function generateCounter() {
    let counter = 0
    return {
        increment: () => {
            counter++
            console.log(`counter is: ${counter}`)
        },
        decrement: () => {
            counter--
            console.log(`counter is: ${counter}`)
        }
    }
}

let counter = generateCounter()
counter.increment()
counter.increment()
counter.decrement()