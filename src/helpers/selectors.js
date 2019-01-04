/**
 * Creates selector function to detect if a state slice if fetching async data.
 *
 * @param {String} stateName
 * @returns {function(*): boolean}
 */
export const createGetIsFetchingSelector = stateName => state => (
  state[stateName].dataLoaded === false || state[stateName].isFetching
);

/**
 * Returns the count of selected nodes.
 * @param {Array} nodes
 * @returns {number}
 */
export const getSelectedNodesCountRecursive = (nodes) => {
  let count = 0;
  nodes.forEach((node) => {
    if (node.children && node.children.length > 0) {
      count += getSelectedNodesCountRecursive(node.children);
    }

    if (node.state && node.state.selected) {
      count++;
    }
  });

  return count;
};

/**
 * Returns the ids of the selected nodes.
 * @param {Array} nodes
 * @returns {Array}
 */
export const getSelectedNodeIdsRecursive = (nodes) => {
  const ids = [];
  nodes.forEach((node) => {
    if (node.children && node.children.length > 0) {
      const newIds = getSelectedNodeIdsRecursive(node.children);
      newIds.forEach((newId) => {
        ids.push(newId);
      });
    }

    if (node.state && node.state.selected) {
      ids.push(node.id);
    }
  });

  return ids;
};
