import { useDispatch, useSelector } from "react-redux";
import { fetchReposAction } from "./redux/slices/githubSlices";
import imgPic from "./img/finder.svg";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("shakthiii");
  const [includeFork, setIncludeFork] = useState(false);
  const repos = useSelector((state) => state?.repos);
  const { loading, repoList, error } = repos;
  console.log(user, repos);

  const dispatch = useDispatch();

  console.log(user);
  //captialize first letter
  // const str = user || "";
  // const str2 = str.slice(1);
  // const value = str[0].toUpperCase() + str2.toLocaleLowerCase();
  // console.log(value);
  //
  return (
    <>
      <section class="relative 2xl bg-gray-800 min-h-screen">
        <div class="relative container px-4 mx-auto">
          <div class="text-center mb-20">
            <div class="flex justify-center">
              <img class="h-64  rounded-lg object-cover" src={imgPic} alt="" />
            </div>

            <h2 class="mt-10 mb-5 text-5xl font-bold font-heading text-indigo-300">
              GitHub Finder
            </h2>
            <div className="mt-2 flex justify-center searchBar">
              <input
                value={user}
                onChange={(e) => setUser(e.target?.value)}
                type="text"
                name="email"
                id="email"
                className="SearchBar shadow-sm text-center focus:ring-indigo-500 p-2 focus:border-indigo-500  sm:text-sm border-gray-300 w-full rounded-md lg:w-1/2"
                placeholder="Search For User"
              />

              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => dispatch(fetchReposAction(user))}
                disabled={user.length === 0 ? "disabled" : ""}
                style={{ margin: "0 5px 0 5px" }}
              >
                Search
              </button>
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIncludeFork(!includeFork)}
              >
                Include Fork
              </button>
            </div>
            {/* <div class="form-check">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ margin: "5px" }}
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexCheckDefault"
                style={{ color: "white" }}
              >
                Default checkbox
              </label>
            </div> */}
          </div>
          {loading ? (
            <h1 class="text-green-300 text-3xl text-center">Loading</h1>
          ) : error ? (
            <h1 class="text-red-500 text-lg text-center">
              {error?.data.message}
            </h1>
          ) : (
            <div class="mx-auto">
              <div class="w-full">
                <h1 class="mt-10 mb-5 text-2xl font-bold font-heading text-indigo-100 text-center">{`${user}'s Github Repo's`}</h1>
                <div class="overflow-x-auto relative">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-100 uppercase bg-gray-600 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="py-3 px-6">
                          Name
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Language
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Description
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Size
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {repoList?.name !== "Error" &&
                        repoList?.map((repo) => (
                          <>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <th
                                scope="row"
                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {repo?.name}
                              </th>
                              <td class="py-4 px-6">{repo?.language}</td>
                              <td class="py-4 px-6">{repo?.description}</td>
                              <td class="py-4 px-6">{repo?.size}</td>
                            </tr>
                            {/* </div> */}
                          </>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
