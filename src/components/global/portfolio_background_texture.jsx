const BackgroundTexture = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-(--bg) overflow-x-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-0
                   bg-[url('/white_texture_paper.webp')] bg-cover bg-center
                   opacity-75 mix-blend-multiply"
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 pointer-events-none z-0
                   bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5)_0%,transparent_30%)]"
        aria-hidden="true"
      />

      <main className="relative z-2 w-full min-h-screen overflow-hidden">{children}</main>
    </div>
  );
};

export default BackgroundTexture;
