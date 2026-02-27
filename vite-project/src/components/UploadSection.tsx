import { useState } from "react";

type UploadSectionProps = {
  onFileSelected: (file: File | null) => void;
  previewUrl: string | null;
  isLoading: boolean;
  error: string | null;
};

const UploadSection = ({
  onFileSelected,
  previewUrl,
  isLoading,
  error,
}: UploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) {
      onFileSelected(null);
      return;
    }

    const file = files[0];
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!validTypes.includes(file.type)) {
      onFileSelected(null);
      return;
    }

    onFileSelected(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  return (
    <section className="w-full max-w-xl mx-auto mt-10">
      <div
        className={`relative flex flex-col items-center justify-center px-6 py-10 border-2 border-dashed rounded-2xl transition-colors duration-200 cursor-pointer bg-slate-900/40 backdrop-blur-sm ${
          isDragging
            ? "border-indigo-400 bg-indigo-500/10"
            : "border-slate-700 hover:border-indigo-400"
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <input
          id="file-upload"
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={onFileInputChange}
          disabled={isLoading}
        />

        <div className="flex flex-col items-center text-center pointer-events-none">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
            <span className="text-2xl">📷</span>
          </div>
          <p className="text-sm font-medium text-slate-100">
            Drag & drop an image here
          </p>
          <p className="mt-1 text-xs text-slate-400">
            or click to browse (JPG, JPEG, PNG)
          </p>
          {error && (
            <p className="mt-3 text-xs text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full">
              {error}
            </p>
          )}
        </div>
      </div>

      {previewUrl && (
        <div className="mt-6 flex justify-center">
          <div className="overflow-hidden rounded-2xl border border-slate-800 shadow-lg shadow-slate-900/40 max-w-xs">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default UploadSection;

