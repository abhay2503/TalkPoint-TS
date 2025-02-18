import Container from "./layout/Container";
import Footer from "./layout/Footer";
import HashtagList from "../hashtag/HashtagList";
import { useFeedbackItemssStore } from "../stores/feedbackStore";
import { useEffect } from "react";

export default function App() {
  const fetchFeedbackItems = useFeedbackItemssStore((state) => state.fetchFeedbackItems)

  useEffect(() => {
    fetchFeedbackItems()
  }, [fetchFeedbackItems])

  return (
    <div className="app">
      <Footer />

      <Container />

      <HashtagList />
    </div>
  )
}
