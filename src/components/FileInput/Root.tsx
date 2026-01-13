import {
  createContext,
  useContext,
  useId,
  useState,
  type ComponentProps,
} from "react";

type RootProps = ComponentProps<"div"> & {
  maxFileSizeInMB?: number;
  allowedExtensions?: FileInputExtensions[];
};

type FileInputContextType = {
  id: string;
  file?: File;
  maxFileSizeInMB: number;
  allowedExtensions: FileInputExtensions[];
  onFileSelected: (file: File | undefined) => void;
};

const FileInputContext = createContext({} as FileInputContextType);

export function Root({
  maxFileSizeInMB = 50,
  allowedExtensions = ["png", "jpeg", "webp", "jpg"],
  ...props
}: RootProps) {
  const id = useId();

  const [file, setFile] = useState<File>();

  function onFileSelected(file: File | undefined) {
    setFile(file);
  }

  return (
    <FileInputContext.Provider
      value={{ id, file, maxFileSizeInMB, allowedExtensions, onFileSelected }}
    >
      {<div {...props} />}
    </FileInputContext.Provider>
  );
}

export const useFileInputContext = () => useContext(FileInputContext);
