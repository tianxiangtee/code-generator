#!/usr/bin/env node
import { fileURLToPath } from 'url';
import fs from 'fs'
import path from 'path'
import addModule from '../Utility/addModule.js';
import { snakeToCamelCase, snakeToKebabCase, snakeToPascalCase} from '../Utility/textTransform.js';

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

function renameFiles(source, target, userInput) {
  if (fs.existsSync(source)) {
    const files = fs.readdirSync(source);

    files.forEach((file) => {
      const sourcePath = path.join(source, file);
      const targetPath = path.join(target, file);

      if (fs.lstatSync(sourcePath).isDirectory()) {
        renameFiles(sourcePath, targetPath, userInput);
      } else {
        const fileName = file.replace(
          /template-kebab-case/g,
          snakeToKebabCase(userInput),
        );
        const renamedTargetPath = path.join(target, fileName);
        fs.renameSync(sourcePath, renamedTargetPath);
      }
    });
  }
}

function copyFiles(source, target, userInput) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  const files = fs.readdirSync(source);

  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyFiles(sourcePath, targetPath, userInput);
    } else {
      const fileContent = fs.readFileSync(sourcePath, 'utf-8');
      const modifiedContent = replaceContent(fileContent, userInput);
      fs.writeFileSync(targetPath, modifiedContent);
    }
  });
}



function generateBasicTemplate(userInput) {
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

export default generateBasicTemplate;