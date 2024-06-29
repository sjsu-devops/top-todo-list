export const getIndex = (array: { id: string }[], id: string) => {
  return array.findIndex((item) => item.id === id);
};
