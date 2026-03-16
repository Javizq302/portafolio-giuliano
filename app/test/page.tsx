import Image from "next/image";

export default function TestPage() {
  const cdnUrl = process.env.NEXT_PUBLIC_BUNNY_CDN_URL;

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-white text-2xl font-bold">CDN Test Page</h1>

      <div className="text-gray-400 text-sm">
        CDN URL: <span className="text-cyan-400">{cdnUrl}</span>
      </div>

      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <video
          src={`${process.env.NEXT_PUBLIC_BUNNY_CDN_URL}/videos/intencion-creativecut.mp4`}
          controls
          width="100%"
        />
      </div>

      <p className="text-gray-500 text-xs">
        {cdnUrl}/galeria/colorlab/image-colorlab-c3-i1.png
      </p>
    </main>
  );
}
