export const metadata = {
  title: "Reaction Speed Test 🎮",
  description: "Zain's epic gaming universe",
  icons: {
    icon: "/favicon-32x32.png", // ✅ logo added here
  },
};
import Head from 'next/head';
import ReactionGame from '@/components/ReactionGame';

export default function ReactionPage() {
  return (
    <>
      <Head>
        <title>Reaction Speed Test – Zain’s Hub 🎮</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black text-white p-4">
        <ReactionGame />
      </div>
    </>
  );
}
