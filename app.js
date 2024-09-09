const themeToggler = document.getElementById("theme-toggler");
const pexelsLogo = document.getElementById("pexels-logo");
const body = document.documentElement;

// switch themes 👇🏻
themeToggler.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    themeToggler.innerHTML = "🌙";
    pexelsLogo.src = "https://images.pexels.com/lib/api/pexels-white.png";
  } else {
    themeToggler.innerHTML = "🌞";
    pexelsLogo.src = "https://images.pexels.com/lib/api/pexels.png";
  }
});

const form = document.getElementById("form");
const formBoxTop = document.querySelector(".form-boxTop");
const input = document.getElementById("input");
const gallery = document.getElementById("gallery");

// Dispaly search form
// window.addEventListener("scroll", () => {
//   if (window.scrollY > 100) {
//     formBoxTop.classList.add("flex");
//     formBoxTop.classList.remove("hidden");
//   } else {
//     formBoxTop.classList.remove("flex");
//     formBoxTop.classList.add("hidden");
//   }
// });

// Fetch data
const APIkey = "QNhDLDuQYr7xGRR9Vc3olCY2OptlGdj02B8hb5MIw6E3jAFBtF6dR0KH";
const API = "https://api.pexels.com/v1/search?";

async function fetchImages(query) {
  const encodedQuery = encodeURIComponent(query);

  const endpoint = `${API}query=${encodedQuery}&per_page=80&page=1`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: APIkey,
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong, verify your network and try again");
  }

  const data = await response.json();
  return data;
}

// Display Gallery
function displayGallery(data) {
  gallery.innerHTML = "";

  data.forEach((data) => {
    const galleryItem = document.createElement("div");

    galleryItem.classList.add("group");

    galleryItem.innerHTML = `
      <img src="${data.src.large}" alt="${data.alt}" class="w-full" />
	`;

    gallery.appendChild(galleryItem);
  });
}

// Submit Search key word
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = input.value.trim();

  if (!query) {
    gallery.innerHTML = `
	<em class="text-gray-500 dark:text-gray-200">
		Please Enter a valid key word
	</em>`;
    return;
  }

  gallery.innerHTML = `<em class="text-gray-500 dark:text-gray-200">loading...</em>`;

  try {
    const data = await fetchImages(query);

    displayGallery(data.photos);
  } catch (error) {
    console.log(error);
    gallery.innerHTML = `
	<em class="text-gray-500 dark:text-gray-200">
		Something went wrong
	</em>`;
  }
});

// main of the website
async function fecthHomeImages() {
  const endpoint = `https://api.pexels.com/v1/curated?per_page=70&page=1`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: APIkey,
      },
    });

    if (!response.ok) {
      throw new Error(
        "Something went wrong, verify your network and try again"
      );
    }

    const data = await response.json();
    displayGallery(data.photos);
  } catch (error) {
    console.log(error);
  }
}

fecthHomeImages();
