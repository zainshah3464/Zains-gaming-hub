export const metadata = {
  title: "Flappy Bird 🎮",
  description: "Zain's epic gaming universe",
  icons: {
    icon: "/favicon-32x32.png", // ✅ logo added here
  },
};
import FlappyBird from "@/components/FlappyBird";

export default function FlappyPage() {
  return (
    <main>
      <FlappyBird />
    </main>
  );
}
