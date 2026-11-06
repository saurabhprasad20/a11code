import { courses } from '../../../data/courses';
import CourseDetail from '../../../components/CourseDetail';
import CourseGate from '../../../components/CourseGate';
import courseAccess from '../../../config/course-access.json';
import CoursesUnavailable, { unavailableMetadata } from '../../../components/CoursesUnavailable';

const { coursesPaused } = courseAccess;

export function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.id }));
}

export function generateMetadata({ params }) {
  if (coursesPaused) return unavailableMetadata;

  const course = courses.find((c) => c.id === params.courseId);
  if (!course) return { title: 'Course Not Found - A11Code' };
  return {
    title: `${course.title} - A11Code Courses`,
    description: course.description,
  };
}

export default function CourseDetailPage({ params }) {
  if (coursesPaused) return <CoursesUnavailable />;

  return (
    <CourseGate>
      <CourseDetail courseId={params.courseId} />
    </CourseGate>
  );
}
