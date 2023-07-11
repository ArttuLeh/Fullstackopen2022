interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface Description extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends Description {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends Description {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartWithRequirements extends Description {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartWithRequirements;
