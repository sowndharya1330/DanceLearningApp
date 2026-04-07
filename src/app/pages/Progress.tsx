import { useMemo } from "react";
import { Link } from "react-router";
import { danceCourses } from "../data/courses";
import { progressStorage } from "../utils/storage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress as ProgressBar } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Trophy,
  Clock,
  CheckCircle2,
  TrendingUp,
  Target,
  Calendar,
} from "lucide-react";

export function ProgressPage() {
  const progressData = useMemo(() => {
    const allProgress = progressStorage.getProgress();
    
    // Calculate statistics
    const totalLessons = danceCourses.reduce(
      (acc, course) => acc + course.lessons.length,
      0
    );
    const completedLessons = Object.values(allProgress).filter(
      (p) => p.completed
    ).length;
    const totalPracticeCount = Object.values(allProgress).reduce(
      (acc, p) => acc + p.practiceCount,
      0
    );

    // Calculate total watch time (mock - in real app would track actual time)
    const totalWatchTime = completedLessons * 10; // Assume 10 min per lesson

    // Course progress
    const courseProgress = danceCourses.map((course) => {
      const completed = course.lessons.filter(
        (lesson) => allProgress[lesson.id]?.completed
      ).length;
      const percentage = (completed / course.lessons.length) * 100;
      return {
        course,
        completed,
        total: course.lessons.length,
        percentage,
      };
    });

    // Recent activity
    const recentActivity = Object.entries(allProgress)
      .filter(([_, progress]) => progress.completed)
      .sort(
        (a, b) =>
          new Date(b[1].dateCompleted || 0).getTime() -
          new Date(a[1].dateCompleted || 0).getTime()
      )
      .slice(0, 5)
      .map(([lessonId, progress]) => {
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
        return { lesson, course, progress };
      });

    return {
      totalLessons,
      completedLessons,
      completionRate: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0,
      totalPracticeCount,
      totalWatchTime,
      courseProgress,
      recentActivity,
    };
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
        <p className="text-slate-600">
          Track your learning journey and celebrate your achievements
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Completed Lessons</p>
                <p className="text-2xl font-bold">
                  {progressData.completedLessons}
                  <span className="text-lg text-slate-400">
                    /{progressData.totalLessons}
                  </span>
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Completion Rate</p>
                <p className="text-2xl font-bold">
                  {Math.round(progressData.completionRate)}%
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Practice Sessions</p>
                <p className="text-2xl font-bold">
                  {progressData.totalPracticeCount}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Watch Time</p>
                <p className="text-2xl font-bold">
                  {progressData.totalWatchTime}
                  <span className="text-lg text-slate-400">min</span>
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Progress */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-yellow-600" />
                Course Progress
              </CardTitle>
              <CardDescription>Your progress across all courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {progressData.courseProgress
                .filter((cp) => cp.completed > 0 || cp.percentage > 0)
                .map((cp) => (
                  <div key={cp.course.id}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{cp.course.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {cp.course.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">
                          {cp.completed} of {cp.total} lessons completed
                        </p>
                      </div>
                      <span className="text-lg font-bold text-purple-600">
                        {Math.round(cp.percentage)}%
                      </span>
                    </div>
                    <ProgressBar value={cp.percentage} className="h-2 mb-2" />
                    <Link to={`/course/${cp.course.id}`}>
                      <Button variant="outline" size="sm">
                        Continue Learning
                      </Button>
                    </Link>
                  </div>
                ))}

              {progressData.courseProgress.every(
                (cp) => cp.completed === 0 && cp.percentage === 0
              ) && (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600 mb-4">
                    Start learning to track your progress
                  </p>
                  <Link to="/">
                    <Button>Browse Courses</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Milestones you've reached</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {progressData.completedLessons >= 1 && (
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-3xl mb-2">🎯</div>
                    <p className="text-sm font-semibold">First Steps</p>
                    <p className="text-xs text-slate-600">
                      Completed first lesson
                    </p>
                  </div>
                )}
                {progressData.completedLessons >= 5 && (
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-3xl mb-2">🌟</div>
                    <p className="text-sm font-semibold">Dedicated Learner</p>
                    <p className="text-xs text-slate-600">5 lessons completed</p>
                  </div>
                )}
                {progressData.completedLessons >= 10 && (
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-3xl mb-2">💪</div>
                    <p className="text-sm font-semibold">Committed Dancer</p>
                    <p className="text-xs text-slate-600">10 lessons completed</p>
                  </div>
                )}
                {progressData.totalPracticeCount >= 5 && (
                  <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-3xl mb-2">🔥</div>
                    <p className="text-sm font-semibold">Practice Makes Perfect</p>
                    <p className="text-xs text-slate-600">5 practice sessions</p>
                  </div>
                )}
                {progressData.courseProgress.some((cp) => cp.percentage === 100) && (
                  <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-3xl mb-2">🏆</div>
                    <p className="text-sm font-semibold">Course Master</p>
                    <p className="text-xs text-slate-600">
                      Completed a full course
                    </p>
                  </div>
                )}
                {progressData.completedLessons === 0 && (
                  <div className="col-span-2 md:col-span-3 text-center py-6 text-slate-400">
                    Complete lessons to unlock achievements
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest completed lessons</CardDescription>
            </CardHeader>
            <CardContent>
              {progressData.recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {progressData.recentActivity.map(
                    ({ lesson, course, progress }) => {
                      if (!lesson || !course) return null;
                      return (
                        <div
                          key={lesson.id}
                          className="border-l-2 border-green-600 pl-3"
                        >
                          <div className="flex items-start gap-2 mb-1">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <Link to={`/lesson/${lesson.id}`}>
                                <p className="font-semibold text-sm hover:text-purple-600 line-clamp-1">
                                  {lesson.title}
                                </p>
                              </Link>
                              <p className="text-xs text-slate-600 line-clamp-1">
                                {course.title}
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                {formatDate(progress.dateCompleted)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-600">
                    No completed lessons yet
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Goals Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Keep Going!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                {progressData.completedLessons < progressData.totalLessons && (
                  <div className="flex items-start">
                    <span className="mr-2">🎯</span>
                    <p className="text-slate-600">
                      Complete{" "}
                      {progressData.totalLessons - progressData.completedLessons}{" "}
                      more lessons to finish all courses
                    </p>
                  </div>
                )}
                {progressData.totalPracticeCount < 10 && (
                  <div className="flex items-start">
                    <span className="mr-2">💪</span>
                    <p className="text-slate-600">
                      Practice {10 - progressData.totalPracticeCount} more times
                      to build muscle memory
                    </p>
                  </div>
                )}
                <div className="flex items-start">
                  <span className="mr-2">⭐</span>
                  <p className="text-slate-600">
                    Consistency is key - try to practice a little every day
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}