//tiya will handle
import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Gamepad2, Shuffle, Volume2, Trophy, Star } from "lucide-react";
import gamesData from "../data/dyslexiaGames.json";
import LogoutButton from "../components/LogoutButton";

export default function ParentDashboard() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Parent Dashboard</h1>
        <LogoutButton />
      </div>
      <p>Welcome! You are logged in.</p>
      <DyslexiaGames />
    </div>
  );
}

export function DyslexiaGames() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [wordGameFeedback, setWordGameFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);
  const [selectedPhonetic, setSelectedPhonetic] = useState(0);
  const [readingIndex, setReadingIndex] = useState(0);
  const [currentWordInReading, setCurrentWordInReading] = useState(0);

  const currentWordGame = gamesData.wordGames[currentWordIndex];
  const currentPhonetic = gamesData.phoneticPairs[selectedPhonetic];
  const currentReading = gamesData.readingPractice[readingIndex];

  const handleWordGameSubmit = () => {
    const isCorrect = userAnswer.toLowerCase().trim() === currentWordGame.word.toLowerCase();
    setWordGameFeedback({
      correct: isCorrect,
      message: isCorrect
        ? "🎉 Perfect! You unscrambled it!"
        : `Not quite. The word is "${currentWordGame.word}". Try the next one!`,
    });
    if (isCorrect) setScore(score + 1);
  };

  const handleNextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1 < gamesData.wordGames.length ? prev + 1 : 0));
    setUserAnswer("");
    setWordGameFeedback(null);
  };

  const handleReadWord = (word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNextWordInReading = () => {
    if (currentWordInReading < currentReading.text.length - 1) setCurrentWordInReading(currentWordInReading + 1);
  };

  const handlePrevWordInReading = () => {
    if (currentWordInReading > 0) setCurrentWordInReading(currentWordInReading - 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
          <Gamepad2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dyslexia Support Games</h1>
          <p className="text-gray-600">Fun exercises to improve reading skills</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <Badge className="bg-green-100 text-green-700 border-green-200">Module by Person 2</Badge>
        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
          <Trophy className="w-3 h-3 mr-1" />
          Score: {score}
        </Badge>
      </div>

      <Tabs defaultValue="word-scramble" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="word-scramble">Word Scramble</TabsTrigger>
          <TabsTrigger value="phonetic">Phonetic Match</TabsTrigger>
          <TabsTrigger value="reading">Read Aloud</TabsTrigger>
        </TabsList>

        {/* Word Scramble */}
        <TabsContent value="word-scramble">
          <Card className="p-6 mb-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Shuffle className="w-5 h-5 text-green-600" /> Unscramble the Word
              </h3>
              <Badge className="bg-green-100 text-green-700">
                Word {currentWordIndex + 1} of {gamesData.wordGames.length}
              </Badge>
            </div>

            <Card className="p-8 bg-green-50 border-green-200 mb-6">
              <p className="text-center text-5xl font-bold text-green-700 tracking-widest mb-4 font-mono">
                {currentWordGame.scrambled}
              </p>
              <div className="flex justify-center items-center gap-2 bg-white/50 px-4 py-2 rounded-lg">
                <Star className="w-4 h-4 text-yellow-500" /> Hint: {currentWordGame.hint}
              </div>
            </Card>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !wordGameFeedback && handleWordGameSubmit()}
                placeholder="Type the correct word..."
                className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 text-lg"
                disabled={!!wordGameFeedback}
              />
              {!wordGameFeedback ? (
                <Button onClick={handleWordGameSubmit} disabled={!userAnswer.trim()}>Check</Button>
              ) : (
                <Button onClick={handleNextWord}>Next</Button>
              )}
            </div>

            {wordGameFeedback && (
              <Card className={`p-4 ${wordGameFeedback.correct ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"}`}>
                <p className={`text-center font-medium ${wordGameFeedback.correct ? "text-green-800" : "text-orange-800"}`}>
                  {wordGameFeedback.message}
                </p>
              </Card>
            )}
          </Card>
        </TabsContent>

        {/* Phonetic */}
        <TabsContent value="phonetic">
          <Card className="p-6 mb-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-green-600" /> Phonetic Matching & Rhymes
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {gamesData.phoneticPairs.map((pair, i) => (
                  <Card
                    key={pair.id}
                    className={`p-4 cursor-pointer mb-2 ${selectedPhonetic === i ? "bg-green-50 border-green-300 shadow-md" : "hover:bg-gray-50"}`}
                    onClick={() => setSelectedPhonetic(i)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-bold text-lg">{pair.word}</p>
                        <p className="text-sm">{pair.sound}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleReadWord(pair.word); }}>
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div>
                <h4 className="font-medium mb-3">Rhymes with "{currentPhonetic.word}"</h4>
                <Card className="p-6 bg-green-50 border-green-200">
                  <div className="grid grid-cols-2 gap-3">
                    {currentPhonetic.rhymesWith.map((rhyme, i) => (
                      <div key={i} className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md cursor-pointer" onClick={() => handleReadWord(rhyme)}>
                        <p>{rhyme}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Reading */}
        <TabsContent value="reading">
          <Card className="p-6 mb-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-green-600" /> Read Aloud
              </h3>
              <div className="flex gap-2">
                {gamesData.readingPractice.map((_, i) => (
                  <Button key={i} size="sm" variant={readingIndex === i ? "default" : "outline"} onClick={() => { setReadingIndex(i); setCurrentWordInReading(0); }}>
                    Story {i + 1}
                  </Button>
                ))}
              </div>
            </div>

            <Badge variant="outline" className="mb-4">{currentReading.level}</Badge>
            <h4 className="text-lg font-bold mb-4">{currentReading.title}</h4>

            <Card className="p-8 bg-green-50 border-green-200 mb-6">
              <div className="flex flex-wrap gap-2 text-2xl justify-center">
                {currentReading.text.map((word, i) => (
                  <span
                    key={i}
                    className={`cursor-pointer px-2 py-1 rounded ${i === currentWordInReading ? "bg-yellow-300 font-bold scale-110 shadow-lg" : i < currentWordInReading ? "text-gray-500" : "text-gray-800 hover:bg-white"}`}
                    onClick={() => { setCurrentWordInReading(i); handleReadWord(word); }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </Card>

            <div className="flex gap-2 justify-center mb-6">
              <Button onClick={handlePrevWordInReading} disabled={currentWordInReading === 0} variant="outline">Previous</Button>
              <Button onClick={() => handleReadWord(currentReading.text[currentWordInReading])} className="bg-green-600 hover:bg-green-700">Read Current</Button>
              <Button onClick={handleNextWordInReading} disabled={currentWordInReading === currentReading.text.length - 1} variant="outline">Next</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}