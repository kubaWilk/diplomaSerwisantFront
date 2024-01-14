import React, { Fragment, useEffect } from "react";

const SearchTable = ({ name, tableProperties, tableData, idSetter }) => {
  const tablePropsKeys = Object.keys(tableProperties);
  const tablePropsValues = Object.values(tableProperties);

  return (
    <Fragment>
      <table className="w-[90%] text-center repair-table">
        <thead>
          <tr>
            <th></th>
            {tablePropsValues &&
              tablePropsValues.map((item, index) => (
                <th key={`th${index}`}>{item}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((dataItem, index) => (
              <tr
                key={`tableData_tr${index}`}
                className="odd:bg-gray-100 hover:bg-gray-300"
              >
                <td key={`tableData_td${index}`}>
                  <input
                    type="radio"
                    id={`ChosenOption${dataItem.id}`}
                    value={dataItem.id}
                    name={name}
                    onChange={(e) => idSetter(e.target.value)}
                  />
                </td>
                {tablePropsKeys &&
                  tablePropsKeys.map((item, index) => (
                    <td key={`tablePropsKeys_td${index}`}>{dataItem[item]}</td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default SearchTable;
