import { languages } from '../src';
import * as core from '../src/core/core';
import { deepDiver, objectTranslator } from '../src/core/json_object';

describe(`JSON OBJECT`, () => {
  test('sanity check for test environment', () => {
    expect(true).toBeTruthy();
  });

  const test_object = {
    a: 'a',
    b: 'b',
    c: {
      d: 'd',
      e: 'e',
    },
    f: [
      {
        g: 'g',
        h: 'h',
      },
      {
        i: 'i',
        j: {
          k: 'k',
          l: 'l',
        },
        m: {
          n: {
            o: {
              p: {
                q: 'q',
              },
            },
          },
        },
      },
    ],
  };

  const from = languages.English;

  const to = languages.Dutch;

  afterEach(() => {
    jest.clearAllMocks();
  });

  const to_multiple = [
    languages.Bulgarian,
    languages.Catalan,
    languages.Turkish,
  ];

  it('should dive every value in the object', async () => {
    // arrange
    jest.spyOn(core, 'plaintranslate').mockResolvedValue('');

    // act
    await deepDiver(test_object, from, to);

    // assert
    expect(core.plaintranslate).toBeCalledTimes(10);
  });

  it('should translate object into one language', async () => {
    // arrange
    jest.spyOn(core, 'plaintranslate').mockResolvedValue('');

    // act
    const response = await objectTranslator(test_object, from, to);

    // assert
    expect(response).toMatchObject(test_object);
  });

  it('should translate object into multiple languages', async () => {
    // arrange
    jest.spyOn(core, 'plaintranslate').mockResolvedValue('');

    // act
    const response = await objectTranslator(test_object, from, to_multiple);

    // assert
    expect(response.length).toEqual(to_multiple.length);
  });
});
