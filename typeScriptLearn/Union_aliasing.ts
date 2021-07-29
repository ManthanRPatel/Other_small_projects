// tsc ./TypeScripts/AcademindTypeScript.ts --watch


type Combinable  = number |string ;
type ConversionType = 'as-number' | 'as-text';

function combine( n1 : Combinable , n2 : Combinable , resultConversion: ConversionType ){
    let result;

    if( typeof n1 === 'number' && typeof n2 === 'number' || resultConversion==='as-number' ){
        result = (+n1) + (+n2)
    }
    else{
        result = n1.toString() + n2.toString()
    }

    console.log(' result ===>  ' , result)

    // if(resultConversion === 'as-number' ){
    //     return +result
    // }else{
    //     return result.toString()
    // }

}

combine( 3,4 , 'as-number' )
combine( '30','40','as-number' )
combine( 'Ram' , 'shyam','as-text' ) //// show error while adding...