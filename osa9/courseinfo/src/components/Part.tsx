import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <i>{part.description}</i>
          </div>
          <br></br>
        </div>
      );
    case 'group':
      return (
        <div>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>Project exercises: {part.groupProjectCount}</div>
          <br></br>
        </div>
      );
    case 'background':
      return (
        <div>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>{part.description}</div>
          <div>
            Submit to:{' '}
            <a href="https://type-level-typescript.com/template-literal-types">
              {part.backgroundMaterial}
            </a>
          </div>
          <br></br>
        </div>
      );
    case 'special':
      return (
        <div>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <i>{part.description}</i>
          </div>
          <div>
            Required skills: {part.requirements.map((r) => r).join(', ')}
          </div>
          <br></br>
        </div>
      );
    default:
      return assertNever(part);
  }
};
export default Part;
