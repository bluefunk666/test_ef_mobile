import { Op } from 'sequelize';

export const createLikeQuery = (sourceQuery, fields: string[]) => {
  const conditions = [];

  for (let [key, value] of Object.entries(sourceQuery)) {
    key = key.trim();
    value = `${value}`.trim();

    if (!fields.includes(key)) continue;

    let operator;
    const valueIsInt = !Number.isNaN(Number.parseInt(`${value}`));
    if (valueIsInt) {
      operator = Op.eq;
      value = Number.parseInt(`${value}`);
    } else {
      operator = Op.like;
      value = `%${value}%`;
    }

    conditions.push({
      [key]: {
        [operator]: value,
      },
    });
  }

  return conditions;
};
