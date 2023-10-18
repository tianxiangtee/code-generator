import inquirer from 'inquirer';

import executeTemplateA from './templateA.js';
import executeTemplateB from './templateB.js';
import executeTemplateC from './templateC.js';

const templates = [
    { name: 'TemplateA', value: executeTemplateA },
    { name: 'TemplateB', value: executeTemplateB },
    { name: 'TemplateC', value: executeTemplateC },
];

inquirer
    .prompt([
        {
            type: 'list',
            name: 'templateChoice',
            message: 'Choose a template:',
            choices: templates,
        },
    ])
    .then((answers) => {
        const selectedTemplate = answers.templateChoice;
        selectedTemplate();
    });
