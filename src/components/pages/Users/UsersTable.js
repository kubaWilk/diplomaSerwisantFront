import React, { Fragment, useContext } from "react";
import UsersContext from "../../../context/Users/UsersContext";
import UserSearchRow from "./UserSearchRow";
import UsersItem from "./UsersItem";

const UsersTable = () => {
  const { users } = useContext(UserContext);

  return (
    <Fragment>
      <table className="w-[90%] text-center repair-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Miejscowość</th>
            <th>Kod pocztowy</th>
            <th>Nr kontaktowy</th>
          </tr>
        </thead>
        <UserSearchRow />
        <tbody>
          {users.map((e) => (
            <UsersItem key={e.id} item={e} />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default UsersTable;
