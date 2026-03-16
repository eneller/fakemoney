import { exportJWK, generateSecret } from "jose"

async function printSecret(secret){
    const jwk = await exportJWK(secret);
    console.log('🔑Generated Secret:');
    console.log(JSON.stringify(jwk));
}
(async () => {
    const secret = await generateSecret('HS256', {extractable: true});
    await printSecret(secret);
})();
