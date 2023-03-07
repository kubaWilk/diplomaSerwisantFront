import React, { useContext, useEffect } from "react";
import UserContext from "../../../context/User/UserContext";
import Loading from "../../layout/Loading";
import SectionName from "../../layout/SectionName";
import UserSearchRow from "./UserSearchRow";
import UsersItem from "./UsersItem";

const Users = ({ displayOnlyCustomers }) => {
  const { isLoading, users, getUsers, getCustomers } = useContext(UserContext);

  useEffect(() => {
    displayOnlyCustomers ? getCustomers() : getUsers();
    //eslint-disable-next-line
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-start w-full">
      {displayOnlyCustomers && <SectionName text="Klienci" />}

      <p className="text-xs">
        Aby zobaczyć szczegóły, kliknij podwójnie na wybranej pozycji w tabeli
      </p>
      <table className="w-[90%] text-center repair-table">
        <thead>
          <tr>
            <th>ID</th>
            {!displayOnlyCustomers && <th>Rola</th>}
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Miejscowość</th>
            <th>Kod pocztowy</th>
            <th>Nr kontaktowy</th>
          </tr>
        </thead>
        <tbody>
          <UserSearchRow displayCust={displayOnlyCustomers} />
          {users.map((e) => (
            <UsersItem key={e.id} displayCust={displayOnlyCustomers} item={e} />
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
