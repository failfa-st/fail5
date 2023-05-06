import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [tweet, setTweet] = useState(null);
  console.log("TWEET", tweet);
  async function fetcher(data: { question: string }) {
    try {
      setLoading(true);
      const response = await axios.post("/api/tweet", data);
      setTweet(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const data = Object.fromEntries(formData);
          fetcher(data as { question: string });
        }}
      >
        {/* <textarea id="question" name="question" /> */}
        <button disabled={loading}>submit</button>
      </form>
      {loading || !tweet ? (
        <>loading..</>
      ) : (
        <>
          <h2>{tweet.message.tweet}</h2>
          <h3>Thought: {tweet.message.thought}</h3>
          <h3>Reason: {tweet.message.reason}</h3>
          <h3>Reflection: {tweet.message.reflection}</h3>
          <h4>Image prompt: {tweet.message.images[0].prompt}</h4>
          <img
            alt="image"
            src={`data:image/png;base64,${tweet.files[0].content}`}
          />
          {/* <code>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {JSON.stringify(tweet, null, 4)}
            </pre>
          </code> */}
        </>
      )}
    </>
  );
}
