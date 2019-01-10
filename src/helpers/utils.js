/**
 * Creates a lookup index for the indices
 * of an array.
 *
 * @param {Array} list
 * @param {String }keyProp
 */
export const getListIndicesLookupIdx = (list, keyProp = 'id') => {
  const lookupIdx = {};
  list.forEach((item, i) => {
    lookupIdx[item[keyProp]] = i;
  });

  return lookupIdx;
};
