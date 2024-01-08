import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleRepairContext from "../../../../context/SingleRepair/SingleRepairContext";
import SectionName from "../../../layout/SectionName";
import { Link } from "react-router-dom";
import ReactImageGallery from "react-image-gallery";
import UserContext from "../../../../context/User/UserContext";
import Loading from "../../../layout/Loading";

const Photos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const {
    fetchRepairById,
    repair: { photos },
  } = useContext(SingleRepairContext);

  const {
    user: { jwt: token },
  } = useContext(UserContext);

  useEffect(() => {
    fetchRepairById(id, token)
      .then((e) => {
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-full flex flex-col justify-between relative">
      <div className="flex w-full h-full flex-col items-center justify-start">
        <SectionName text={`Naprawa #${id}`} />
        <h2 className="uppercase text-xl">Zdjęcia</h2>
        <Link className="text-sm" onClick={() => navigate(-1)}>
          Powrót
        </Link>

        {photos !== undefined ? (
          <div className="flex flex-wrap justify-center w-full">
            {photos.map((image, index) => (
              <div className="w-full lg:w-[33.3%] p-4">
                <a
                  href={image.original}
                  className="image-wrapper"
                  target="_blank"
                >
                  <img className="rounded" src={image.original} key={index} />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>Brak zdjęć</p>
        )}

        <div className="flex flex-col w-full items-center space-y-2 mt-3"></div>
      </div>
    </div>
  );
};

export default Photos;
