/**
 * 03_abstract_interfaces.ts
 * 
 * 抽象类 (Abstract Classes) 与 接口 (Interfaces)
 * 
 * Java 开发者视角：
 * - 抽象类: 使用 abstract 关键字，不能被实例化，可以包含抽象方法和已实现的方法。
 * - 接口实现: 类使用 implements 关键字实现接口。
 * - 核心差异：在 TS 中，Interface 既可以描述对象形状，也可以像 Java 一样作为类的契约。
 */

// 1. 抽象类 (Abstract Class)
abstract class Shape {
    constructor(public color: string) { }

    // 抽象方法：子类必须实现
    abstract getArea(): number;

    // 普通方法：子类可以直接继承
    describe() {
        console.log(`This is a ${this.color} shape.`);
    }
}

class Circle extends Shape {
    constructor(color: string, public radius: number) {
        super(color);
    }

    getArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

// 2. 接口作为契约 (Interfaces as Contracts)
interface IPlayable {
    play(): void;
    pause(): void;
    volume: number;
}

// 类实现接口
class VideoPlayer implements IPlayable {
    public volume: number = 50;

    play() {
        console.log("Video is playing...");
    }

    pause() {
        console.log("Video is paused.");
    }

    // 类可以有自己的额外方法
    stop() {
        console.log("Video stopped.");
    }
}

/**
 * 💡 Java 开发者进阶思考：抽象类 vs 接口
 * 
 * - 抽象类：用于“存在逻辑复用”的场景。比如所有图形都有 color 和 describe()，但 getArea() 不同。
 * - 接口：用于“定义共同行为但无共享逻辑”的场景。比如视频播放器和音乐播放器都能 play()，但实现方式完全不同。
 * 
 * 在 TypeScript 中，如果你只需要定义一个契约，首选 Interface，因为它编译后不占任何空间。
 */

// 示例运行
const myCircle = new Circle("red", 5);
myCircle.describe();
console.log("Area:", myCircle.getArea().toFixed(2));

const player = new VideoPlayer();
player.play();
player.pause();

// 3. 接口的多维实现 (Multiple Implementation)
interface IRecordable {
    record(): void;
}

// 一个类可以实现多个接口
class SmartCamera implements IPlayable, IRecordable {
    volume = 10;
    play() { console.log("Streaming camera..."); }
    pause() { console.log("Stream paused."); }
    record() { console.log("Recording video..."); }
}

const camera = new SmartCamera();
camera.record();
