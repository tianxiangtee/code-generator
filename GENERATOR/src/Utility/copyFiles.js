import fs from 'fs'
import path from 'path'
import replaceContent from './replaceContent.js';

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

export default copyFiles;