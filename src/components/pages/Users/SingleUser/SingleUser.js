import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import SectionName from "../../../layout/SectionName";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../../layout/Loading";

const SingleUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${id}`);

      setUser(res.data);
      setIsLoading(false);
      console.log(user);
    };

    fetchUser();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <SectionName text={`${user.firstName} ${user.lastName}`} />
      <div className="flex space-x-2">
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/user/${id}`}
        >
          Podsumowanie
        </Link>
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/user/${id}/repairs`}
        >
          Naprawy
        </Link>
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/user/${id}/devices`}
        >
          Urządzenia
        </Link>
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/user/${id}/edit`}
        >
          Edytuj
        </Link>
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/user/${id}`}
        >
          Usuń
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default SingleUser;
