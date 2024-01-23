// https://api.github.com/users/Sooraj-Rao/repos
// https://api.github.com/users/Sooraj-Rao/repos?page=1&per_page=2

const FetchData = async (event) => {
  event.preventDefault();
  const Input = document.getElementById("input").value;
  const loader = document.querySelectorAll(".loaderDiv");
  document.querySelectorAll(".header")[1].innerHTML = "";
  document.querySelectorAll(".repoList")[1].innerHTML = "";
  document.querySelector(".repoLink").innerHTML = "";
  document.querySelector(".errorMsg").classList.add("hide");

  if (Input?.length == 0) return;
  try {
    loader.forEach((itm) => {
      itm.classList.remove("hide");
    });
    const res = await fetch(`https://api.github.com/users/${Input}/repos?page=1&per_page=10`);
    loader.forEach((itm) => {
      itm.classList.add("hide");
    });
    if (!res.ok) {
      return document.querySelector(".errorMsg").classList.remove("hide");
    }
    const repo = await res.json();
    if (repo?.length == 0) {
      return document.querySelector(".errorMsg").classList.remove("hide");
    }
    const user = await fetch(`https://api.github.com/users/${Input}`);
    const userData = await user.json();
    const data = { userData, repo };
    updateDOM(data);
  } catch (error) {
    console.error(error);
  }
};

const updateDOM = (repositories) => {
  const { userData, repo } = repositories;
  console.log(userData);
  const headerContainer = document.querySelectorAll(".header")[1];
  const repoListContainer = document.querySelectorAll(".repoList")[1];
  const RepoLinkDiv = document.querySelector(".repoLink");

  headerContainer.innerHTML = "";
  repoListContainer.innerHTML = "";
  RepoLinkDiv.innerHTML = "";

  const createLogo = document.createElement("img");
  createLogo.src = repo[0]?.owner?.avatar_url;
  createLogo.classList.add("logo");
  headerContainer.appendChild(createLogo);

  RepoLinkDiv.classList.remove("hide");
  const createLink = document.createElement("a");
  createLink.href = repo[0]?.owner?.html_url;
  createLink.target = "_blank";
  createLink.textContent = repo[0]?.owner?.html_url;
  RepoLinkDiv.appendChild(createLink);

  repo[0]?.owner?.html_url;

  const createInfoDiv = document.createElement("div");
  createInfoDiv.classList.add("userInfo");
  const title = document.createElement("h1");
  title.textContent = userData?.name;
  const bio = document.createElement("h3");
  bio.textContent = userData?.bio;
  const location = document.createElement("h3");
  location.textContent = userData?.location;
  createInfoDiv.appendChild(title);
  createInfoDiv.appendChild(bio);
  createInfoDiv.appendChild(location);
  headerContainer.appendChild(createInfoDiv);

  repo.forEach((repo) => {
    const repoElement = document.createElement("div");
    repoElement.classList.add("Repos");

    const nameElement = document.createElement("h2");
    nameElement.textContent = repo?.name;
    repoElement.appendChild(nameElement);

    const descriptionElement = document.createElement("h3");
    descriptionElement.textContent = repo?.description;
    repoElement.appendChild(descriptionElement);

    const languagesElement = document.createElement("div");

    // Check if repo.languages is defined before using forEach
    if (repo.language) {
      const languageSpan = document.createElement("span");
      languageSpan.textContent = repo.language;
      languagesElement.appendChild(languageSpan);
    }

    repoElement.appendChild(languagesElement);

    repoListContainer.appendChild(repoElement);
  });
};
