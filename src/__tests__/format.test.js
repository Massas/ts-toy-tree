const { format } = require('../format');
const { TestScheduler } = require('jest');

describe('format', () => {
    test('only root', () =>{
        expect(
            format({
                type: 'directory',
                name: 'root',
                children: [],
            }),
        ).toMatchSnapshot();
    });
});