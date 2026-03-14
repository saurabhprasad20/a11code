import { courses } from '../../../data/courses';
import CourseDetail from '../../../components/CourseDetail';

export function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.id }));
}

export function generateMetadata({ params }) {
  const course = courses.find((c) => c.id === params.courseId);
  if (!course) return { title: 'Course Not Found - A11Code' };
  return {
    title: `${course.title} - A11Code Courses`,
    description: course.description,
  };
}

export default function CourseDetailPage({ params }) {
  return <CourseDetail courseId={params.courseId} />;
}
