import 'react-virtualized/styles.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import Table, { Column } from 'react-virtualized/dist/es/Table';
import ExpandableCell from '../ExpandableCell';
import styles from './styles.less';

class ControllingAccountsTable extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    onExpand: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  _onSelectHandler = ({ rowData }) => {
    const { onSelect } = this.props;
    const { state: { isSelected } } = rowData;
    onSelect(rowData, !isSelected);
  };

  _rowClassName = ({ index }) => {
    if (index < 0) {
      return styles.headerRow;
    }

    const { data } = this.props;
    const { state: { isSelected } } = data[index];

    if (isSelected) {
      return styles.selectedRow;
    }

    return index % 2 === 0 ? styles.evenRow : styles.oddRow;
  };

  _noRowsRenderer = () => <div className={styles.noRows}>No rows</div>;

  _nameCellRenderer = ({ rowData, cellData }) => {
    if (rowData.n_level < 1) {
      return cellData;
    }

    const blank = '    '.repeat(rowData.n_level);
    return blank + cellData;
  };

  _explandableCellRenderer = ({ rowData }) => {
    const { onExpand } = this.props;
    return (
      <ExpandableCell
        rowData={rowData}
        onChange={onExpand}
      />
    );
  };

  render() {
    const { data } = this.props;
    const rowGetter = ({ index }) => data[index];

    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <Table
            ref={(ref) => { this.Table = ref; }}
            headerClassName={styles.headerColumn}
            headerHeight={24}
            height={300}
            noRowsRenderer={this._noRowsRenderer}
            overscanRowCount={10}
            rowClassName={this._rowClassName}
            rowHeight={24}
            rowGetter={rowGetter}
            rowCount={data.length}
            width={width}
            onRowClick={this._onSelectHandler}
          >
            <Column
              dataKey="id"
              width={20}
              cellRenderer={this._explandableCellRenderer}
            />
            <Column
              dataKey="name"
              label="NAME"
              width={300}
              cellRenderer={this._nameCellRenderer}
              className={styles.nameColumn}
            />
            <Column
              dataKey="code"
              label="CODE"
              width={150}
            />
            <Column
              dataKey="insert_dttm"
              label="CREATED"
              width={150}
            />
            <Column
              dataKey="update_dttm"
              label="MODIFIED"
              width={150}
            />
            <Column
              width={150}
              dataKey="balance"
              label="BALANCE"
              flexGrow={1}
            />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

export default ControllingAccountsTable;
