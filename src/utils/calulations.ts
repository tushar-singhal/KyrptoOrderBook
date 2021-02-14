export const addSize = (data: number[][]) => {
  return data.reduce(function (a, b) {
    return a + (b && b[1] ? b[1] : 0);
  }, 0);
};

export const manipulateArr = (data: number[][]) => {
  if (!data) {
    return data;
  }
  data = data.filter(function (val) {
    return val[1] !== 0;
  });

  let copyData = [...data];
  data.forEach(function (val) {
    val[2] = addSize(copyData);
    copyData = copyData.splice(1);
  });
  return data;
};

export const updateCurrentData = (oldData: number[][], newData: number[][]) => {
  if (!oldData || oldData.length === 0) {
    return newData;
  }

  if (!newData || newData.length === 0) {
    return oldData;
  }

  newData.forEach(function (val) {
    const index = oldData.findIndex((el) => el[0] === val[0]);
    if (index > -1) {
      oldData[index] = val;
    } else {
      oldData.push(val);
    }
  });

  return oldData.sort(function (a, b) {
    return b[0] - a[0];
  });
};

export const numberWithCommas = (x: number | string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
