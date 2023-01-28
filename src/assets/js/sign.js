//Function to sign messages
async function sign(messageInputName, privateKeyInputName, passphraseInputName, messageOutputName) {
    //Get value of inputs and put them into variables
    const message          = document.querySelector(`[name='${messageInputName}']`).value
    const privateKey                = document.querySelector(`[name='${privateKeyInputName}']`).value
    const passphrase                = document.querySelector(`[name='${passphraseInputName}']`).value

    //openpgp.js private key registration
    const OPGPprivateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKey }).catch(handleError),
        passphrase
    }).catch(handleError)

    //openpgp.js message registration
    const OPGPmessage = await openpgp.createCleartextMessage({ text: message })

    //openpgp.js message signing
    OPGPmessageSigned = await openpgp.sign({
        message: OPGPmessage,
        signingKeys: OPGPprivateKey
    })

    //Put output into variable
    const messageDecrypted = document.querySelector(`[name='${messageOutputName}']`)

    //Output results
    messageDecrypted.value = OPGPmessageSigned;
}