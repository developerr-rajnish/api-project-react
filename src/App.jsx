import { useEffect, useState } from "react";
import "./css/style.css";

function App() {
  const [content, setContent] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { 
    fetch("https://reqres.in/api/users?page=1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setContent(data.data);   
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = content
    ? content.filter((user) =>
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h1 className="py-4">API In React</h1>
            <input
              className="w-25 mx-auto mb-5 form-control"
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="row">
          {filteredUsers.map((user) => (
            <div className="col-lg-4">
              <div key={user.id}>
                <div className="shadow-sm rounded-3">
                  <img
                    className="w-100 rounded-top"
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                  <p className="py-3 ps-3">
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

