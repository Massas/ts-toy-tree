//const meow = require('meow');
//const { read } = require('./read');
//const { format } = require('./format');
// モジュール形式に書き換える
import meow from 'meow';
import { read } from './read';
import { format } from './format';

// exportsを使ったモジュールの公開を削除
//exports.main = (argv, stdout, stderr) => {
export const main = (argv, stdout, stderr) => {
    const cli = meow(
        `
        Usage
            $ toy-tree <directory>
        Examples
            $ tooy-tree
            $ tooy-tree path/to/dir
        `,
        {
            flags: {
                level: {
                    type: 'number',
                    alias: 'L',
                    default: Infinity,
                },
            },
            argv
        },
    );

    const dir = cli.input[0] || '.';

    const options = { level: cli.flags.level };
    if(options.level < 1){
        stderr('Error: Invalid level, must be greater than 0.');
        return 1;
    }

    let root;
    try{
        root = read(dir, options);
    } catch(e){
        stderr(`Error: ${e.message}`);
        return 1;
    }
    const output = format(root);

    stdout(output);

    return 0;
}