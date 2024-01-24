import React, { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "../../../../context/User/UserContext";
import Loading from "../../../layout/Loading";
import UsersItem from "../UsersItem";
import axios from "axios";
import { Config } from "../../../../config";

const UsersList = ({ displayOnlyCustomers }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState();
  const { getToken } = useContext(UserContext);

  const fetchUsers = useCallback(async () => {
    const res = await axios.get(`${Config.apiUrl}/user/customers`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    setUsers(res.data);
    setIsLoading(false);
  }, [setUsers, setIsLoading]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (isLoading) return <Loading />;

  return (
    <>
      <p className="text-xs">
        Aby zobaczyć szczegóły, kliknij podwójnie na wybranej pozycji w tabeli
      </p>
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
          {/* <UserSearchRow displayCust={displayOnlyCustomers} /> */}
          {users &&
            users.map((e) => (
              <UsersItem
                key={e.id}
                displayCust={displayOnlyCustomers}
                item={e}
              />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersList;
