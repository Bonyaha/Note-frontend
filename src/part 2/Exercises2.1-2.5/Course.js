const Course = ({ courses }) => {
  console.log(courses);

  return (
    <div>
      <h1>Web devolopment curriculum</h1>
      {courses.map((item) => (
        <>
          <Header title={item.name} />
          <Content parts={item.parts} />
          <Total parts={item.parts} />
        </>
      ))}
      {/* <Header title={course.name} />
      
       */}
    </div>
  );
};

const Header = ({ title }) => {
  return <h2>{title}</h2>;
};
const Part = (props) => {
  return (
    <div>
      <ul>
        <li>
          {props.name} {props.exercises}
        </li>
      </ul>
    </div>
  );
};
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((item) => {
        return (
          <Part name={item.name} key={item.id} exercises={item.exercises} />
        );
      })}
    </div>
  );
};
const Total = ({ parts }) => {
  return (
    <p>
      <strong>
        Number of exercises
        {parts.reduce((item, currentItem) => item + currentItem.exercises, 0)}
      </strong>
    </p>
  );
};
export default Course;
