export {}

let message = "Hello Manthan"

console.log(message)

let x = 10;
let total : Number;
let name : string;
let isBegginer : Boolean = true;

let sentence : string = `Message is : ${message}
iygyygy jgg `;
console.log(sentence)

///// null and undefined
let n: null=null;
let u: undefined = undefined;

let isNew : boolean = null; // correct
let myName : string = undefined; /// correct


/// array
let list1 : number[] =[1,2,3];
let list2 : Array<number> = [1,2,3];

let person1 : [string , number] = ['dhoom',123];

/// enumerate value
enum Color {Red=5, Green , Blue}; // enum start with 0 so.. red = 0 , green = 1
let c:Color = Color.Green;
console.log(c);

/// any value
let randomValue : any = 10;
randomValue = true
randomValue = "Macmax"

        /// this will not raise error
// let myVariable : any = 10;
// console.log(myVariable.name)
// myVariable()
// myVariable.toUpperCase();

/// unknown ==        //// this will 
// let myVariable2 : unknown = 10;

// function hasName(obj:any): obj is { name: string }{
//     return !!obj &&
//             typeof obj === "object" &&
//             "name" in obj
// }

// if(hasName(myVariable2)){
//     console.log(myVariable2.name)
// }

// (myVariable2 as string).toUpperCase();

/////
let a;
a = true
a = 20;

let b = 20;
// b = true  // incorrect

//// multuple type
let multipleType : boolean | number;
multipleType =20  // correct
multipleType = true // correct


/////////// function

function add( num1:number , num2:number ) : number{
    return num1+num2
}
add(5,10)
// add(2,"10") /// incorrect
//// here ():number { } is return type

/// optional -- use  ? before it..
function substr( num1:number , num2?:number ) : number{
    return num1-num2
}
// substr(5,20);
// substr(5); /// correct

function add2( num1:number , num2:number = 3 ) : number{
    return num1+num2
}
add2(20); // correct




///// interfaces
// function fullName(person: {firstName:string , lastName: string}){
//     console.log(`${person.firstName} and ${person.lastName}`);
// }
// let p = {
//     firstName :"Bruce", lastName : 'Wayne'
// }
// fullName(p);


/////
interface Person{
    firstName : string,
    lastName? : string
}
function fullName(person: Person){
    console.log(`${person.firstName} and ${person.lastName}`);
}
let p = {
    firstName :"Bruce"   //, lastName : 'Wayne'
}
fullName(p);


//////////// class  and  access modifiers -{private , protected , public}
class Employee{
    // employName : string;   /// correct
    // private employName : string;   /// error in below as it is private access modifier
    public employName : string; // no error as public modifer
    // protected employName : string;  /// no error in derived class ,, but  you can't use outside ,, that's why it shows error

    constructor( name : string ){
        this.employName = name;
    }

    greet(){
        console.log(`Good morning ${this.employName}`);
    }

}
let emp1 = new Employee('Macmax');
console.log(emp1.employName)
emp1.greet();


class Manager extends Employee{
    constructor(managerName : string){
        super(managerName);
    }

    delegateWork(){
        console.log(`Manager delegating tesks ${this.employName}`)
    }
}

let m1 = new Manager("Manthan")
m1.greet()
m1.delegateWork()
console.log(m1.employName);