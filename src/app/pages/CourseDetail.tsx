import { useParams, Link } from "react-router";
import { danceCourses } from "../data/courses";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Clock, Play, CheckCircle2, ArrowLeft } from "lucide-react";
import { progressStorage } from "../utils/storage";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useMemo } from "react";

export function CourseDetail() {
  const { courseId } = useParams();
  const course = danceCourses.find((c) => c.id === courseId);

  const courseProgress = useMemo(() => {
    if (!course) return 0;
    const allProgress = progressStorage.getProgress();
    const completedLessons = course.lessons.filter(
      (lesson) => allProgress[lesson.id]?.completed
    ).length;
    return (completedLessons / course.lessons.length) * 100;
  }, [course]);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-slate-600">Course not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link to="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
      </Link>

      {/* Course Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-6">
            <ImageWithFallback
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-3">
              {course.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-slate-600 mb-4">{course.description}</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Instructor</span>
                  <span className="font-medium">{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Level</span>
                  <Badge
                    variant={
                      course.level === "Beginner"
                        ? "default"
                        : course.level === "Intermediate"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {course.level}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Lessons</span>
                  <span className="font-medium">{course.lessons.length}</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-slate-600">Your Progress</span>
                  <span className="font-medium">{Math.round(courseProgress)}%</span>
                </div>
                <Progress value={courseProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lessons List */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Course Lessons</h2>
        <div className="space-y-4">
          {course.lessons.map((lesson, index) => {
            const lessonProgress = progressStorage.getLessonProgress(lesson.id);
            const isCompleted = lessonProgress?.completed || false;

            return (
              <Link key={lesson.id} to={`/lesson/${lesson.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="relative w-32 h-20 rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={lesson.thumbnail}
                            alt={lesson.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-slate-500">
                                Lesson {index + 1}
                              </span>
                              {isCompleted && (
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              )}
                            </div>
                            <h3 className="text-lg font-semibold mb-1">
                              {lesson.title}
                            </h3>
                            <p className="text-sm text-slate-600 line-clamp-2">
                              {lesson.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-slate-600 mt-3">
                          <span className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {lesson.duration}
                          </span>
                          <span>{lesson.steps.length} steps</span>
                          {lessonProgress && lessonProgress.practiceCount > 0 && (
                            <span>Practiced {lessonProgress.practiceCount}x</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
