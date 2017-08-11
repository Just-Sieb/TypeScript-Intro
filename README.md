# TypeScript

A better way to do JavaScript

## About

TypeScript is a open source langauge by Microsoft that compiles into JavaScript. The goal of TypeScript is to bring a sense of type safety into JavaScript. This intro to TypeScript is best suited for those who have familiarity of JavaScript. The goal of this intro is not to teach you how write TypeScript but the advantages it offers over plain JavaScript.

## Get Started

First off you are going to need NodeJS installed. Check [their website](https://nodejs.org/en/download/) for steps to install if you do not have it already. After Node is installed you will need to install Typescript. For that run the command `npm install -g typescript`. To verify it is installed run `tsc -v`. You should have at least Typescript version 2.0 or newer. If you do you are ready to continue. I do highly suggest also having a text editor with TypeScript support. My personal recomendation is Visual Studio Code. It comes with TypeScript support built in.

## Learning TypeScript

### First Program

Now that you are set up we are going to start by writing our first TypeScript program. Open a new file in you text editor, paste the following code into it, and save it as `intro.ts`.

``` typescript
function adder(a, b) {
    return a + b;
}

console.log(adder(3, 5));
```

On the command line from the directory you saved it run `tsc intro.ts`. This will output a new file called `intro.js`. As you have probably gathered by now what we have entered is just standard JavaScript. That is becuase TypeScript is a full superset of JavaScript. The only difference between the compiled TypeScript code and the JavaScript code is the empty line was removed.

While this is valid TypeScript, it is not good TypeScript. Any value not given a type in TypeScript is automatically set to `any` which offers no advantage of what JavaScript itself is. `any` in TypeScript is essentially the same as a void pointer in C or an empty interface in Go. This time run the command `tsc intro.ts --noImplicitAny`. This is the same command but this time we are telling the TypeScript compiler that auto infering a variable as `any` should bring up a warning. The simple terrible way to fix this is to just set the arguements and return types for the `adder` function to `any`. To add a type to a variable declaration in typescript follow the name of the variable with a colon and then they name of the type.

``` typescript
function adder(a: any, b: any): any {
    return a + b;
}

console.log(adder(3, 5));
```

Run the `tsc intro.ts --noImplicitAny` command again and you will see that it will no longer give any errors. However we should give proper types to out function.

``` typescript
function adder(a: int, b: int): int {
    return a + b;
}

console.log(adder(3, 5));
```

Now we are passing two numbers in and getting one number back. Now lets change the values we are putting in the call.

``` typescript
function adder(a: number, b: number): number {
    return a + b;
}

console.log(adder("Potted", "Plant"));
```

Compile once more and you should be now getting the output of `error TS2345: Argument of type '"Potted"' is not assignable to parameter of type 'number'.`.

What if we want to add a third optional parameter to it? JavaScript itself does not care about how many or how few arguement you pass into a function. TypeScript however does care and will warn you. Lets try to compile the following snippet now.

``` typescript
function adder(a: number, b: number, c: number): number {
    return a + b;
}

console.log(adder(3, 5));
```

Now you should be getting an error message about too few arguments. However there are still times you may want to have optional arguments. There are two ways you can deal with in TypeScript. The first is two provide a default value. The second is to mark it as nullable.

``` typescript
// Type of c is automatically inferred by the number literal
function adder1(a: number, b: number, c=3): number {
    return a + b + c;
}

function adder2(a: number, b: number, c?: number): number {
    if (c) {
        return a + b + c;
    }
    return a + b;
}

console.log(adder1(3, 5))
console.log(adder1(3, 5, 8))
console.log(adder2(3, 5))
console.log(adder2(3, 5, 8))
```

Compile and you will see there are no errors. To mark a variable as nullable just add a question mark between the variable name and the colon. This will tell TypeScript that we are okay with a potential null value for the variable.

There is nothing about our function that would not make it accept a String. So how about we overload it to accept both types.

``` typescript
function adderOverloaded(a: number, b: number): number;
function adderOverloaded(a: string, b: string): string;
function adderOverloaded(a: any, b: any): any {
    return a + b;
}

console.log(adderOverloaded("Potted", "Plant"));
console.log(adderOverloaded(1, 2));
```

Alright you may be concerned that we brought `any` back as a type. Don't worry because we are not opening ourselves up to any value. Overloading in TypeScript is done by providing the generic method that handles all types and decorating it with the function signature of signatures your will accepts. If you add in the line `console.log(adderOverloaded({}, false))` and try to compile again you will notice that our compiler is back to giving us warnings.

### Basic Types

TypeScript has all the basic types of JavaScript and they all work as one would expect.
``` typescript
// Boolean
let isDone: boolean = false;

// Number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// Strings
let color: string = "blue";
color = 'red'; // Both single and double quotes work
color = `red ${decimal}`; // As well as template strings

// Array
let fib: number[] = [1, 1, 2, 3, 5, 8, 13]; // You can use brackets after the type
let primes: Array<number> = [2, 3, 5, 7, 11, 13]; // Or you can use the Array with the type as a generic
```

One new type of an array in TypeScript is a ReadOnly array. This type has all of the mutating methods removed such as `push` or `pop`.
``` typescript
let natural: ReadonlyArray<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
naturl.length = 20; // Error: modifing the length
natural.push(10); // Error: adding an item
natural[0] = 0; // Error: changing a value at a position
```

One new type that is not in JavaScript is a Tuple. Tuple are identical to Arrays in JavaScript but TypeScript will check to make sure they have the right length and types at each position. To define a tuple just make the type an array of types.
``` typescript
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

TypeScript also brings over enums.
``` typescript
enum Color {Red, Green, Blue}
let paintColor: Color = Color.Green
// They can also be accessed by their index
paintColor = Color[0] // Will be set to Red
```

### Interfaces

Well now you have an idea about basic types, but what about objects in JavaScript? TypeScript uses interfaces to declare their structure. Create a new file named `objects.ts` with the following content.
``` typescript
interface User {
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
}
let kirk: User = {
    username: 'enterprise',
    email: 'enterprise@example.com',
    firstName: 'James',
    lastName: 'Kirk'
}
```
So here we can see an object that fills the requirements of an interface. You will see the question mark after `firstName` and `lastName`. If you want a key to be marked nullable you will have to tell TypeScript you are okay with that.

Here is an example of an object that has a missing nullable key.
``` typescript
let spock: User {
    username: 'spock'
    email: 'spock@example.com',
    lastName: 'Spock' // Vulcan first names are too difficult for a human to pronounce
}
```

Let us make an adjustment to our interface. The username key is one we do no plan to change so it would be nice if we could get an error if someone tries to change the value after it is created. In TypeScript we can add the `readonly` access modifier to a key to have the compiler error out if someone tries to alter the value of the key.
``` typescript
interface User {
    readonly username: string;
    email: string;
    firstName?: string;
    lastName?: string;
}
let bones: User = {
    username: 'bones',
    email: 'bones@example.com',
    firstName: 'Leonard',
    lastName: 'McCoy'
}

bones.username = 'doctor' // ERROR modifying a readonly key
```

TypeScript will check object literals at creation time and when passing into a function if an object fullfilling an interface has extra keys

``` typescript
interface User {
    readonly username: string;
    email: string;
    firstName?: string;
    lastName?: string;
}
```

For more information on interfaces in TypeScript check the [handbook](https://www.typescriptlang.org/docs/handbook/interfaces.html) for more details.

### Classes

The basics of Classes in TypeScript is the same as the Class format added in ECMAScript 2015 except the the expected types added in.

``` typescript
class Person {
    firstName: string;
    lastName: string;
    constructor(fName: string, lName: string) {
        this.firstName = fName;
        this.lastName = lName;
    }
    greet(): string {
        return `Hello ${this.firstName}`;
    }
}
```

We also have inheritance similar to JavaScript.
``` typescript
class Employee extends Person {
    employeeId: number;
    constructor(fName: string, lName: string, id: number) {
        super(fName, lName);
        this.employeeId = id;
    }
}
```

One of the new features in the class system over JavaScript are access modifiers. By default class members are public by default, but members can also be set to protected or private. The modifiers work as expected from if you come from another language. Public members are accessible to all, private members are only available to the class, and protected members are only accessible to the class and derived classes.
``` typescript
class Employee extends Person {
    protected employeeId: number;
    private ssn: number;
    public constructor(fName: string, lName: string, id: number) {
        super(fName, lName);
        this.employeeId = id;
    }
}
```

Classes also bring over the readonly modifier from interfaces. Readonly only properties can be initialized in either their declaration or within the constructor.
``` typescript
class Employee extends Person {
    readonly employeeId: number;
    private ssn: number;
    public constructor(fName: string, lName: string, id: number) {
        super(fName, lName);
        this.employeeId = id;
    }
}
```

One last addition to go over for classes in TypeScript are accessors. TypeScript gives JavaScript getter and setters methods for properties.
``` typescript
class Employee {
    private _firstName: string;
    private _lastName: string;
    private _fullName: string;

    constructor(fName: string, lName: string) {
        this._firstName = fName;
        this._lastName = lName;
    }

    get fullName(): string {
        return `${firstName} ${lastName}`;
    }

    set fullName(newName: string) {
        this._fullName = newName;
        this.firstName = newName.split(' ')[0]
        this.lastName = newName.split(' ')[1]
    }
}

let captain: Employee = new Employee('Kathryn', 'Janeway');
console.log(captain.fullName);
```

There are several other features added to classes in TypeScript check the [handbook](https://www.typescriptlang.org/docs/handbook/classes.html) for more details.


### Generics

The last major feature I will go over is Generics. Once again anyone with experience with any other language that has Generics, this will look very familiar to you. We will start off with a function that uses generics.

``` typescript
function log<T>(message: T) {
    console.log(message);
}

console.log(log<number>(3));
console.log(log<string>("Captain Kirk"));
```

Unlike C++ where generics essentially are just a template that is replaced at runtime. TypeScript will enforce a little more restrictions in its version of generics. TypeScript knows nothing about the generic so it will assume it has no valid properties. For example the following will fail.
``` typescript
function log<T>(message: T) {
    console.log(message.title); // Property 'title' does not exist on type 'T'.
}
```

To give TypeScript about what to expect from the generic type we can extend it with other types.
``` typescript
interface Message {
    title: string;
    body: string;
}

function log<T extends Message>(message: T) {
    console.log(message.title); // T extends Message so we know we will have a property called title.
}
```

Generics in classes work similarly to functions.
``` typescript
class BinaryNode<T> {
    element: T;
    left: BinaryNode<T>;
    right: BinaryNode<T>;

    constructor(e: T) {
        this.element = e;
    }
}

let topNode = new BinaryNode<string>("top node");
let leftNode = new BinaryNode<string>("left node");
let rightNode = new BinaryNode<string>("right node");

topNode.left = leftNode;
topNode.right = rightNode;
```

## Why?

Now you are likely asking yourself why do I need to use TypeScript. Here are some reasons to use it.
- TypeScript will ensure you are using valid keys in your object and help detect potential null / undefined issues
- Better AutoCompletion script, libraries that offer typings will help Text Editors give auto completion and type hints of what the library needs

### Client and Server Side Type Sharing

Still not convinced about the advantages of TypeScript? Here is an idea I while experimenting with TypeScript. With the rise of NodeJS is is common to use JavaScript on the frontend and backend. If you have an API in node and are trying to call it client side, you are typically scouring through the documentation to make sure the body is in the right format. TypeScript offers an easy way with their typings files to share the types between projects. With this you can have compile time checking across interfaces where you typically have none.

I have wrote up a sample of this in the api folder in this repo. To try it out open the api folder in two different terminal sessions then run `npm install` to get the dependencies. In one of the windows run `npm run server` and then run `npm run client` in the other. You should see status ok printed out in the client. Now in `api/client.ts` change line 6 to be `numbers: true` and you will see when we try to run it we get a build error.

So by now you are probably seeing the advantages TypeScript offers. Essentially it helps avoid mistakes and ensure other developers are following your API design.