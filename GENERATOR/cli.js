import inquirer from 'inquirer';

import executeTemplateA from './templateA.js';
import generateRequestProfileTemplate from './RequestProfile/index.js';

const templates = [
    { name: 'TemplateA', value: executeTemplateA },
    { name: 'Basic API', value: executeTemplateA },
    { name: 'Request Profile API', value: generateRequestProfileTemplate },
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
        // If the selected template is generateRequestProfileTemplate, ask for additional parameters
        if (selectedTemplate === generateRequestProfileTemplate) {
            const params = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'param1',
                    message: 'Enter param1:',
                },
                {
                    type: 'input',
                    name: 'param2',
                    message: 'Enter param2:',
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
