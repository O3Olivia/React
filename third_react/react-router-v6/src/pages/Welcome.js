import { Routes, Route } from "react-router-dom";

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Routes>
        <Route path="new-user" element={<p>Welcome, New user!</p>} />
      </Routes>
    </section>
  );
};

export default Welcome;
