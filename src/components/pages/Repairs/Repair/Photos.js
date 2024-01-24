import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleRepairContext from "../../../../context/SingleRepair/SingleRepairContext";
import SectionName from "../../../layout/SectionName";
import { Link } from "react-router-dom";
import ReactImageGallery from "react-image-gallery";
import UserContext from "../../../../context/User/UserContext";
import Loading from "../../../layout/Loading";
import { Config } from "../../../../config";
import axios from "axios";

const Photos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState();
  const { getToken } = useContext(UserContext);

  const fetchRepairPhotos = useCallback(async () => {
    await axios
      .get(`${Config.apiUrl}/repair/${id}/files/all`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(async (res) => {
        if (res.status === 200) {
          const urls = Array.of(...res.data);

          const images = urls.map(async (element) => {
            const imageUrl = await axios
              .get(`${element.downloadUrl}`, {
                responseType: "blob",
                headers: {
                  Authorization: `Bearer ${getToken()}`,
                },
              })
              .then((res) => {
                return URL.createObjectURL(res.data);
              })
              .catch((e) => console.log(e));

            return { original: imageUrl };
          });

          setPhotos(await Promise.all(images));
          setIsLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setPhotos, setIsLoading]);

  useEffect(() => {
    fetchRepairPhotos();
  }, [fetchRepairPhotos]);

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
              <div className="w-full lg:w-[33.3%] p-4" key={"div" + index}>
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
          <>
            {/* <a href={imageUrl}>test</a> */}
            <p>Brak zdjęć</p>
          </>
        )}

        <div className="flex flex-col w-full items-center space-y-2 mt-3"></div>
      </div>
    </div>
  );
};

export default Photos;
