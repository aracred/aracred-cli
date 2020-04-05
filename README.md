[![Wallaby.js](https://img.shields.io/badge/wallaby.js-configured-green.svg)](https://wallabyjs.com)

# Aracred CLI

Aracred CLI runs SourceCred on a Discorse server, creates files for scores and user labels, and then lets you mint tokens for contribors in an Aragon DAO.

- First you need an Aragon DAO with the [Transactions app](https://github.com/1Hive/transactions-app) installed.
- Then download and install the AraCred CLI.
- Then you'll need to download and install SourceCred.
- Then you can run `aracred` in the SourceCred folder to get a scores.
- Then upload the scores to the DAO.
- Then vote to approve the new mint. 

<br>

## How To AraCred

### Installation

Clone the SourceCred Repo and install deps.

    git clone https://github.com/sourcecred/sourcecred.git && cd sourcecred && npm i

Install the aragonCLI globally. If you have trouble installing the cli, check out [this guide](https://hack.aragon.org/docs/guides-faq).

    npm i -g @aragon/cli

Clone this repo and install deps.

    git clone https://github.com/pythonpete32/aracred-cli/ && cd aracred && npm i

Create a `secret.js` file in the root directory and add the following with your github token.

    `export default "YOUR_TOKEN_HERE";`

Build the project.

    npm prepublish

Link the package so it can be refrenced globaly.

    npm link

### Generating Scores

Navigate back to the SourceCred folder and type `aracred` into the terminal. This will create `toMint.csv` and `addresses.csv` files. 

### Generating User Labels

Edit `addresses.csv` to add user's addresses and use `aracred addresses` to obtain a new `addresses.json` file that can be uploaded as local labels in Aragon Client.

<br>

## Development Commands

### Run

```sh
$ npm test # run tests with Jest
$ npm run coverage # run tests with coverage and open it on browser
$ npm run lint # lint code
$ npm run docs # generate docs
$ npm run build # generate docs and transpile code
```

### Publish

```sh
$ npm release
$ npm publish
```

It'll automatically run `test`, `lint`, `docs`, `build`, generate `CHANGELOG.md`, and push commits and tags to the remote repository.

<br>

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [sayHello](#sayhello)
    -   [Parameters](#parameters)

### sayHello

This function says hello.

#### Parameters

-   `name`  Some name to say hello for.

Returns **any** The hello.
