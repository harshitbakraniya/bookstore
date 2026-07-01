import SearchForm from "../../components/SearchForm/index.tsx";
import BookList from "../Books/components/BookList/index.tsx";

const Home = () => {
  return (
    <>
    <div className="relative mx-auto pt-30 pb-10">
      {/* Gradient background */}
      <div
        className="absolute inset-0 z-1 rounded-xl"
        style={{
          background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%, #f9d423 200%)",
          filter: "blur(10px)",
          opacity: 0.6,
        }}
      />
      <h1 className="text-xl lg:text-2xl font-semibold text-center relative z-10">
        Good evening, start reading today
      </h1>
      <SearchForm />
    </div>
    <div className="container mx-auto">
      <BookList />
    </div>
    </>
  );
};

export default Home;
