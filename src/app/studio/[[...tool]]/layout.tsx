export const metadata = {
  title: "Studio | La Condesa Weekly",
  description: "Content management for La Condesa Weekly",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        header:first-of-type { display: none !important; }
        footer { display: none !important; }
        main { min-height: auto !important; }
      `}</style>
      {children}
    </>
  );
}
