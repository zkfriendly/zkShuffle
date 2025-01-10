# @zk-shuffle/circuits

Poseidon ZK circuits

## Usage

### Install this package
`yarn add @zk-shuffle/circuits`

### Use in your own circuits

`import "path/to/node_modules/@zk-shuffle/circuits/group/group.circom"` 

## Developement

Install

`yarn`

Compile circuits & generate resources including WASM & zKey & Solidity contract.
The first time you run it will take a long time because it will download the default ptau file
and save it to artifacts.

`yarn compile`

Generates checksum for the `circuits` directory and stores the checksum in `circom.checksum`. We use this checksum to avoid compiling unchanged circom codes.

`yarn checksum`

If there are updated resources before you push the code, it's better to publish the resources to Google cloud, after which the resources.json will be updated

`yarn upload`

**Use your own zkey!!!**

Be notified it's better to generate your own zkey & ptau files to set up the verifier contract!


## Test

Every circom circuits should come with an unit tests, you can take the example.circom for example

## Exporting Vkey

make a directory called `vkey` in the root of the circuits directory

```bash
mkdir vkey
```

make sure you have snarkjs installed globally `npm install -g snarkjs`
then run the following command to export the verification key from the zkey file

```bash
snarkjs zkey export verificationkey ./zkey/shuffle_encrypt.zkey ./vkey/shuffle_encrypt.vkey.json
```

## Exporting Rust Verifier

first install the rust verifier cli tool globally and you have already generated the vkey file

```bash
npm i -g zkemail_rust-verifier
```

then run the following command to export the rust verifier from the vkey file

```bash
rust-verifier generate-verifier -v ./vkey/shuffle_encrypt.vkey.json -o ./rust-verifiers/shuffle_encrypt_verifier.rs
```

more info about the rust verifier cli tool can be found [here](https://github.com/zkemail/zk-email-verify/tree/main/packages/rust-verifier)