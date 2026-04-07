import { Link } from "react-router";
import { danceCourses } from "../data/courses";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Clock, Award } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Home() {
  const categories = ["All", "Adavus", "Mudras", "Margam Items", "Abhinaya"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-600 to-pink-600 rounded-3xl p-8 md:p-12 mb-12 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Master Bharatanatyam
          </h1>
          <p className="text-lg md:text-xl mb-6 text-orange-100">
            Learn classical Indian dance with step-by-step guidance, from Adavus to Varnams. Perfect your technique with practice mode and track your journey.
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              <span>Learn at your pace</span>
            </div>
            <div className="flex items-center">
              <Award className="mr-2 h-5 w-5" />
              <span>Traditional Gurus</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={cat === "All" ? "default" : "outline"}
              className="px-4 py-2 cursor-pointer hover:bg-orange-100"
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {danceCourses.map((course) => (
          <Link key={course.id} to={`/course/${course.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
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
              </div>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="mb-2">
                    {course.category}
                  </Badge>
                </div>
                <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {course.duration}
                  </span>
                  <span>{course.lessons.length} lessons</span>
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  by {course.instructor}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}