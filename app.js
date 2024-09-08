const themeToggler = document.getElementById("theme-toggler");
const pexelsLogo = document.getElementById("pexels-logo");
const body = document.documentElement;

// switch themes 👇🏻
themeToggler.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    themeToggler.innerHTML = "Dark";
    pexelsLogo.src = "https://images.pexels.com/lib/api/pexels-white.png";
  } else {
    themeToggler.innerHTML = "Light";
    pexelsLogo.src = "https://images.pexels.com/lib/api/pexels.png";
  }
});


// Fetch data
const form = document.getElementById("form");
const input = document.getElementById("input");
// const enterBtn = document.getElementById("enter-btn");
const gallery = document.getElementById("gallery");

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

    // galleryItem.classList.add("cool");

    galleryItem.innerHTML = `
		<img 
			src="${data.src.large}" alt="${data.alt}"
			class="w-full h-full object-cover"
		 />
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

