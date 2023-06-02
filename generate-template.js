const fs = require('fs');
const path = require('path');
const readline = require('readline');

const templatePath = path.join(__dirname, 'custom-template');
const defaultPath = path.join(__dirname, 'src');

// Variable use camelCase
function snakeToCamelCase(userInput) {
  return userInput.replace(/(_\w)/g, (match) => match[1].toUpperCase());
}

// DB name use snakeCase
function snakeToKebabCase(userInput) {
  return userInput.replace(/_/g, '-');
}

// Class use Pascal Case
function snakeToPascalCase(userInput) {
  return userInput
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter a name for the resource: ', (userInput) => {
  let destinationPath = path.join(defaultPath, snakeToPascalCase(userInput));
  copyFiles(templatePath, destinationPath, userInput.trim());
  renameFiles(
    destinationPath,
    destinationPath,
    snakeToKebabCase(userInput.trim()),
  );

  console.log('Template generation complete!');
  rl.close();
});
