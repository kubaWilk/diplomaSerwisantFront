import React, { useContext, useState } from "react";
import Dialog from "../../../layout/DialogBase/DialogBase";
import { useNavigate, useParams } from "react-router-dom";
import { Config } from "../../../../config";
import axios from "axios";
import UserContext from "../../../../context/User/UserContext";
import { saveAs } from "file-saver";

const ProtocolModal = () => {
  const { getToken } = useContext(UserContext);
  const protocolTypes = {
    REPAIR_OPENED: "Przyjęcia",
    REPAIR_CLOSED: "Wydania",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [protocolType, setProtocolType] = useState("Przyjęcia");
  const onSubmit = async () => {
    const value = Object.keys(protocolTypes).filter(
      (element) => protocolTypes[element] === protocolType
    );

    const res = await axios.get(
      `${Config.apiUrl}/repair/${id}/protocol?protocolType=${value[0]}`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: "application/pdf",
        },
      }
    );

    const contentDispositionHeader = res.headers["content-disposition"];
    const fileName = contentDispositionHeader
      ? contentDispositionHeader.split(";")[1].split("filename=")[1].trim()
      : "downloaded-file";

    const blob = new Blob([res.data]);

    saveAs(blob, fileName);
  };

  return (
    <Dialog>
      <h2 className="uppercase text-center font-bold m-2 text-lg">
        Pobierz protokół
        <form
          className="px-5 flex flex-col items-center justify-center"
          onSubmit={onSubmit}
        >
          <label
            htmlFor="protocolType"
            className="text-center text-sm font-bold"
          >
            Rodzaj protokołu
          </label>
          <select
            className="text-sm border border-dotted border-black text-center bg-transparent font-bold uppercase backdrop:bg-black"
            defaultValue={protocolType}
            onChange={(e) => {
              setProtocolType(e.target.value);
            }}
          >
            <option>{protocolTypes["REPAIR_OPENED"]}</option>
            <option>{protocolTypes["REPAIR_CLOSED"]}</option>
          </select>
        </form>
        <div className="mt-2 flex space-x-2 w-full justify-center items-center">
          <button
            type="submit"
            className="font-bold uppercase border-2 px-1 m-1 border-green-500 hover:text-white hover:bg-green-500 duration-200"
            onClick={(e) => onSubmit(e)}
          >
            Pobierz
          </button>
          <button
            className="font-bold uppercase border-2 px-1 m-1 border-red-500 hover:text-white hover:bg-red-500 duration-200"
            onClick={() => navigate(-1)}
          >
            Anuluj
          </button>
        </div>
      </h2>
    </Dialog>
  );
};

export default ProtocolModal;
