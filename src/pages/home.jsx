import { useEffect } from "react";

export default function Home() {
  const requestHeader = {
    method: "GET",
    mode: "cors",
  };
  useEffect(() => {
    fetch("http://localhost:4000/", requestHeader)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return <div>Home Page</div>;
}
