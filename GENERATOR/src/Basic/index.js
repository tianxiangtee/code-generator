#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path from 'path'
import addModule from '../Utility/addModule.js';
import { snakeToKebabCase, snakeToPascalCase} from '../Utility/textTransform.js';
import renameFiles from '../Utility/renameFiles.js';
import copyFiles from '../Utility/copyFiles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const currentDirectory = process.cwd()
const template = path.join(__dirname, 'custom-template');
const templateWithoutAudit = path.join(__dirname, 'custom-template-without-audit');
const defaultPath = path.join(currentDirectory, 'src/module');

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