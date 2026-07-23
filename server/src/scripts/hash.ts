import {hash} from  'bcrypt';
let pass = process.argv[2];
hash(pass, 10, function(err, hash) {
    console.log(hash);
});