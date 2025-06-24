'use client';

import { useEffect, useState, useRef } from 'react';
import NameModal from './NameModal';

interface Q {
  question: string;
  options: string[];
  answer: string;
}

const allQuestions: Q[] = [
  { question: "2 + 2 * 2 = ?", options: ["6", "8", "4", "10"], answer: "6" },
  { question: "Next number: 2, 6, 12, 20, ?", options: ["30", "28", "26", "32"], answer: "30" },
  { question: "Who discovered gravity?", options: ["Einstein", "Newton", "Tesla", "Edison"], answer: "Newton" },
  { question: "Square root of 144?", options: ["10", "12", "14", "11"], answer: "12" },
  { question: "9 + 3 ÷ 3 = ?", options: ["4", "12", "10", "6"], answer: "10" },
  { question: "Fastest land animal?", options: ["Tiger", "Lion", "Cheetah", "Horse"], answer: "Cheetah" },
  { question: "Most abundant gas in air?", options: ["Oxygen", "Nitrogen", "CO2", "Hydrogen"], answer: "Nitrogen" },
  { question: "Next: 512,256,128, ?", options: ["32", "64", "16", "8"], answer: "64" },
  { question: "At what temp does water boil?", options: ["100°C", "0°C", "50°C", "150°C"], answer: "100°C" },
  { question: "Capital of Japan?", options: ["Kyoto", "Seoul", "Tokyo", "Osaka"], answer: "Tokyo" },
  { question: "What is 15% of 200?", options: ["30", "20", "25", "15"], answer: "30" },
  { question: "Opposite of 'gregarious'?", options: ["sociable", "shy", "happy", "talkative"], answer: "shy" },
  { question: "Largest planet in solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter" },
  { question: "Which element has symbol 'Fe'?", options: ["Iron", "Gold", "Silver", "Lead"], answer: "Iron" },
  { question: "What is 7²?", options: ["14", "49", "21", "28"], answer: "49" },
  { question: "100 in binary = ?", options: ["4", "6", "5", "8"], answer: "4" },
  { question: "RGB stands for?", options: ["Red Green Blue", "Right Good Bad", "Random Go Back", "Read Give Book"], answer: "Red Green Blue" },
  { question: "Capital of Australia?", options: ["Sydney", "Canberra", "Melbourne", "Perth"], answer: "Canberra" },
  { question: "First man on the moon?", options: ["Yuri Gagarin", "Buzz Aldrin", "Neil Armstrong", "Michael Collins"], answer: "Neil Armstrong" },
  { question: "Which number is prime?", options: ["9", "15", "17", "21"], answer: "17" },
  { question: "What is 11 × 11?", options: ["121", "111", "132", "101"], answer: "121" },
  { question: "Awake by day, sleeps at night — who?", options: ["bat", "owl", "cat", "lion"], answer: "owl" },
  { question: "Solve: 8 ÷ (4 – 2)", options: ["2", "4", "1", "6"], answer: "4" },
  { question: "Which shape has five sides?", options: ["Hexagon", "Square", "Pentagon", "Heptagon"], answer: "Pentagon" },
  { question: "What is the color of the sky?", options: ["Blue", "Yellow", "Green", "Red"], answer: "Blue" },
  { question: "5 x (3 + 2) = ?", options: ["25", "20", "15", "30"], answer: "25" },
{ question: "Which is not a primary color?", options: ["Red", "Blue", "Green", "Yellow"], answer: "Green" },
{ question: "Which planet has rings?", options: ["Mars", "Venus", "Saturn", "Earth"], answer: "Saturn" },
{ question: "3³ = ?", options: ["6", "9", "27", "12"], answer: "27" },
{ question: "Which organ pumps blood?", options: ["Lungs", "Brain", "Heart", "Liver"], answer: "Heart" },
{ question: "Which is heavier: 1kg of iron or 1kg of cotton?", options: ["Iron", "Cotton", "Same", "Can't say"], answer: "Same" },
{ question: "Water's chemical formula?", options: ["O2", "H2O", "CO2", "H2SO4"], answer: "H2O" },
{ question: "Who painted Mona Lisa?", options: ["Picasso", "Leonardo da Vinci", "Van Gogh", "Michelangelo"], answer: "Leonardo da Vinci" },
{ question: "Which month has 28 days?", options: ["February", "All", "June", "April"], answer: "All" },
{ question: "Which animal is known as 'Ship of the Desert'?", options: ["Horse", "Donkey", "Camel", "Goat"], answer: "Camel" },
{ question: "Speed of light?", options: ["3,000 km/s", "30,000 km/s", "300,000 km/s", "3,000,000 km/s"], answer: "300,000 km/s" },
{ question: "Which number is Roman 'X'?", options: ["5", "10", "50", "100"], answer: "10" },
{ question: "Which fruit has seeds outside?", options: ["Banana", "Strawberry", "Apple", "Grapes"], answer: "Strawberry" },
{ question: "What gas do plants release?", options: ["CO2", "O2", "Nitrogen", "Hydrogen"], answer: "O2" },
{ question: "Brain of computer?", options: ["CPU", "RAM", "ROM", "Mouse"], answer: "CPU" },
{ question: "Smallest even prime number?", options: ["1", "0", "2", "4"], answer: "2" },
{ question: "Which day comes after Friday?", options: ["Thursday", "Saturday", "Sunday", "Monday"], answer: "Saturday" },
{ question: "Which bird can mimic humans?", options: ["Pigeon", "Parrot", "Crow", "Eagle"], answer: "Parrot" },
{ question: "How many sides in octagon?", options: ["6", "7", "8", "9"], answer: "8" },
{ question: "Which continent is India in?", options: ["Africa", "Asia", "Europe", "Australia"], answer: "Asia" },
{ question: "What’s the freezing point of water?", options: ["0°C", "32°C", "100°C", "10°C"], answer: "0°C" },
{ question: "What color is chlorophyll?", options: ["Red", "Blue", "Green", "Yellow"], answer: "Green" },
{ question: "Which is NOT a mammal?", options: ["Whale", "Bat", "Shark", "Human"], answer: "Shark" },
{ question: "How many hours in a day?", options: ["12", "24", "36", "48"], answer: "24" },
{ question: "Which direction does the sun rise?", options: ["West", "North", "East", "South"], answer: "East" },
{ question: "What is the capital of Pakistan?", options: ["Lahore", "Karachi", "Islamabad", "Peshawar"], answer: "Islamabad" },
{ question: "How many bones in the human body?", options: ["206", "208", "210", "205"], answer: "206" },
{ question: "Which planet is called the Red Planet?", options: ["Mars", "Earth", "Venus", "Jupiter"], answer: "Mars" },
{ question: "What currency is used in Japan?", options: ["Dollar", "Won", "Yen", "Ruble"], answer: "Yen" },
{ question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Dickens", "Tolkien", "Hemingway"], answer: "Shakespeare" },
{ question: "How many continents in the world?", options: ["5", "6", "7", "8"], answer: "7" },
{ question: "What does 'CPU' stand for?", options: ["Central Process Unit", "Central Processing Unit", "Computer Power Unit", "Control Panel Unit"], answer: "Central Processing Unit" },
{ question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], answer: "Mercury" },
{ question: "The longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Indus"], answer: "Nile" },
{ question: "First letter in Greek alphabet?", options: ["Beta", "Gamma", "Alpha", "Omega"], answer: "Alpha" },
{ question: "Which bird lays the largest egg?", options: ["Eagle", "Ostrich", "Hen", "Duck"], answer: "Ostrich" },
{ question: "Sun is a...?", options: ["Planet", "Moon", "Star", "Comet"], answer: "Star" },
{ question: "How many legs does a spider have?", options: ["6", "8", "10", "12"], answer: "8" },
{ question: "What is the largest ocean?", options: ["Atlantic", "Arctic", "Indian", "Pacific"], answer: "Pacific" },
{ question: "Which country has the most population?", options: ["USA", "India", "China", "Russia"], answer: "China" },
{ question: "Which vitamin from sunlight?", options: ["A", "B", "C", "D"], answer: "D" },
{ question: "Taj Mahal is in?", options: ["Delhi", "Mumbai", "Agra", "Hyderabad"], answer: "Agra" },
{ question: "What color is a giraffe’s tongue?", options: ["Pink", "Black", "Blue", "Purple"], answer: "Blue" },
{ question: "Which gas do humans breathe in?", options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"], answer: "Oxygen" },
{ question: "3 x 4 + 6 ÷ 2 = ?", options: ["15", "18", "12", "21"], answer: "18" },
{ question: "In which sport is the term 'Love' used?", options: ["Football", "Cricket", "Tennis", "Hockey"], answer: "Tennis" },
{ question: "Which metal is liquid at room temp?", options: ["Gold", "Mercury", "Iron", "Silver"], answer: "Mercury" },
{ question: "Which shape has no corners?", options: ["Square", "Circle", "Triangle", "Pentagon"], answer: "Circle" },
{ question: "What is 1000 ÷ 25?", options: ["25", "30", "40", "50"], answer: "40" },
{ question: "Which month has Halloween?", options: ["September", "October", "November", "December"], answer: "October" },
{ question: "What does HTML stand for?", options: ["HyperText Markup Language", "Hyper Tool Multi Language", "Home Tool Markup Language", "Hyperlink Text Management Language"], answer: "HyperText Markup Language" },
{ question: "What symbol is used for comments in JavaScript?", options: ["//", "##", "<!--", "**"], answer: "//" },
{ question: "Which language is used for styling web pages?", options: ["HTML", "JQuery", "CSS", "XML"], answer: "CSS" },
{ question: "What does 'const' declare in JavaScript?", options: ["A variable that can’t be reassigned", "A loop", "A function", "A class"], answer: "A variable that can’t be reassigned" },
{ question: "What does 'NaN' stand for in JS?", options: ["No actual Number", "Not a Null", "Not a Number", "Next available Number"], answer: "Not a Number" },
{ question: "I speak without a mouth and hear without ears. Who am I?", options: ["Echo", "Ghost", "Wind", "Mind"], answer: "Echo" },
{ question: "What comes once in a minute, twice in a moment, but never in a thousand years?", options: ["The letter M", "A second", "Time", "Luck"], answer: "The letter M" },
{ question: "Forward I’m heavy, backward I’m not. What am I?", options: ["Ton", "Rock", "Iron", "Mud"], answer: "Ton" },
{ question: "Which month has 28 days?", options: ["February", "All months", "December", "June"], answer: "All months" },
{ question: "What has keys but can’t open locks?", options: ["Piano", "Map", "Door", "Box"], answer: "Piano" },
{ question: "Who is the founder of Pakistan?", options: ["Allama Iqbal", "Quaid-e-Azam", "Liaquat Ali Khan", "Zulfiqar Ali Bhutto"], answer: "Quaid-e-Azam" },
{ question: "National language of Pakistan?", options: ["Punjabi", "Urdu", "English", "Sindhi"], answer: "Urdu" },
{ question: "Which city is known as the City of Lights?", options: ["Lahore", "Islamabad", "Karachi", "Peshawar"], answer: "Karachi" },
{ question: "Pakistan came into being in which year?", options: ["1940", "1947", "1956", "1965"], answer: "1947" },
{ question: "What is the national sport of Pakistan?", options: ["Cricket", "Hockey", "Football", "Kabaddi"], answer: "Hockey" },
{ question: "Who is the main character of 'Naruto'?", options: ["Sasuke", "Kakashi", "Naruto", "Itachi"], answer: "Naruto" },
{ question: "Which anime features a notebook that can kill?", options: ["Death Parade", "Attack on Titan", "Death Note", "Tokyo Ghoul"], answer: "Death Note" },
{ question: "Which console is developed by Sony?", options: ["Xbox", "PlayStation", "Nintendo Switch", "Steam Deck"], answer: "PlayStation" },
{ question: "In PUBG, what does 'AWM' stand for?", options: ["Arctic Warfare Magnum", "Auto Weapon Machine", "Advanced Weapon Mode", "Aim With Mastery"], answer: "Arctic Warfare Magnum" },
{ question: "Which anime has 'Goku' as protagonist?", options: ["One Piece", "Dragon Ball", "Bleach", "Naruto"], answer: "Dragon Ball" },
{ question: "Which language runs in a web browser?", options: ["Python", "C", "Java", "JavaScript"], answer: "JavaScript" },
  { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Setup", "Computer Style Sheet", "Color Style System"], answer: "Cascading Style Sheets" },
  { question: "What is 'const' used for in JavaScript?", options: ["Declaring variables", "Looping", "Functions", "Imports"], answer: "Declaring variables" },
  { question: "Which of the following is not a programming language?", options: ["Python", "HTML", "C++", "Java"], answer: "HTML" },
  { question: "Which company developed React?", options: ["Google", "Facebook", "Microsoft", "Amazon"], answer: "Facebook" },

  // IQ Riddles
  { question: "What has hands but can’t clap?", options: ["Clock", "Monkey", "Robot", "Fan"], answer: "Clock" },
  { question: "I speak without a mouth. I hear without ears. What am I?", options: ["Echo", "Wind", "Ghost", "Shadow"], answer: "Echo" },
  { question: "Forward I’m heavy, backward I’m not. What am I?", options: ["Ton", "Rock", "Stone", "Truck"], answer: "Ton" },
  { question: "Which month has 28 days?", options: ["February", "All", "March", "January"], answer: "All" },
  { question: "What goes up but never comes down?", options: ["Age", "Smoke", "Price", "Balloon"], answer: "Age" },

  // Pakistani Trivia
  { question: "Who was the first female Prime Minister of Pakistan?", options: ["Fatima Jinnah", "Benazir Bhutto", "Hina Rabbani", "Maryam Nawaz"], answer: "Benazir Bhutto" },
  { question: "Currency of Pakistan?", options: ["Taka", "Rupee", "Dinar", "Dirham"], answer: "Rupee" },
  { question: "Pakistan's national sport?", options: ["Cricket", "Hockey", "Football", "Kabaddi"], answer: "Hockey" },
  { question: "Where is Badshahi Mosque?", options: ["Karachi", "Lahore", "Rawalpindi", "Peshawar"], answer: "Lahore" },
  { question: "How many provinces does Pakistan have?", options: ["4", "5", "3", "6"], answer: "4" },

  // Anime / Gaming
  { question: "Who is the main character of Naruto?", options: ["Sasuke", "Naruto", "Kakashi", "Itachi"], answer: "Naruto" },
  { question: "What is the best-selling video game ever?", options: ["Minecraft", "GTA V", "Tetris", "PUBG"], answer: "Minecraft" },
  { question: "Who created Dragon Ball?", options: ["Akira Toriyama", "Eiichiro Oda", "Kishimoto", "Tite Kubo"], answer: "Akira Toriyama" },
  { question: "In which game do players build with materials?", options: ["Call of Duty", "Valorant", "Fortnite", "Free Fire"], answer: "Fortnite" },
  { question: "Who uses Rasengan?", options: ["Goku", "Tanjiro", "Naruto", "Eren"], answer: "Naruto" }
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function QuizGame() {
  const [quizData, setQuizData] = useState<Q[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [finalScore, setFinalScore] = useState(0);
  const [showNameModal, setShowNameModal] = useState(false);

  useEffect(() => {
    const questions = shuffle(allQuestions).slice(0, 5);
    setQuizData(questions);
  }, []);

  useEffect(() => {
    if (showResult) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleSelect('');
          return 15;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [current]);

  const speak = (msg: string) => {
    const utter = new SpeechSynthesisUtterance(msg);
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  const handleSelect = (option: string) => {
    if (selected) return;
    const correct = option === quizData[current].answer;
    clearInterval(timerRef.current!);
    setSelected(option);

    if (correct) {
      setScore((prev) => prev + 1);
      speak("Correct! 😎");
    } else {
      speak(`Wrong! 😵‍💫 Correct is ${quizData[current].answer}`);
    }

    setTimeout(() => {
      if (current + 1 < quizData.length) {
        setCurrent(current + 1);
        setSelected(null);
        setTimeLeft(15);
      } else {
        const final = score + (correct ? 1 : 0);
        setFinalScore(final);
        setShowResult(true);
        setShowNameModal(true);
        speak(`Quiz over! You got ${final} out of ${quizData.length}`);
      }
    }, 1200);
  };

  const handleSaveName = (name: string) => {
    const entry = {
      name,
      score: finalScore,
      date: new Date().toLocaleDateString()
    };
    const prev = JSON.parse(localStorage.getItem("quiz_leaderboard") || "[]");
    localStorage.setItem("quiz_leaderboard", JSON.stringify([...prev, entry]));
    setShowNameModal(false);
  };

  const resetQuiz = () => {
    const questions = shuffle(allQuestions).slice(0, 5);
    setQuizData(questions);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setTimeLeft(15);
    speak("Restarting Quiz!");
  };

  const goBack = () => {
    window.location.href = "/";
  };

  if (quizData.length === 0)
    return <div className="text-white text-center p-10">Loading questions...</div>;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-black via-purple-950 to-black p-4">
      <div className="w-full max-w-2xl bg-gray-900/90 border border-purple-700 rounded-xl shadow-2xl p-6 sm:p-10 text-center text-white">
        {showResult ? (
          <>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-yellow-400">🎉 Quiz Complete!</h2>
            <p className="text-lg sm:text-xl mb-6">
              Your Score: <span className="text-green-400 font-bold">{finalScore}</span> / {quizData.length}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition"
              >
                🔁 Play Again
              </button>
              <button
                onClick={() => window.location.href = '/leaderboard'}
                className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-500 transition"
              >
                🏆 View Leaderboard
              </button>
              <button
                onClick={goBack}
                className="bg-red-900 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-800 transition"
              >
                ⬅️ Exit
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between text-purple-300 text-sm mb-3">
              <span>Question {current + 1} / {quizData.length}</span>
              <span>⏱️ {timeLeft}s</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-300 mb-5">
              {quizData[current].question}
            </h2>
            <div className="grid gap-3">
              {quizData[current].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`py-2 px-4 text-sm sm:text-base rounded-lg border font-medium transition-all duration-300 ${
                    selected
                      ? opt === quizData[current].answer
                        ? "bg-green-600 border-green-300 text-white scale-105"
                        : opt === selected
                        ? "bg-red-600 border-red-300 text-white scale-95"
                        : "bg-gray-700 opacity-50 cursor-not-allowed"
                      : "bg-gray-800 border-gray-600 hover:border-yellow-400 hover:text-yellow-300"
                  }`}
                  disabled={!!selected}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="mt-6 text-sm text-purple-300">Score: {score}</div>
          </>
        )}
      </div>
      {showNameModal && <NameModal onSubmit={handleSaveName} />}
    </div>
  );
}