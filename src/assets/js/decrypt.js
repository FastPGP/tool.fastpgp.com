//Function to decrypt messages
async function decrypt(encryptedMessageInputName, privateKeyInputName, passphraseInputName, messageOutputName) {
    //Get value of inputs and put them into variables
    const encryptedMessage          = document.querySelector(`[name='${encryptedMessageInputName}']`).value
    const privateKey                = document.querySelector(`[name='${privateKeyInputName}']`).value
    const passphrase                = document.querySelector(`[name='${passphraseInputName}']`).value


    //openpgp.js private key registration
    const OPGPprivateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKey }).catch(handleError),
        passphrase
    }).catch(handleError)

    //openpgp.js message registration
    const OPGPmessage = await openpgp.readMessage({
        armoredMessage: encryptedMessage
    }).catch(handleError)


    //openpgp.js message decryption (returns object)
    const OPGPmessageDecryptedObject = await openpgp.decrypt({
        message: OPGPmessage,
        decryptionKeys: OPGPprivateKey
    }).catch(handleError)

    //Insert decrypted message from object into variable
    OPGPmessageDecrypted = OPGPmessageDecryptedObject.data

    //Put output into variable
    const messageDecrypted = document.querySelector(`[name='${messageOutputName}']`)

    //Output results
    messageDecrypted.value = OPGPmessageDecrypted;
}