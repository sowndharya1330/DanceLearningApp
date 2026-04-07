export interface DanceCourse {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  image: string;
  category: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  description: string;
  videoUrl: string;
  steps: Step[];
  thumbnail: string;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  timestamp: number; // in seconds
}

export interface UserProgress {
  lessonId: string;
  completed: boolean;
  lastWatched: number; // timestamp in seconds
  practiceCount: number;
  dateCompleted?: string;
}

// Mock data for Bharatanatyam courses
export const danceCourses: DanceCourse[] = [
  {
    id: "adavu-basics",
    title: "Fundamental Adavus",
    description: "Master the basic building blocks of Bharatanatyam with Tatta, Natta, and Visharu Adavus",
    instructor: "Guru Lakshmi Vishwanathan",
    level: "Beginner",
    duration: "8 weeks",
    image: "https://images.unsplash.com/photo-1630663129615-a2331ed88ab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaGFyYXRhbmF0eWFtJTIwaW5kaWFuJTIwY2xhc3NpY2FsJTIwZGFuY2V8ZW58MXx8fHwxNzc1NDUxNDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Adavus",
    lessons: [
      {
        id: "adavu-1",
        courseId: "adavu-basics",
        title: "Tatta Adavu - The Foundation",
        duration: "12:30",
        description: "Learn the fundamental Tatta Adavu with proper aramandi position and footwork",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "https://images.unsplash.com/photo-1630663129615-a2331ed88ab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaGFyYXRhbmF0eWFtJTIwaW5kaWFuJTIwY2xhc3NpY2FsJTIwZGFuY2V8ZW58MXx8fHwxNzc1NDUxNDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        steps: [
          { id: "step-1", title: "Aramandi Position", description: "Perfect the half-sitting posture with bent knees", timestamp: 0 },
          { id: "step-2", title: "Foot Strike Pattern", description: "Ta Tai Ta Ha rhythm with heel strikes", timestamp: 180 },
          { id: "step-3", title: "Hand Movements", description: "Coordinate alapadma hasta with footwork", timestamp: 360 },
          { id: "step-4", title: "Complete Sequence", description: "Practice full Tatta Adavu with rhythm", timestamp: 540 },
        ],
      },
      {
        id: "adavu-2",
        courseId: "adavu-basics",
        title: "Natta Adavu - Stretching Steps",
        duration: "14:15",
        description: "Master the stretching movements of Natta Adavu with proper leg extensions",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnail: "https://images.unsplash.com/photo-1630663129615-a2331ed88ab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaGFyYXRhbmF0eWFtJTIwaW5kaWFuJTIwY2xhc3NpY2FsJTIwZGFuY2V8ZW58MXx8fHwxNzc1NDUxNDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        steps: [
          { id: "step-1", title: "Leg Extension", description: "Proper technique for stretching the leg outward", timestamp: 0 },
          { id: "step-2", title: "Weight Transfer", description: "Shifting weight while maintaining aramandi", timestamp: 220 },
          { id: "step-3", title: "Rhythm Coordination", description: "Ta Tai Ta Tai Ha Ha rhythm pattern", timestamp: 480 },
        ],
      },
      {
        id: "adavu-3",
        courseId: "adavu-basics",
        title: "Visharu Adavu - Jumping Steps",
        duration: "11:45",
        description: "Learn the dynamic jumping movements with proper landing technique",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://images.unsplash.com/photo-1630663129615-a2331ed88ab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaGFyYXRhbmF0eWFtJTIwaW5kaWFuJTIwY2xhc3NpY2FsJTIwZGFuY2V8ZW58MXx8fHwxNzc1NDUxNDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        steps: [
          { id: "step-1", title: "Jump Preparation", description: "Building strength for controlled jumps", timestamp: 0 },
          { id: "step-2", title: "Landing Technique", description: "Safe landing in aramandi position", timestamp: 180 },
          { id: "step-3", title: "Complete Pattern", description: "Full Visharu Adavu sequence", timestamp: 420 },
        ],
      },
    ],
  },
  {
    id: "mudras-hastas",
    title: "Asamyuta Hastas (Single Hand Gestures)",
    description: "Complete guide to 28 single-hand mudras with meanings and applications",
    instructor: "Dr. Padma Subrahmanyam",
    level: "Beginner",
    duration: "6 weeks",
    image: "https://images.unsplash.com/photo-1764014792668-bc484714744f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjbGFzc2ljYWwlMjBkYW5jZXIlMjBtdWRyYXxlbnwxfHx8fDE3NzU1MzgwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Mudras",
    lessons: [
      {
        id: "mudra-1",
        courseId: "mudras-hastas",
        title: "Pataka, Tripataka & Ardhapataka",
        duration: "10:20",
        description: "Learn the first three fundamental hand gestures and their meanings",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: "https://images.unsplash.com/photo-1764014792668-bc484714744f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjbGFzc2ljYWwlMjBkYW5jZXIlMjBtdWRyYXxlbnwxfHx8fDE3NzU1MzgwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        steps: [
          { id: "step-1", title: "Pataka - Flag", description: "All fingers extended together representing flag, cloud, river", timestamp: 0 },
          { id: "step-2", title: "Tripataka - Three Parts", description: "Ring finger bent, representing crown, tree, fire", timestamp: 180 },
          { id: "step-3", title: "Ardhapataka - Half Flag", description: "Little finger extended, showing river, knife, oath", timestamp: 340 },
        ],
      },
      {
        id: "mudra-2",
        courseId: "mudras-hastas",
        title: "Kartarimukha & Mayura",
        duration: "9:50",
        description: "Master the scissors and peacock hand gestures",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        thumbnail: "https://images.unsplash.com/photo-1764014792668-bc484714744f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjbGFzc2ljYWwlMjBkYW5jZXIlMjBtdWRyYXxlbnwxfHx8fDE3NzU1MzgwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        steps: [
          { id: "step-1", title: "Kartarimukha", description: "Scissors gesture - index and middle finger apart", timestamp: 0 },
          { id: "step-2", title: "Mayura - Peacock", description: "Thumb touching ring finger showing peacock, beauty", timestamp: 200 },
          { id: "step-3", title: "Applications", description: "Using mudras in storytelling", timestamp: 380 },
        ],
      },
    ],
  },
  {
    id: "alarippu-item",
    title: "Alarippu - The Blossoming",
    description: "Learn the traditional opening piece with its pure dance movements",
    instructor: "Smt. Alarmel Valli",
    level: "Intermediate",
    duration: "10 weeks",
    image: "https://images.unsplash.com/photo-1717011969223-0217a302ec6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXRoYWslMjBpbmRpYW4lMjBkYW5jZSUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc3NTUzODAzNXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Margam Items",
    lessons: [
      {
        id: "alarippu-1",
        courseId: "alarippu-item",
        title: "Eye Movements (Drishti Bheda)",
        duration: "13:30",
        description: "Master the eight eye movements used in Alarippu",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        thumbnail: "https://images.unsplash.com/photo-1717011969223-0217a302ec6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXRoYWslMjBpbmRpYW4lMjBkYW5jZSUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc3NTUzODAzNXww&ixlib=rb-4.1.0&q=80&w=1080",
        steps: [
          { id: "step-1", title: "Sama & Alokita", description: "Level gaze and looking at audience", timestamp: 0 },
          { id: "step-2", title: "Sachi & Pralokita", description: "Glancing with corners and rolling eyes", timestamp: 240 },
          { id: "step-3", title: "Complete Sequence", description: "Coordinating all eye movements", timestamp: 540 },
        ],
      },
    ],
  },
  {
    id: "jatiswaram",
    title: "Jatiswaram - Pure Dance",
    description: "Express mathematical precision through pure nritta movements",
    instructor: "Guru Malavika Sarukkai",
    level: "Intermediate",
    duration: "8 weeks",
    image: "https://images.unsplash.com/photo-1559557894-701d139917eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkYW5jZSUyMGNvc3R1bWUlMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NzU1MzgwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Margam Items",
    lessons: [
      {
        id: "jatiswaram-1",
        courseId: "jatiswaram",
        title: "Understanding Tala & Jati",
        duration: "11:00",
        description: "Learn rhythm patterns and their execution in dance",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        thumbnail: "https://images.unsplash.com/photo-1559557894-701d139917eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkYW5jZSUyMGNvc3R1bWUlMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NzU1MzgwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        steps: [
          { id: "step-1", title: "Adi Tala", description: "Understanding 8-beat cycle", timestamp: 0 },
          { id: "step-2", title: "Tisra, Chatusra, Khanda", description: "Groups of 3, 4, and 5 beats", timestamp: 180 },
          { id: "step-3", title: "Korvai Patterns", description: "Mathematical sequences in movement", timestamp: 420 },
        ],
      },
    ],
  },
  {
    id: "abhinaya-expressions",
    title: "Abhinaya - The Art of Expression",
    description: "Master facial expressions and emotional portrayal in dance",
    instructor: "Vidushi Malavika Sarukkai",
    level: "Advanced",
    duration: "12 weeks",
    image: "https://images.unsplash.com/photo-1583522959757-21e74ae2d859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjbGFzc2ljYWwlMjBkYW5jZSUyMHBvc3R1cmV8ZW58MXx8fHwxNzc1NTM4MDM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Abhinaya",
    lessons: [
      {
        id: "abhinaya-1",
        courseId: "abhinaya-expressions",
        title: "Navarasas - Nine Emotions",
        duration: "15:00",
        description: "Express the nine primary emotions through facial expressions",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        thumbnail: "https://images.unsplash.com/photo-1583522959757-21e74ae2d859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjbGFzc2ljYWwlMjBkYW5jZSUyMHBvc3R1cmV8ZW58MXx8fHwxNzc1NTM4MDM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        steps: [
          { id: "step-1", title: "Shringara & Hasya", description: "Love and laughter expressions", timestamp: 0 },
          { id: "step-2", title: "Karuna & Raudra", description: "Compassion and anger", timestamp: 280 },
          { id: "step-3", title: "Veera & Bhayanaka", description: "Valor and fear", timestamp: 600 },
        ],
      },
    ],
  },
  {
    id: "varnam-masterclass",
    title: "Varnam - The Centerpiece",
    description: "Learn the most important and elaborate item of Bharatanatyam repertoire",
    instructor: "Guru Priyadarsini Govind",
    level: "Advanced",
    duration: "16 weeks",
    image: "https://images.unsplash.com/photo-1774425243305-02ae44fdefd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaGFyYXRhbmF0eWFtJTIwZGFuY2UlMjBleHByZXNzaW9ufGVufDF8fHx8MTc3NTUzODAzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Margam Items",
    lessons: [
      {
        id: "varnam-1",
        courseId: "varnam-masterclass",
        title: "Varnam Structure & Composition",
        duration: "18:30",
        description: "Understanding the complex structure of a varnam",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        thumbnail: "https://images.unsplash.com/photo-1774425243305-02ae44fdefd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaGFyYXRhbmF0eWFtJTIwZGFuY2UlMjBleHByZXNzaW9ufGVufDF8fHx8MTc3NTUzODAzNnww&ixlib=rb-4.1.0&q=80&w=1080",
        steps: [
          { id: "step-1", title: "Pallavi Section", description: "Opening pure dance section", timestamp: 0 },
          { id: "step-2", title: "Anupallavi", description: "Second section with variations", timestamp: 320 },
          { id: "step-3", title: "Muktayi Swarams", description: "Sahitya and expression sections", timestamp: 720 },
        ],
      },
    ],
  },
];
