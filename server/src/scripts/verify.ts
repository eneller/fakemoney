import {compare} from  'bcrypt';
let pass = process.argv[2];
let hash = process.argv[3];
compare(pass,hash, function(err, result){
    console.log(result);
});
