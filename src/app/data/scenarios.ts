// src/data/scenarios.ts

export type ReplyOption = {
  id: string;
  label: string;
  text: string;
  feedback: string;
  feedbackEmoji: string;
  tone: "kind" | "neutral" | "assertive";
};

export type Scenario = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  keywords: string[];
  replies: ReplyOption[];
};

export const scenarios: Scenario[] = [
  {
    id: "ignored",
    title: "Someone ignores me",
    description: "A friend or classmate isn't talking to you or keeps leaving you out.",
    emoji: "😶",
    keywords: ["ignore", "ignoring", "excluded", "left out", "alone", "nobody", "no one", "invisible", "leaving"],
    replies: [
      {
        id: "ignored-kind",
        label: "Kind 💛",
        text: "Hey, I feel a bit left out. Can I join you?",
        feedback: "Great choice! Asking kindly shows confidence and gives them a chance to include you.",
        feedbackEmoji: "😊",
        tone: "kind",
      },
      {
        id: "ignored-neutral",
        label: "Calm 🌿",
        text: "I noticed you didn't include me. Was that on purpose?",
        feedback: "Good thinking! Asking calmly can help clear up misunderstandings.",
        feedbackEmoji: "🌿",
        tone: "neutral",
      },
      {
        id: "ignored-assertive",
        label: "Brave 🦁",
        text: "It hurts when I'm left out. I'd like to be included next time.",
        feedback: "Wow, that took courage! Saying how you feel clearly is really brave.",
        feedbackEmoji: "🦁",
        tone: "assertive",
      },
    ],
  },
  {
    id: "teased",
    title: "Someone is teasing me",
    description: "A classmate is making fun of you or saying mean things.",
    emoji: "😢",
    keywords: ["tease", "teasing", "mean", "making fun", "laugh", "laughing", "mock", "bully", "rude", "joke", "name"],
    replies: [
      {
        id: "teased-kind",
        label: "Kind 💛",
        text: "That comment hurt my feelings. Can we please be kind to each other?",
        feedback: "Really good! Telling them it hurt and asking for kindness is very mature.",
        feedbackEmoji: "😊",
        tone: "kind",
      },
      {
        id: "teased-neutral",
        label: "Calm 🌿",
        text: "I don't think that's funny. Please stop.",
        feedback: "Nice work! Short and clear — sometimes that's all you need.",
        feedbackEmoji: "🌿",
        tone: "neutral",
      },
      {
        id: "teased-assertive",
        label: "Brave 🦁",
        text: "I won't accept being spoken to that way. I'm going to talk to a teacher.",
        feedback: "Super brave! Knowing when to get a grown-up is a really smart skill.",
        feedbackEmoji: "🦁",
        tone: "assertive",
      },
    ],
  },
  {
    id: "argument",
    title: "I had an argument with a friend",
    description: "You and a friend had a disagreement and now things feel awkward.",
    emoji: "😤",
    keywords: ["fight", "argue", "argument", "disagree", "angry", "upset", "mad", "fell out", "awkward", "conflict"],
    replies: [
      {
        id: "argument-kind",
        label: "Kind 💛",
        text: "I'm sorry we argued. I really value our friendship. Can we talk?",
        feedback: "Amazing! Apologising first is a sign of real emotional strength.",
        feedbackEmoji: "😊",
        tone: "kind",
      },
      {
        id: "argument-neutral",
        label: "Calm 🌿",
        text: "I think we both got a bit upset. Can we work it out?",
        feedback: "Great approach! Acknowledging both sides helps fix things faster.",
        feedbackEmoji: "🌿",
        tone: "neutral",
      },
      {
        id: "argument-assertive",
        label: "Brave 🦁",
        text: "I felt like my opinion wasn't heard. I need us to talk properly.",
        feedback: "Well done! Saying what you need is an important skill.",
        feedbackEmoji: "🦁",
        tone: "assertive",
      },
    ],
  },
  {
    id: "new-person",
    title: "I want to make a new friend",
    description: "There's someone new you'd like to get to know.",
    emoji: "🤝",
    keywords: ["new", "friend", "talk", "meet", "introduce", "hello", "hi", "shy", "nervous", "lonely", "play"],
    replies: [
      {
        id: "new-kind",
        label: "Kind 💛",
        text: "Hi! I'm [your name]. I really like your drawing. Want to hang out?",
        feedback: "Perfect! A compliment is a wonderful way to start a friendship.",
        feedbackEmoji: "😊",
        tone: "kind",
      },
      {
        id: "new-neutral",
        label: "Calm 🌿",
        text: "Hey, I don't think we've talked before. I'm [your name].",
        feedback: "Nice and simple! Starting with your name is always a good move.",
        feedbackEmoji: "🌿",
        tone: "neutral",
      },
      {
        id: "new-assertive",
        label: "Brave 🦁",
        text: "I'd like to get to know you better. Can I sit with you?",
        feedback: "So brave! Asking directly shows confidence. Most people love that.",
        feedbackEmoji: "🦁",
        tone: "assertive",
      },
    ],
  },
  {
    id: "group-project",
    title: "Group project problems",
    description: "Someone in your group isn't doing their part or is being bossy.",
    emoji: "📚",
    keywords: ["group", "project", "work", "bossy", "unfair", "not helping", "team", "partner", "share", "control", "school"],
    replies: [
      {
        id: "group-kind",
        label: "Kind 💛",
        text: "Can we figure out who does what so everyone has a fair part?",
        feedback: "Great idea! Splitting things fairly helps everyone feel valued.",
        feedbackEmoji: "😊",
        tone: "kind",
      },
      {
        id: "group-neutral",
        label: "Calm 🌿",
        text: "I think we need to share the work more evenly. What do you think?",
        feedback: "Good job! Checking in with the group shows great teamwork.",
        feedbackEmoji: "🌿",
        tone: "neutral",
      },
      {
        id: "group-assertive",
        label: "Brave 🦁",
        text: "I feel like I'm doing most of the work. That's not fair to me.",
        feedback: "Really brave! Standing up for yourself in a group is hard — well done.",
        feedbackEmoji: "🦁",
        tone: "assertive",
      },
    ],
  },
  {
    id: "misunderstood",
    title: "I was misunderstood",
    description: "Someone took what you said the wrong way and now they're upset.",
    emoji: "😕",
    keywords: ["misunderstood", "wrong", "didn't mean", "accident", "mistake", "meant", "misread", "confused", "mixed up"],
    replies: [
      {
        id: "misunderstood-kind",
        label: "Kind 💛",
        text: "I didn't mean it that way — I'm really sorry it came across like that.",
        feedback: "Perfect! Apologising for how it landed (even if you didn't mean it) shows real empathy.",
        feedbackEmoji: "😊",
        tone: "kind",
      },
      {
        id: "misunderstood-neutral",
        label: "Calm 🌿",
        text: "I think there was a miscommunication. Can I explain what I meant?",
        feedback: "Great! Asking to explain yourself calmly helps fix things without blame.",
        feedbackEmoji: "🌿",
        tone: "neutral",
      },
      {
        id: "misunderstood-assertive",
        label: "Brave 🦁",
        text: "That's not what I said. Let me tell you exactly what I meant.",
        feedback: "Good job standing your ground! Just remember to stay calm while you explain.",
        feedbackEmoji: "🦁",
        tone: "assertive",
      },
    ],
  },
];

export function getMatchedScenario(scenarioId: string): Scenario | undefined {
  return scenarios.find((s) => s.id === scenarioId);
}