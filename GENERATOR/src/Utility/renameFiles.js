import fs from 'fs'
import path from 'path'
import { snakeToKebabCase } from './textTransform.js';

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

export default renameFiles;