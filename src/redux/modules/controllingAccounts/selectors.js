import { createSelector } from 'reselect';
import {
  createDataSelector,
  createGetItemsSelector,
  createGetPropertySelector
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
 * Returns the ID of the current selected item.
 */
export const getSelectedItemId = createGetPropertySelector('controllingAccounts', 'selectedId');

/**
 * Returns the ID of the current selected item.
 */
export const getLookupIdx = createGetPropertySelector('controllingAccounts', 'lookupIdx');

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
  [getData, getSelectedItemId, getLookupIdx],
  (data, parentId, lookupIdx) => {
    if (data.length < 1 || parentId === false) {
      return {};
    }

    const parent = data[lookupIdx[parentId]];

    return {
      p_ctrl_acct_id: parent.id,
      n_level: parent.n_level + 1
    };
  }
);
