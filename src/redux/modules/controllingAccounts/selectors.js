import { createSelector } from 'reselect';
import {
  createDataSelector,
  createGetItemsSelector
} from 'javascript-utils/lib/selectors';
import { treeify } from 'javascript-utils/lib/array';

const _getData = createDataSelector('controllingAccounts', 'dataLoaded', 'data');

/**
 * Returns the controlling accounts from the state.
 */
export const getData = createGetItemsSelector(_getData);

export const getTreeData = createSelector(
  [getData],
  (data) => {
    if (data.length < 1) {
      return [];
    }

    return treeify(data, 'id', 'p_ctrl_acct_id');
  }
);
