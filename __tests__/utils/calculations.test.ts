import {manipulateArr, addSize, updateCurrentData} from '../../src/utils/calulations';

test('manipulateArr', () => {
  const mock1 = [
    [49272.0, 25000.0],
    [49275.0, 10.0],
  ];
  const mock2 = [
    [39272.0, 25000.0],
    [29275.0, 0.0],
  ];
  expect(manipulateArr(mock1)).toEqual([
    [49272, 25000, 25010],
    [49275, 10, 10],
  ]);
  expect(manipulateArr(mock2)).toEqual([[39272.0, 25000.0, 25000]]);
});

test('addSize', () => {
  const mock1 = [
    [49272.0, 25000.0],
    [49275.0, 10.0],
  ];
  expect(addSize(mock1)).toEqual(25010);
});

test('updateCurrentData', () => {
  const mock1 = [
    [49272.0, 25000.0],
    [49275.0, 10.0],
  ];
  const mock2 = [
    [39272.0, 25000.0],
    [29275.0, 0.0],
  ];
  expect(updateCurrentData(mock1, mock2)).toEqual([
    [49275, 10],
    [49272, 25000],
    [39272, 25000],
    [29275, 0],
  ]);
});
