// generate-uuid.js

const assert = require('assert');
const _ = require('lodash');
const uuid = require('uuid');
const {generateUUID} = require('../../src/utils/generate-uuid');

describe('UUID Generation', () => {

  it('Generate UUID for flat object', () => {
    const testObject = {
      name: 'test',
      description: 'test',
    };
    const actual = generateUUID(testObject);
    const keys = _.keys(testObject);
    const expected = ['id', ...keys];
    assert.deepStrictEqual(expected, _.keys(actual));
    assert.strictEqual(true, uuid.validate(actual.id));
  });

  it('Generate UUID for nested object', () => {
    const testObject = {
      name: 'test',
      description: 'test',
      arf: {
        welp: 'test',
        derp: {
          plerp: 'test',
          rune: {
            lad: 'test',
          },
        },
      },
    };
    const actual = generateUUID(testObject, {nested: true});
    assert.strictEqual(true, uuid.validate(actual.id));
    assert.strictEqual(true, uuid.validate(actual.arf.id));
    assert.strictEqual(true, uuid.validate(actual.arf.derp.id));
    assert.strictEqual(true, uuid.validate(actual.arf.derp.rune.id));
  });

  it('Generate UUID for nested object with nested arrays', () => {
    const testObject = {
      name: 'test',
      description: 'test',
      arf: [
        {
          name: 'test',
          derp: [
            {
              welp: 'test',
            }
          ],
        },
        {
          name: 'test',
          derp: [
            {
              welp: 'test',
            }
          ],
        },
      ],
    };
    const actual = generateUUID(testObject, {nested: true});
    assert.strictEqual(true, uuid.validate(actual.id));
    assert.strictEqual(true, uuid.validate(actual.arf[0].id));
    assert.strictEqual(true, uuid.validate(actual.arf[0].derp[0].id));
  });

  it('Generate UUID for flat array of objects', () => {
    const testArray = [
      {
        name: 'test',
      },
      {
        name: 'test',
      },
    ];
    const [item1, item2] = generateUUID(testArray);
    assert.strictEqual(true, uuid.validate(item1.id));
    assert.strictEqual(true, uuid.validate(item2.id));
  });

  it('Generate UUID for array of nested objects', () => {
    const testArray = [
      {
        name: 'test',
        obj: {
          data: 'test',
        }
      },
      {
        name: 'test',
        obj: {
          data: 'test',
        }
      },
    ];
    const [item1, item2] = generateUUID(testArray, {nested: true});
    assert.strictEqual(true, uuid.validate(item1.id));
    assert.strictEqual(true, uuid.validate(item2.id));
    assert.strictEqual(true, uuid.validate(item1.obj.id));
    assert.strictEqual(true, uuid.validate(item2.obj.id));
  });

  it('Generate UUID for array of objects with nested arrays', () => {
    const testObject = [
      {
        name: 'test',
        description: 'test',
        arf: [
          {name: 'test', derp: [{welp: 'test'}]},
          {name: 'test', derp: [{welp: 'test'}]},
        ],
      },
      {
        name: 'test',
        description: 'test',
        arf: [
          {name: 'test', derp: [{welp: 'test'}]},
          {name: 'test', derp: [{welp: 'test'}]},
        ],
      },
    ];
    const [item1, item2] = generateUUID(testObject, {nested: true});
    assert.strictEqual(true, uuid.validate(item1.id));
    assert.strictEqual(true, uuid.validate(item2.id));
    assert.strictEqual(true, uuid.validate(item1.arf[0].id));
    assert.strictEqual(true, uuid.validate(item2.arf[0].id));
    assert.strictEqual(true, uuid.validate(item1.arf[0].derp[0].id));
    assert.strictEqual(true, uuid.validate(item2.arf[0].derp[0].id));

  });

  it('Generate UUID for object already containing ID', () => {
    const testObject = {
      id: '123',
      name: 'test',
      derp: {
        _id: '123',
        welp: 'test'
      }
    };
    const res = generateUUID(testObject);
    assert.strictEqual(testObject.id, res.id);
    assert.strictEqual(testObject.derp._id, res.derp._id);
  });

  it('Generate UUID for array already containing ID', () => {
    const testObject = [{
      id: '123',
      name: 'test',
      derp: {
        _id: '123',
        welp: 'test'
      }
    }];
    const res = generateUUID(testObject);
    assert.strictEqual(testObject[0].id, res[0].id);
    assert.strictEqual(testObject[0].derp._id, res[0].derp._id);
  });

  it('Generate UUID for invalid value and trigger error', () => {
    try {
      generateUUID('string');
    } catch (err) {
      assert.strictEqual('DevErr: missing valid source', err.message);
    }
  });
});
