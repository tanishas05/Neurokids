//tavleen will handle
import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { MessageCircle, Lightbulb, CheckCircle2, Search } from "lucide-react";
import scenariosData from "../data/scenarios.json";

export function SocialCoach() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");
  const [selectedScenario, setSelectedScenario] = useState<any>(null);

  const categories = ["all", "School", "Friends", "Home"];

  // Filter scenarios based on category and search text
  const filteredScenarios = scenariosData.scenarios.filter((scenario) => {
    const matchesCategory = selectedCategory === "all" || scenario.category === selectedCategory;
    const matchesSearch = searchText === "" || 
      scenario.situation.toLowerCase().includes(searchText.toLowerCase()) ||
      scenario.keywords.some(keyword => keyword.toLowerCase().includes(searchText.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">AI Social Coach</h1>
            <p className="text-gray-600">Learn to understand social situations</p>
          </div>
        </div>
        <Badge className="bg-purple-100 text-purple-700 border-purple-200">
          Module by Person 1
        </Badge>
      </div>

      {/* Instructions Card */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-purple-600" />
          How to Use
        </h3>
        <ul className="space-y-1 text-gray-700">
          <li>• Select a category or search for a specific situation</li>
          <li>• Click on a scenario to see what it really means</li>
          <li>• Learn the tone, intent, and get suggested responses</li>
        </ul>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Scenario Selection */}
        <div>
          <Card className="p-6 mb-6">
            <h3 className="font-bold text-lg mb-4">Find a Situation</h3>
            
            {/* Category Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Keywords
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="e.g., attention, upset, sarcasm..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">
              Found {filteredScenarios.length} scenario(s)
            </p>
          </Card>

          {/* Scenario List */}
          <div className="space-y-3">
            {filteredScenarios.map((scenario) => (
              <Card
                key={scenario.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedScenario?.id === scenario.id
                    ? "ring-2 ring-purple-500 bg-purple-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedScenario(scenario)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {scenario.category}
                      </Badge>
                    </div>
                    <p className="text-gray-700">{scenario.situation}</p>
                  </div>
                  {selectedScenario?.id === scenario.id && (
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  )}
                </div>
              </Card>
            ))}

            {filteredScenarios.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-gray-500">No scenarios found. Try different keywords!</p>
              </Card>
            )}
          </div>
        </div>

        {/* Right Column - Scenario Analysis */}
        <div>
          {selectedScenario ? (
            <div className="space-y-4 sticky top-4">
              {/* What Was Said */}
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="font-bold text-lg mb-3 text-blue-900">
                  💬 What Was Said
                </h3>
                <p className="text-lg text-gray-800 italic">"{selectedScenario.whatWasSaid}"</p>
              </Card>

              {/* What It Means */}
              <Card className="p-6 bg-green-50 border-green-200">
                <h3 className="font-bold text-lg mb-3 text-green-900">
                  🧠 What It Really Means
                </h3>
                <p className="text-gray-800">{selectedScenario.whatItMeans}</p>
              </Card>

              {/* Tone & Intent */}
              <Card className="p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-1">Tone</h4>
                    <Badge className="bg-purple-100 text-purple-700">
                      {selectedScenario.tone}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-1">Intent</h4>
                    <Badge className="bg-orange-100 text-orange-700">
                      {selectedScenario.intent}
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Suggested Responses */}
              <Card className="p-6 bg-purple-50 border-purple-200">
                <h3 className="font-bold text-lg mb-3 text-purple-900">
                  💡 Suggested Responses
                </h3>
                <div className="space-y-2">
                  {selectedScenario.suggestedResponses.map((response: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-white rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{response}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Keywords */}
              <Card className="p-6">
                <h4 className="font-medium text-sm text-gray-600 mb-2">Related Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedScenario.keywords.map((keyword: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <Card className="p-12 text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-bold text-lg text-gray-700 mb-2">
                Select a Scenario
              </h3>
              <p className="text-gray-500">
                Choose a situation from the left to see the analysis and suggested responses
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
