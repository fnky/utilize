var test = require('tap').test;
require('../');

test('string format with object', function(t) {
    t.equal(
        'This is a {foo} and it is {bar}'.f({ foo: 'string', bar: 'awesome' }),
        'This is a string and it is awesome',
        'Should return "string" at {obj}'
    );
    t.end();
});

test('string format with array', function(t) {
    t.equal(
        'This is a {0} and it is {1}'.f(['string', 'awesome']),
        'This is a string and it is awesome',
        'Should return "string" at {0} and "awesome" at {1}'
    );
    t.end();
});


test('string format with deep object', function(t) {
    t.equal(
        'This is {x.y.z} and {x.foo.bar.baz}'.f({
            x: { y: { z: 'nice' }, foo: { bar: { baz: 'awesome' }}}
        }),
        'This is nice and awesome',
        'Should return "nice" at {x.y.z} and "awesome" at {x.foo.bar.baz}'
    );
    t.end();
});


test('string format with function and scope', function(t) {
    t.equal(
        'My name is {agent.lastname}, {agent.fullname}. Yes, {agent.firstname}'
        .f({
            agent: {
                firstname: 'James',
                lastname: 'Bond',
                fullname: function() {
                    return this.agent.firstname + ' ' + this.agent.lastname;
                }
            }
        }),
        'My name is Bond, James Bond. Yes, James',
        'Should return "nice" at {x.y.z} and "awesome" at {x.foo.bar.baz}'
    );
    t.end();
});

test('recompose object', function(t) {
    var obj = {
        x: 'Big',
        y: { z: 'Brown' },
        foo: { bar: { baz: 'Fox' }},
        types: {
            date: new Date('1'),
            fn: function() {}
        }
    };

    t.equal(obj.recompose('x'), 'Big', 'Should return "Big"');
    t.equal(obj.recompose('y.z'), 'Brown', 'Should return "Brown"');
    t.equal(obj.recompose('foo.bar.baz'), 'Fox', 'Should return "Fox"');
    t.deepEqual(obj.recompose('types.date'), new Date('1'), 'Should return Date object instance');
    t.type(obj.recompose('types.fn'), 'function', 'Should return empty function');
    t.end();
});
