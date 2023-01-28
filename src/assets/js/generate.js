//Function to generate new private/public key pair - username, email, and passphrase input names and privateKey and publicKey output names passed as arguments
async function generate(usernameInputName, emailInputName, passphraseInputName, privateKeyOutputName, publicKeyOutputName) {
    //Get value of inputs and put them into variables
    const username   = document.querySelector(`[name='${usernameInputName}']`).value
    const email      = document.querySelector(`[name='${emailInputName}']`).value
    const passphrase = document.querySelector(`[name='${passphraseInputName}']`).value

    //OpenPGP.js generation
    const { privateKey, publicKey } = await openpgp.generateKey({
        type: "rsa",
        rsaBits: 4096,
        passphrase: passphrase,
        userIDs: [{ 
            name: username,
            email: email 
        }],
    }).catch(handleError);

    //Put outputs into variabels
    const privateKeyOutput = document.querySelector(`[name='${privateKeyOutputName}']`)
    const publicKeyOutput  = document.querySelector(`[name='${publicKeyOutputName}']`)

    //Output results
    privateKeyOutput.value = privateKey
    publicKeyOutput.value  = publicKey
}
