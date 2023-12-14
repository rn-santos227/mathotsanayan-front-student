import Course from "@/types/Course";
import Module from "@/types/Module";
import School from "@/types/School";
import Section from "@/types/Section";
import Subject from "@/types/Subject";
import Teacher from "@/types/Teacher";

export function getCourseName(course: number | string | Course) {
  if (typeof course === "object" && course !== null && "name" in course) {
    return (course as Course).name;
  }
  return "DefaultName";
}

export function getSchoolName(school: number | string | School) {
  if (typeof school === "object" && school !== null && "name" in school) {
    return (school as School).name;
  }
  return "DefaultName";
}

export function getSectionName(section: number | string | Section) {
  if (typeof section === "object" && section !== null && "name" in section) {
    return (section as Section).name;
  }
  return "DefaultName";
}

export function getTeacher(section: number | string | Section) {
  if (typeof section === "object" && section !== null && "name" in section) {
    return getTeacherName(section.teacher);
  }
  return "DefaultName";
}

export function getTeacherName(teacher: number | string | Teacher) {
  if (
    typeof teacher === "object" &&
    teacher !== null &&
    "full_name" in teacher
  ) {
    return (teacher as Teacher).full_name;
  }
  return "DefaultName";
}

export function getSubjectName(subject: number | string | Subject) {
  if (typeof subject === "object" && subject !== null && "name" in subject) {
    return (subject as Subject).name;
  }
  return "DefaultName";
}

export function getModuleName(section: number | Module | undefined) {
  if (typeof section === "object" && section !== null && "name" in section) {
    return (section as Module).name;
  }
  return "DefaultName";
}

export function getModuleStage(section: number | Module | undefined) {
  if (typeof section === "object" && section !== null && "name" in section) {
    return (section as Module).step;
  }
  return "DefaultName";
}

export function getModuleCount(section: number | Module | undefined) {
  if (typeof section === "object" && section !== null && "name" in section) {
    return (section as Module).count;
  }
  return "DefaultName";
}
