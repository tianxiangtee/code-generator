#!/usr/bin/env node
import inquirer from 'inquirer';
import executeTemplateA from './templateA.js';
import generateBasicTemplate from './Basic/index.js';

const templates = [
    { name: 'TemplateA', value: executeTemplateA },
    { name: 'Basic API', value: generateBasicTemplate },
    { name: 'Request Profile API', value: executeTemplateA },
    { name: 'Parent Child API', value: executeTemplateA },
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
    .then(async (answers) => {
        const selectedTemplate = answers.templateChoice;
        // If the selected template is generateBasicTemplate, ask for additional parameters
        if (selectedTemplate === generateBasicTemplate) {
            const params = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'moduleName',
                    message: 'Enter module name (catModule):',
                },
                {
                    type: 'input',
                    name: 'param2',
                    message: 'Is audit require (Y/N):',
                },
                // Add more prompts for additional parameters as needed
            ]);

            // Call the template function with the provided parameters
            selectedTemplate(params);
        } else {
            // For other templates, simply call the template function
            selectedTemplate();
        }
    });
