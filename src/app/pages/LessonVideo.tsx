import { useParams, Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import { danceCourses } from "../data/courses";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
} from "lucide-react";
import { progressStorage } from "../utils/storage";
import { toast } from "sonner";

export function LessonVideo() {
  const { lessonId } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Find lesson and course
  let lesson = null;
  let course = null;
  for (const c of danceCourses) {
    const l = c.lessons.find((les) => les.id === lessonId);
    if (l) {
      lesson = l;
      course = c;
      break;
    }
  }

  const lessonProgress = lesson ? progressStorage.getLessonProgress(lesson.id) : null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !lesson) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      
      // Update progress in storage
      progressStorage.updateLastWatched(lesson.id, video.currentTime);

      // Auto-advance to next step
      const nextStepIndex = lesson.steps.findIndex(
        (step) => step.timestamp > video.currentTime
      );
      if (nextStepIndex === -1) {
        setCurrentStepIndex(lesson.steps.length - 1);
      } else if (nextStepIndex > 0) {
        setCurrentStepIndex(nextStepIndex - 1);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      // Resume from last watched position
      if (lessonProgress && lessonProgress.lastWatched > 0) {
        video.currentTime = lessonProgress.lastWatched;
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (!lessonProgress?.completed) {
        progressStorage.markComplete(lesson.id);
        toast.success("Lesson completed! Great job! 🎉");
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, [lesson, lessonProgress]);

  if (!lesson || !course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-slate-600">Lesson not found</p>
      </div>
    );
  }

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
  };

  const handlePracticeMode = () => {
    const video = videoRef.current;
    if (!video) return;
    
    setIsPracticeMode(!isPracticeMode);
    if (!isPracticeMode) {
      progressStorage.incrementPractice(lesson.id);
      video.playbackRate = 0.5;
      setPlaybackSpeed(0.5);
      toast.info("Practice mode activated - Video slowed to 50%");
    } else {
      video.playbackRate = 1;
      setPlaybackSpeed(1);
      toast.info("Normal speed restored");
    }
  };

  const jumpToStep = (stepIndex: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = lesson.steps[stepIndex].timestamp;
    setCurrentStepIndex(stepIndex);
  };

  const changeSpeed = () => {
    const video = videoRef.current;
    if (!video) return;
    
    const speeds = [0.5, 0.75, 1, 1.25, 1.5];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    
    video.playbackRate = nextSpeed;
    setPlaybackSpeed(nextSpeed);
    toast.info(`Playback speed: ${nextSpeed}x`);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentStep = lesson.steps[currentStepIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link to={`/course/${course.id}`}>
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player Section */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-0">
              {/* Video Container */}
              <div className="relative bg-black aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full"
                  src={lesson.videoUrl}
                  onClick={togglePlay}
                />
                
                {/* Current Step Overlay */}
                {isPracticeMode && (
                  <div className="absolute top-4 left-4 right-4 bg-orange-600 text-white p-4 rounded-lg shadow-lg">
                    <div className="text-sm font-medium mb-1">
                      Step {currentStepIndex + 1}: {currentStep.title}
                    </div>
                    <div className="text-sm opacity-90">
                      {currentStep.description}
                    </div>
                  </div>
                )}

                {/* Completed Badge */}
                {lessonProgress?.completed && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1.5 rounded-full text-sm flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Completed
                  </div>
                )}
              </div>

              {/* Video Controls */}
              <div className="p-4 bg-slate-50">
                <Progress value={progressPercent} className="mb-4 h-1.5" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button size="icon" variant="ghost" onClick={togglePlay}>
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handleRestart}>
                      <RotateCcw className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={toggleMute}>
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                    <span className="text-sm text-slate-600 ml-2">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost" onClick={changeSpeed}>
                      <Settings className="h-4 w-4 mr-1" />
                      {playbackSpeed}x
                    </Button>
                    <Button size="icon" variant="ghost" onClick={toggleFullscreen}>
                      <Maximize className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Info */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {course.category}
                  </Badge>
                  <CardTitle className="text-2xl">{lesson.title}</CardTitle>
                  <p className="text-slate-600 mt-2">{lesson.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handlePracticeMode}
                variant={isPracticeMode ? "default" : "outline"}
                className="w-full"
              >
                {isPracticeMode ? "Exit Practice Mode" : "Start Practice Mode"}
              </Button>
              {lessonProgress && lessonProgress.practiceCount > 0 && (
                <p className="text-sm text-slate-600 text-center mt-2">
                  You've practiced this {lessonProgress.practiceCount} time
                  {lessonProgress.practiceCount !== 1 ? "s" : ""}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Lesson Description */}
          <Card>
            <CardHeader>
              <CardTitle>About This Lesson</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="steps">
                <TabsList className="w-full">
                  <TabsTrigger value="steps" className="flex-1">
                    Steps
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="flex-1">
                    Notes
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="steps" className="space-y-3 mt-4">
                  {lesson.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        currentStepIndex === index
                          ? "border-purple-600 bg-purple-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      onClick={() => jumpToStep(index)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-slate-500">
                              Step {index + 1}
                            </span>
                            <span className="text-xs text-slate-400">
                              {formatTime(step.timestamp)}
                            </span>
                          </div>
                          <h4 className="font-semibold mb-1">{step.title}</h4>
                          <p className="text-sm text-slate-600">
                            {step.description}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="notes" className="mt-4">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-slate-600">
                      Practice at your own pace. Use the practice mode to slow
                      down the video and focus on perfecting each movement.
                      Remember to warm up before starting and cool down after
                      finishing.
                    </p>
                    <ul className="text-slate-600">
                      <li>Focus on form over speed</li>
                      <li>Use a mirror to check your movements</li>
                      <li>Take breaks when needed</li>
                      <li>Repeat steps until you feel confident</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Next Lessons */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Up Next</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lessons
                .filter((l) => l.id !== lesson.id)
                .slice(0, 5)
                .map((nextLesson) => {
                  const nextProgress = progressStorage.getLessonProgress(
                    nextLesson.id
                  );
                  return (
                    <Link key={nextLesson.id} to={`/lesson/${nextLesson.id}`}>
                      <div className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          {nextProgress?.completed && (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          )}
                          <h4 className="font-semibold text-sm line-clamp-1">
                            {nextLesson.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600">
                          {nextLesson.duration}
                        </p>
                      </div>
                    </Link>
                  );
                })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start">
                  <span className="mr-2">💡</span>
                  Use Practice Mode to slow down and learn each step carefully
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🎯</span>
                  Click on any step to jump directly to that part of the video
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔁</span>
                  Repeat lessons as many times as needed to master the moves
                </li>
                <li className="flex items-start">
                  <span className="mr-2">⚡</span>
                  Adjust playback speed to match your learning pace
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}