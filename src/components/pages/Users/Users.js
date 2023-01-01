import React, { useContext, useEffect } from "react";
import UsersContext from "../../../context/Users/UsersContext";
import Loading from "../../layout/Loading";
import SectionName from "../../layout/SectionName";
import UsersItem from "./UsersItem";

const Users = ({ displayOnlyCustomers }) => {
  const { isLoading, users, fetchUsers, fetchCustomers } =
    useContext(UsersContext);

  useEffect(() => {
    displayOnlyCustomers ? fetchCustomers() : fetchUsers();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col w-full flex-start items-center">
      {displayOnlyCustomers ? (
        <SectionName text="Klienci" />
      ) : (
        <SectionName text="Użytkownicy" />
      )}
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
        <tbody>
          {users.map((e) => (
            <UsersItem key={e.id} item={e} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

Users.defaultProps = {
  displayOnlyCustomers: true,
};

export default Users;
