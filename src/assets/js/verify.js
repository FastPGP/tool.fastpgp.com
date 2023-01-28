//Function to verify messages
async function verify(messageInputName, publickKeyInputName, messageOutputName) {
    //Get value of inputs and put them into variables
    const message          = document.querySelector(`[name='${messageInputName}']`).value
    const publicKey                = document.querySelector(`[name='${publickKeyInputName}']`).value

    //openpgp.js public key registration
    const OPGPpublicKey = await openpgp.readKey({
        armoredKey: publicKey
    }).catch(handleError)

    //openpgp.js message registration
    const OPGPmessage = await openpgp.readCleartextMessage({ cleartextMessage: message })

    //openpgp.js message verification
    const OPGPverificationResult = await openpgp.verify({
        message: OPGPmessage,
        verificationKeys: OPGPpublicKey
    })

    //Put output into variable
    const result = document.querySelector(`[name='${messageOutputName}']`)

    //Put result into variables
    const { verified, keyID } = OPGPverificationResult.signatures[0];
    const OPGPverificationResultVerified = verified;
    const OPGPverificationResultKeyID = keyID.toHex()
    
    //Output result
    if(OPGPverificationResultVerified) {
        result.value = `Verified! Signed by ${OPGPverificationResultKeyID}`
    }
    else {
        result.value = `Could not verify`
    }
    
}