//Function to encrypt and sign messages
async function encrypt(publicKeyInputName, messageInputName, privateKeyInputName, passphraseInputName, messageOuputName) {
    //Get value of inputs and put them into variables
    const publicKey        = document.querySelector(`[name='${publicKeyInputName}']`).value
    const message          = document.querySelector(`[name='${messageInputName}']`).value
    const privateKey       = document.querySelector(`[name='${privateKeyInputName}']`).value
    const passphrase       = document.querySelector(`[name='${passphraseInputName}']`).value


    //Check if there is privateKey
    var OPGPprivateKey = ""
    if(privateKey) {
        //If there is, openpgp.js private key registration
        OPGPprivateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({ armoredKey: privateKey }).catch(handleError),
            passphrase
        }).catch(handleError)
    }

    //openpgp.js public key registration
    const OPGPpublicKey = await openpgp.readKey({
        armoredKey: publicKey
    }).catch(handleError)

    //openpgp.js message registration
    const OPGPmessage = await openpgp.createMessage({
        text: message
    }).catch(handleError)

    //openpgp.js message encryption
    const OPGPmessageEncrypted = await openpgp.encrypt({
        message: OPGPmessage,
        encryptionKeys: OPGPpublicKey,
        signingKeys: OPGPprivateKey
    }).catch(handleError)


    //Put output into variable
    const messageEncrypted = document.querySelector(`[name='${messageOuputName}']`)

    //Output results
    messageEncrypted.value = OPGPmessageEncrypted;
}