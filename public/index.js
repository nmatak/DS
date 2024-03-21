document.addEventListener("DOMContentLoaded", function () {
  fetchJokeTypes();
});

async function fetchJokeTypes() {
  try {
    const response = await fetch("http://localhost:3000/type");
    if (!response.ok) {
      throw new Error("Failed to fetch joke types");
    }
    const data = await response.json();
    const select = document.getElementById("jokeType");
    data.forEach((type) => {
      const option = document.createElement("option");
      option.value = type.type;
      option.textContent = type.type;
      select.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}

async function getJoke() {
  try {
    const type = document.getElementById("jokeType").value;
    const response = await fetch(`http://localhost:3000/joke?type=${type}`);
    const data = await response.json();
    const jokeContainer = document.getElementById("jokeContainer");

    jokeContainer.innerHTML = "";

    data.forEach((joke) => {
      const p = document.createElement("p");
      p.textContent = joke.joke_text;
      jokeContainer.appendChild(p);
    });
  } catch (error) {
    console.error(error);
  }
}
