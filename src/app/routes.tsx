import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { CourseDetail } from "./pages/CourseDetail";
import { LessonVideo } from "./pages/LessonVideo";
import { ProgressPage } from "./pages/Progress";
import { Layout } from "./components/Layout";
import { Auth } from "./pages/Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Auth },
      { path: "course/:courseId", Component: CourseDetail },
      { path: "lesson/:lessonId", Component: LessonVideo },
      { path: "progress", Component: ProgressPage },
    ],
  },
]);