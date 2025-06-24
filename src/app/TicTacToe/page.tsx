export const metadata = {
  title: "Tic Tac Toe 🎮",
  description: "Zain's epic gaming universe",
  icons: {
    icon: "/favicon-32x32.png", // ✅ logo added here
  },
};
import TicTacToe from '@/components/TicTacToe';

export default function Page() {
  return <TicTacToe />;
}
