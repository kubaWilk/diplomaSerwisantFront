import React from "react";
import { useParams, Link, Outlet } from "react-router-dom";

const SingleDevice = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <div className="flex space-x-2">
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/devices/${id}/summary`}
        >
          Podsumowanie
        </Link>
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/devices/${id}/repairs`}
        >
          Powiązane naprawy
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default SingleDevice;
