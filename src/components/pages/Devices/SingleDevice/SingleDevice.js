import React from "react";
import { useParams, Link, Outlet } from "react-router-dom";

const SingleDevice = () => {
  const { id } = useParams();

  return (
    <div className="p-2">
      <div className="flex space-x-2">
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/devices/${id}/summary`}
        >
          Podsumowanie
        </Link>
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/devices/${id}`}
        >
          Powiązane naprawy
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default SingleDevice;
