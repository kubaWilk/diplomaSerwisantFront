const getDateString = (date) => {
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

const translateCostTypes = (type, namesObj) => {
  const keys = Object.keys(namesObj);
  const values = Object.values(namesObj);

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === type) return values[i];
  }
};

export { getDateString, translateCostTypes };
