import { somar } from './somar';

/**
 * ******** MANUAL TEST ************
 * This test is an example;
 * Use command: npm test + relative path;
 * For monitored tests, use the command: npm run test:watch + relative path + file witch /
 * Example: npm run test:watch test/controllers/user/user.controller.test.spec.ts  for monitoring;
 *      Or: npm test test/controllers/user/user.controller.test.spec.ts unit test;
 */
test('Este é o meu primeiro teste', () => {
  const resultado = somar(3, 2);
  const expected = 5;

  expect(resultado).toEqual(expected);
});
