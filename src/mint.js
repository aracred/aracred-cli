/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-console */
const chalk = require("chalk");
const execa = require("execa");
const fs = require("fs");
const Table = require("cli-table");
const inquirer = require("inquirer");

export const validate = url => {
  if (url.search(":") === -1 && !(url.slice(-1) === "/")) {
    return true;
  }
  return "enter valid Discorse address";
};

export const hello = () => {
  return "hello";
};

export const validateDiscorse = url => {
  if (url.search(":") === -1 && !(url.slice(-1) === "/")) {
    return true;
  }
  return "Invalid: ensure there is no `http://` or trailing `/`";
};

export const validateGithub = url => {
  if (
    url.search(":") === -1 &&
    !(url.slice(-1) === "/") &&
    url.search("@") === -1
  ) {
    return true;
  }
  return "Invalid: ensure there is no `http://`, `@`, or trailing `/`";
};

export const getInput = async () => {
  const questions = [
    {
      name: "mode",
      type: "list",
      message: "What do you want to run SourceCred against: ",
      choices: [
        {
          name: chalk.green("Discourse"),
          value: "discourse"
        },
        {
          name: chalk.green("Github"),
          value: "github"
        }
      ]
    },
    {
      name: "forum",
      type: "input",
      message: `Enter the ${chalk.yellowBright.bold(
        "Discourse Forum"
      )} you want to run SourceCred against:`,
      validate: value => validateDiscorse(value),
      when: answers => {
        return answers.mode === "discourse";
      }
    },
    {
      name: "repo",
      type: "input",
      message: `Enter the ${chalk.yellowBright.bold(
        "GitHub Repo"
      )} you want to run SourceCred against:`,
      validate: value => validateGithub(value),
      when: answers => {
        return answers.mode === "github";
      }
    }
  ];

  const answers = await inquirer.prompt(questions);
  return answers;
};

export const startBackend = async () => {
  try {
    await execa.command("yarn backend");
  } catch (error) {
    console.error();
  }
};

export const runSC = async input => {
  try {
    // eslint-disable-next-line no-unused-expressions
    input.mode === "github"
      ? await execa.command(`node bin/sourcecred.js load ${input.repo}`)
      : await execa.command(
          `node bin/sourcecred.js discourse https://${input.forum}`
        );
  } catch (error) {
    console.error(error);
  }
};

export const calcCred = async input => {
  try {
    // eslint-disable-next-line no-unused-expressions
    input.mode === "github"
      ? await execa.command(
          `node bin/sourcecred.js scores ${input.repo} > CRED.json`,
          {
            shell: true
          }
        )
      : await execa.command(
          `node bin/sourcecred.js scores ${input.forum} > CRED.json`,
          {
            shell: true
          }
        );
  } catch (error) {
    console.error();
  }
};

export const processCSV = async () => {
  try {
    const data = require(`${process.cwd()}/CRED.json`);
    const cred = [];
    data[1].users.map(element => {
      cred.push([element.address[4], element.totalCred]);
      return true;
    });

    // SAVE CSV LOGIC
    const mintCSVContent = `name,amount\n${cred
      .map(e => e.join(","))
      .join("\n")}`;

    fs.writeFile("./toMint.csv", mintCSVContent, error => {
      if (error) {
        console.log(error);
      }
      console.log("Saved toMint.csv.");
    });
    // return Promise.resolve(data);

    const addressesCSVContent = `name,address\n${cred
      .map(e => `${e[0]},`)
      .join("\n")}`;

    fs.writeFile("./addresses.csv", addressesCSVContent, error => {
      if (error) {
        console.log(error);
      }
      console.log(
        "Saved addresses.csv. Please edit this file in order to add user's addresses."
      );
    });

    // print the cred as table
    const table = new Table({
      head: [chalk.blueBright.bold("Address"), chalk.blueBright.bold("Amount")],
      colWidths: [60, 30]
    });

    cred.map(row => {
      table.push(row);
      return true;
    });

    return table.toString();
  } catch (error) {
    console.log(error);
  }
  return Promise.resolve("data");
};

export const mintGrain = async () => {
  return Promise.resolve("data");
};
