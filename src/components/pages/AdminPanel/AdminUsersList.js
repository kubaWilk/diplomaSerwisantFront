import React, { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "../../../context/User/UserContext";
import axios from "axios";
import { Config } from "../../../config";
import Loading from "../../layout/Loading";
import UsersItem from "../Users/UsersItem";
import AdminUserItem from "./AdminUserItem";

const AdminUsersList = () => {
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
            <th>Nazwa użytkownika</th>
            <th>E-Mail</th>
            <th>Rola</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((e) => <AdminUserItem key={e.id} item={e} />)}
        </tbody>
      </table>
    </>
  );
};

export default AdminUsersList;
