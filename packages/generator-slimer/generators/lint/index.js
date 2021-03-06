'use strict';
const Generator = require('../../lib/Generator');

// "lint": "eslint . --ext .js --cache",
const lintScript = 'eslint . --ext .js --cache';

const knownOptions = {
    type: {
        type: String,
        required: true,
        desc: 'What kind of project to create: [module, app, pkg, mono]'
    }
};
const knownArguments = {};

module.exports = class extends Generator {
    constructor(args, options) {
        super(args, options, knownArguments, knownOptions);
    }

    initializing() {
        super.initializing();
    }

    configuring() {
        // Add .eslintrc.js file (can be extended)
        this.fs.copy(
            this.templatePath('.eslintrc.js'),
            this.destinationPath('.eslintrc.js')
        );

        if (!this.props.skipTest) {
            // Add test/.eslintrc.js file (can be extended)
            this.fs.copy(
                this.templatePath('test/.eslintrc.js'),
                this.destinationPath('test/.eslintrc.js')
            );
        }

        if (this.props.type === 'mono') {
            this.fs.copy(
                this.templatePath('lerna.eslintignore'),
                this.destinationPath('.eslintignore')
            );
        }
    }

    // We use default, so that writing can be used to add more scripts after this
    default() {
        // Add lint script to package.json
        const destination = this.fs.readJSON(this.destinationPath('package.json'));
        if (destination) {
            // "lint": "eslint . --ext .js --cache",
            destination.scripts.lint = lintScript;

            // @TODO add skipTest option?
            if (!this.props.skipTest && destination.scripts.test) {
                // "posttest": "yarn lint",
                destination.scripts.posttest = 'yarn lint';
            }
            this.fs.writeJSON(this.destinationPath('package.json'), destination);
        }
    }

    install() {
        let options = {dev: true, exact: true};
        if (this.props.type === 'mono') {
            options['ignore-workspace-root-check'] = true;
        }

        // We don't need these dependencies if we're a mono repo package
        if (this.props.type !== 'pkg') {
            // Basic lint dependencies
            this.yarnInstall(['eslint', 'eslint-plugin-ghost'], options);
        }
    }
};
