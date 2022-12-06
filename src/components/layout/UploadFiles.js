import React from "react";

const UploadFiles = (props) => {
  const { uploadedFiles, setUploadedFiles } = props.formState;
  //Handling file event
  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleFileAdd(chosenFiles);
  };

  //Add files to state
  const handleFileAdd = (files) => {
    const uploaded = [...uploadedFiles];
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    });
    setUploadedFiles(uploaded);
  };

  const removeFile = (fileNameToRemove) => {
    const temp = uploadedFiles.filter((item) => item.name !== fileNameToRemove);
    setUploadedFiles(temp);
  };

  return (
    <div className="flex flex-col items-center border-2 p-3 border-dashed rounded-md">
      <label htmlFor="photos" className="p-2">
        Zdjęcia
      </label>
      <label htmlFor="file-upload">
        <a className="block border-2 text-sm border-black p-1 font-bold uppercase text-black bg-white hover:bg-black hover:text-white duration-200 cursor-pointer">
          Dodaj
        </a>
      </label>
      <input
        id="file-upload"
        type="file"
        multiple
        accept=".png,.jpg,.jpeg,.bmp,.pdf"
        className="hidden"
        onChange={handleFileEvent}
      />
      <ul>
        {uploadedFiles.length > 0 &&
          uploadedFiles.map((file) => (
            <li key={file.name}>
              <a
                className="px-1 cursor-pointer text-red-600"
                onClick={() => removeFile(file.name)}
              >
                x
              </a>
              {file.name} {(file.size / 1024 / 1024).toPrecision(3)}MB
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UploadFiles;
