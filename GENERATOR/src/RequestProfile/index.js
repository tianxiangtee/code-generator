#!/usr/bin/env node
import { fileURLToPath } from 'url';
import fs from 'fs'
import path from 'path'
import addModule from '../Utility/addModule.js';
import { snakeToCamelCase, snakeToKebabCase, snakeToPascalCase} from '../Utility/textTransform.js';
import renameFiles from '../Utility/renameFiles.js';
import copyFiles from '../Utility/copyFiles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const currentDirectory = process.cwd()
const template = path.join(__dirname, 'custom-template');
const templateWithoutAudit = path.join(__dirname, 'custom-template-without-audit');
const defaultPath = path.join(currentDirectory, 'src/module');

function replaceContent(content, userInput) {
  let kebabCaseInput = snakeToKebabCase(userInput);
  let pascalCaseInput = snakeToPascalCase(userInput);
  let camelCaseInput = snakeToCamelCase(userInput);

  //Snake case
  content = content.replace(/Template_DB/g, userInput);
  //Camel case
  content = content.replace(/templateCamelCase/g, camelCaseInput);
  //Kebab case
  content = content.replace(/template-kebab-case/g, kebabCaseInput);
  //Pascal case
  content = content.replace(/TemplatePascal/g, pascalCaseInput);
  return content;
}





function generateRequestProfileTemplate(userInput) {
  const templatePath = userInput.skipAudit.toUpperCase() == "Y" ? template : templateWithoutAudit
  let destinationPath = path.join(defaultPath, snakeToPascalCase(userInput.moduleName));
  copyFiles(templatePath, destinationPath, userInput.moduleName.trim());
  renameFiles(
    destinationPath,
    destinationPath,
    snakeToKebabCase(userInput.moduleName.trim()),
  );
  addModule(userInput.moduleName)
}

export default generateRequestProfileTemplate;