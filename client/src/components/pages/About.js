import React from "react";

export const About = () => {
  return (
    <div>
      <h1>About This App</h1>
      <h2>
        {" "}
        More Info :
        <a
          href="test"
        >
          Click to visit our site
        </a>
      </h2>
      <p className="my-1">This is Software Engineering Project</p>
      <p className="bg-dark p">
        <strong>Version: </strong> 1.0.0
      </p>
    </div>
  );
};

export default About;
