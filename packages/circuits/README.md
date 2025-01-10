# @zk-shuffle/circuits

Poseidon ZK circuits

## Usage

### Install this package
`yarn add @zk-shuffle/circuits`

### Use in your own circuits

`import "path/to/node_modules/@zk-shuffle/circuits/group/group.circom"` 

## Development

Install

`yarn`

Compile circuits & generate resources including WASM, zKey, and Solidity contract.
The first time you run it, it will take a long time because it will download the default ptau file
and save it to artifacts.

`yarn compile`

Generate a checksum for the `circuits` directory and store the checksum in `circom.checksum`. We use this checksum to avoid compiling unchanged circom codes.

`yarn checksum`

If there are updated resources before you push the code, it's better to publish the resources to Google Cloud, after which the resources.json will be updated.

`yarn upload`

**Use your own zKey!!!**

Be notified it's better to generate your own zKey & ptau files to set up the verifier contract!


## Test

Every circom circuit should come with unit tests. You can take the example.circom as an example.

## Exporting Vkey

Make a directory called `vkey` in the root of the circuits directory.

```bash
mkdir vkey
```

Make sure you have snarkjs installed globally `npm install -g snarkjs`, then run the following command to export the verification key from the zKey file.

```bash
snarkjs zkey export verificationkey ./zkey/shuffle_encrypt.zkey ./vkey/shuffle_encrypt.vkey.json
```

## Exporting Rust Verifier

First, install the rust verifier CLI tool globally and ensure you have already generated the vKey file.

```bash
npm i -g zkemail_rust-verifier
```

Then run the following command to export the rust verifier from the vKey file.

```bash
rust-verifier generate-verifier -v ./vkey/shuffle_encrypt.vkey.json -o ./rust-verifiers/shuffle_encrypt_verifier.rs
```

More info about the rust verifier CLI tool can be found [here](https://github.com/zkemail/zk-email-verify/tree/main/packages/rust-verifier).
