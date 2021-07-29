
/// basics
// function add( n1 : number , n2 : number, showResult:boolean ,phrase:string ){
//     const result = n1 + n2;
//     if(showResult){
//         console.log(phrase + result)
//     }else{
//         return result
//     }
// }

// let number3:number;
// number3 = 5
// const number1 = 5
// const number2 = 2.8;
// const printResult = true

// add(number1,number2 , printResult ,"DHoom Machle : " )


//// 


enum Role{ ADMIN='ADMIN', READ_ONLY=100 , AUTHOR=200 }
// enum Role{ ADMIN, READ_ONLY=100 , AUTHOR=200 }


const person2
// :{
//     name: string;
//     age: number;
//     hobbies:string[];
//     role: [number , string];
//     roleType:Enumerator;
// }
 = {
    name:'Mancmax',
    age:22,
    hobbies:['sports','swim'],
    role:[2,'author'],
    roleType: Role.ADMIN
}

if( person2.roleType == Role.ADMIN ){
    console.log("Is Admin..")
}

// person2.role.push('admin')  /// exception push not get error
// person2.role[1] =10;
// person2.role = [1,'hii','susus'] //// this will throw error


// let fav : string[]
// fav =['gyg','ddd']
// let fav2 :any[]
// fav2 = [1,'sososo',{j:'gh'}]


// console.log("bigiu ",person2.name );
// for ( const hobby in person2.hobbies ){
//     console.log(hobby.toUpperCase())
// }


///////// unnown type... is better than any for better type checking..
let userInput : unknown;
let userName:string;

userInput = 5
userInput ='max'

if( typeof userInput === 'string' ){
    userName = userInput;
}
// userName = userInput; /// if userInput:unknown ,, then show error...



///////// never type
function generateError( message:string , code:number ):never{

    throw { message:message , errorCode: code };
    //// while(true){}
}
//// ResOfErris never type... infinite loop also create never type...
const ResOfErr = generateError( "An error", 500 )
console.log("ResOfErr ==",ResOfErr)