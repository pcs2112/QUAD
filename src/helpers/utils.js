/**
 * Creates a lookup index for the indices
 * of an array.
 *
 * @param {Array} list
 * @param {String|Array} keyProps
 */
export const getListIndicesLookupIdx = (list, keyProps = 'id') => {
  const lookupIdx = {};
  if (typeof keyProps === 'string') {
    list.forEach((item, i) => {
      lookupIdx[keyProps][item[keyProps]] = i;
    });
  } else {
    list.forEach((item, i) => {
      keyProps.forEach((keyProp) => {
        lookupIdx[keyProp][item[keyProps]] = i;
      });
    });
  }

  return lookupIdx;
};
