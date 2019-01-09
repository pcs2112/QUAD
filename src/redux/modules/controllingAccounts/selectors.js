import { createSelector } from 'reselect';
// import sortBy from 'lodash/sortBy';
import {
  createDataSelector,
  createGetItemsSelector
} from 'javascript-utils/lib/selectors';
import { treeify } from 'javascript-utils/src/array';

const untreeify = (list) => {
  let result = [];
  list.forEach((obj) => {
    const { children } = obj;
    delete (obj.children);
    result.push(obj);
    if (obj.state.isExpanded) {
      if (Array.isArray(children)) {
        result = result.concat(untreeify(children));
      }
    }
  });

  return result;
};

const _getData = createDataSelector('controllingAccounts', 'dataLoaded', 'data');

/**
 * Returns the controlling accounts from the state.
 */
export const getData = createGetItemsSelector(_getData);

/**
 * Returns the hierarchy of expanded items and their first level children.
 */
export const getHierarchyData = createSelector(
  [getData],
  (data) => {
    if (data.length < 1) {
      return [];
    }

    const treeData = treeify(data, 'id', 'p_ctrl_acct_id');
    return untreeify(treeData);
  }
);

/**
 * Gets the initial form values for creating a new controlling account.
 */
export const getCreateInitialValues = createSelector(
  [getData],
  (data) => {
    if (data.length < 1) {
      return {};
    }

    return {};

    /* const parentNodeId = nodeIds[nodeIds.length - 1];
    const parentNode = nodes.find(node => node.id === parentNodeId);

    return {
      p_ctrl_acct_id: parentNode.id,
      n_level: parentNode.n_level + 1
    }; */
  }
);
