export const pagginate = (queryPage: number, queryLimit: string) => {
  const queryLimitNumber = Number.parseInt(queryLimit);
  const page = queryPage || 1;
  const limit = Number.isNaN(queryLimitNumber) ? 10 : queryLimitNumber;

  return {
    page,
    limit,
  };
};
