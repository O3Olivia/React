import { useRef } from "react";
import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  const emailEl = useRef();
  const fetcher = useFetcher();

  // useFectcher : form submit을 젝접 트리거하는데 사용되거나, component안에서 loader를 직접 트리거 할 때 사용, 또는 fetcher.form을 통해 form을 구축하는데 사용
  // fetcher를 사용해 form을 제출할 때 : 페이지 전환이 없다. 대신 내부에서 요청이 전송되고, 요청을 전송할 때 특정 페이지를 대상으로 할 수 있다. [페이지 전환 없이 request를 보내고 싶을때 적합 ]

  const signupForNewsletterHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailEl.current.value;
    fetcher.submit(
      {
        email: enteredEmail,
      },
      { method: "post", action: "/newsletter" }
    );
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up for our weekly newsletter</h2>
      {/* <form>대신 <Fetcher.form></Fetcher.form>으로 해도 됨   */}
      <form onSubmit={signupForNewsletterHandler}>
        <input
          ref={emailEl}
          id="email"
          type="email"
          placeholder="Enter your Email"
          aria-label="Your email address."
        />
        <button>Sign Up</button>
      </form>
    </section>
  );
}

export default NewsletterSignup;
