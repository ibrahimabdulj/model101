import Header from "../components/Header";
import UploadSection from "../components/UploadSection";
import ResultCard from "../components/ResultCard";
import StatusMessage from "../components/StatusMessage";
import Loader from "../components/Loader";
import { usePrediction } from "../hooks/usePrediction";

const Home = () => {
  const {
    selectedFile,
    previewUrl,
    result,
    isLoading,
    error,
    statusMessage,
    statusType,
    handleFileSelected,
    handleAnalyze,
  } = usePrediction();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center px-4 py-10">
      <main className="w-full max-w-5xl mx-auto flex flex-col items-center">
        <Header />

        <UploadSection
          onFileSelected={handleFileSelected}
          previewUrl={previewUrl}
          isLoading={isLoading}
          error={error}
        />

        <div className="mt-8 flex flex-col items-center">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!selectedFile || isLoading}
            className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium shadow-lg shadow-indigo-900/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
              !selectedFile || isLoading
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-slate-50 hover:brightness-110"
            }`}
          >
            {isLoading && <Loader />}
            Analyze Image
          </button>
          <p className="mt-2 text-xs text-slate-500">
            We only use your image to run the prediction.
          </p>
        </div>

        <StatusMessage message={statusMessage} type={statusType} />

        <ResultCard result={result} visible={!!result} />
      </main>
    </div>
  );
};

export default Home;

