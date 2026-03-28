//tiya will handle
import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { BookOpen, Target, CheckCircle2, Award } from "lucide-react";
import learningData from "../data/learningContent.json";

export function LearningEngine() {
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [currentMathIndex, setCurrentMathIndex] = useState(0);
  const [mathAnswer, setMathAnswer] = useState("");
  const [mathFeedback, setMathFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  const interests = Object.entries(learningData.interests).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  const selectedContent = selectedInterest
    ? learningData.interests[selectedInterest as keyof typeof learningData.interests]
    : null;

  const handleMathSubmit = () => {
    if (!selectedContent) return;
    
    const currentProblem = selectedContent.mathProblems[currentMathIndex];
    const isCorrect = mathAnswer.trim() === currentProblem.answer;
    
    setMathFeedback({
      correct: isCorrect,
      message: isCorrect
        ? "🎉 Correct! Great job!"
        : `Not quite. The answer is ${currentProblem.answer}. Try the next one!`,
    });
  };

  const handleNextMath = () => {
    if (!selectedContent) return;
    if (currentMathIndex < selectedContent.mathProblems.length - 1) {
      setCurrentMathIndex(currentMathIndex + 1);
      setMathAnswer("");
      setMathFeedback(null);
    } else {
      setCurrentMathIndex(0);
      setMathAnswer("");
      setMathFeedback(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Hyperfocus Learning Engine</h1>
            <p className="text-gray-600">Learn through your interests</p>
          </div>
        </div>
        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
          Module by Person 2
        </Badge>
      </div>

      {!selectedInterest ? (
        /* Interest Selection */
        <div>
          <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Choose Your Interest
            </h3>
            <p className="text-gray-700">
              Pick a topic you love! We'll create personalized math, reading, and activities just for you.
            </p>
          </Card>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {interests.map((interest) => (
              <Card
                key={interest.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 group"
                onClick={() => setSelectedInterest(interest.id)}
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">{interest.icon}</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">
                    {interest.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {interest.mathProblems.length} math problems • {interest.readingExercises.length} readings
                  </p>
                  <Button className="w-full group-hover:bg-blue-600">
                    Start Learning
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Learning Content */
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedContent?.icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedContent?.name}</h2>
                <p className="text-gray-600">Personalized learning content</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => {
              setSelectedInterest(null);
              setCurrentMathIndex(0);
              setMathAnswer("");
              setMathFeedback(null);
            }}>
              Change Topic
            </Button>
          </div>

          <Tabs defaultValue="math" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="math">Math Problems</TabsTrigger>
              <TabsTrigger value="reading">Reading</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>

            {/* Math Problems Tab */}
            <TabsContent value="math">
              <Card className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <Badge className="bg-blue-100 text-blue-700">
                    Problem {currentMathIndex + 1} of {selectedContent?.mathProblems.length}
                  </Badge>
                  <Badge variant="outline">
                    {selectedContent?.mathProblems[currentMathIndex].difficulty}
                  </Badge>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg mb-6">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {selectedContent?.mathProblems[currentMathIndex].question}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Answer:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={mathAnswer}
                      onChange={(e) => setMathAnswer(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleMathSubmit()}
                      placeholder="Type your answer..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={mathFeedback !== null}
                    />
                    {!mathFeedback ? (
                      <Button onClick={handleMathSubmit} disabled={!mathAnswer.trim()}>
                        Check Answer
                      </Button>
                    ) : (
                      <Button onClick={handleNextMath}>
                        Next Problem
                      </Button>
                    )}
                  </div>
                </div>

                {mathFeedback && (
                  <Card className={`p-4 ${mathFeedback.correct ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"}`}>
                    <div className="flex items-center gap-2">
                      {mathFeedback.correct ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Target className="w-5 h-5 text-orange-600" />
                      )}
                      <p className={mathFeedback.correct ? "text-green-800" : "text-orange-800"}>
                        {mathFeedback.message}
                      </p>
                    </div>
                  </Card>
                )}
              </Card>
            </TabsContent>

            {/* Reading Tab */}
            <TabsContent value="reading">
              <div className="space-y-6">
                {selectedContent?.readingExercises.map((exercise) => (
                  <Card key={exercise.id} className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      {exercise.title}
                    </h3>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg mb-4">
                      <p className="text-lg leading-relaxed text-gray-800">
                        {exercise.text}
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-700 mb-3">Comprehension Questions:</h4>
                      <ul className="space-y-2">
                        {exercise.questions.map((question, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <span className="text-blue-600 font-medium">{index + 1}.</span>
                            <span>{question}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Activities Tab */}
            <TabsContent value="activities">
              <div className="space-y-4">
                {selectedContent?.activities.map((activity) => (
                  <Card key={activity.id} className="p-6 hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {activity.title}
                        </h3>
                        <p className="text-gray-700 mb-3">{activity.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
