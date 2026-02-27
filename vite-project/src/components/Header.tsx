const Header = () => {
  return (
    <section className="text-center max-w-2xl">
      <p className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-300 shadow-sm shadow-slate-900/40">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        Powered by your custom vision model
      </p>
      <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-50">
        Welcome to the{" "}
        <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
          Cat &amp; Dog Breed Classifier
        </span>
      </h1>
      <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
        Upload an image and our AI will tell you whether it&apos;s a cat or a
        dog and identify the breed, along with a confidence score.
      </p>
    </section>
  );
};

export default Header;

