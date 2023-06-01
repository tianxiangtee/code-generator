const fs = require('fs');
const path = require('path');
const readline = require('readline');

const templatePath = path.join(__dirname, 'custom-template');
const destinationPath = path.join(__dirname, 'generated-template');

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function replaceContent(content, userInput) {
  content = content.replace(/Template/g, capitalizeFirstLetter(userInput));
  return content.replace(/template/g, userInput);
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
        const fileName = file.replace(/template/g, userInput);
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
  copyFiles(templatePath, destinationPath, userInput.trim());
  renameFiles(destinationPath, destinationPath, userInput.trim());

  console.log('Template generation complete!');
  rl.close();
});
