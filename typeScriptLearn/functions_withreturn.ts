
function add(n1:number , n2:number) :string {

    return n1.toString() + n2.toString()

}

function add2(n1:number , n2:number):number{
    return n1+n2
}


function addAndHandle(n1:number , n2:number , cb:( num:number )=> void ){
    const  result = n1+n2
    cb( result )
}

addAndHandle( 10 , 20, (res)=> console.log(" addAndHandle ===> ",res) )

function printResult(num:number) :void {
    console.log(" Result ::: " , num)
    // return;
}
// let someVal : undefined; ///// no error ,,, can execute it..

printResult( add2( 5 , 12 ) )

let combineFunc : (a:number , b:number)=> number;

combineFunc = add2
// combineFunc = printResult; //// error becouse nothing return and 1 arg...

console.log(combineFunc (2,45) )
