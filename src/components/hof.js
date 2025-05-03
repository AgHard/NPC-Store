function SayHello(callback){
    console.log("Hello from the callback function!");
    callback();
}

function SayGoodbye(){
    console.log("Goodbye from the callback function!");
}

SayHello(SayGoodbye);

const newPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promised");
    }, 1000);
}).then ((value)=> {
    console.log(value); // "Promised"
})

const asyncFun = async ()=> {
    const value = await newPromise;
    console.log(value);
}

function foo1(){
    return {
        name: "John",
        age: 30
    };
}

function foo2(){
    return {
        name: "John",
        age: 30
    };
}