import QuoteList from "../components/quotes/QuoteList";

const DUMMY_QUOTES = [
  { id: "q1", author: "Olivia", text: "Learning React is Super Fun!!" },
  { id: "q2", author: "Rachel", text: "Learning React is Great" },
];

const AllQuotes = () => {
  return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default AllQuotes;
