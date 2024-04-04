// smooth scrolling
const scroll = new LocomotiveScroll({
    el: document.querySelector('body'),
    smooth: true
});

let allBlogs = document.querySelector(".blogs");

let searchField = document.querySelector("input");
let searchButton = document.querySelector("button");

// fetching random api's for displaying data fir first time
const fetchRandom = async () => {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=apple&from=2024-03-15&to=2024-03-15&sortBy=popularity&apiKey=f3666efd6041425e979b3fa5679ca4be&pageSize=22`;
        let response = await fetch(apiUrl);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log("Unable to fetch data", error);
        return [];
    }
}

// display api content to the webpage for first time
(function() {
    const displayBlogs = async () => {
        try {
            let allData = await fetchRandom();
            allBlogs.innerHTML = "";
            allData.articles.forEach(ele => {
                var blogCard = document.createElement("div");
                blogCard.classList.add("blog-card");
                const img = document.createElement("img");
                img.src = ele.urlToImage;
                img.alt = ele.title;
                const title = document.createElement("h3");
                title.textContent = ele.title;
                const des = document.createElement("p");
                des.textContent = ele.description;

                blogCard.appendChild(img);
                blogCard.appendChild(title);
                blogCard.appendChild(des);
                blogCard.addEventListener("click", () => {
                    window.open(ele.url, "_blank");
                })
                allBlogs.appendChild(blogCard);
            });
        } catch (error) {
            console.log("Error displaying blogs", error);
        }
    }

    // Call the displayBlogs function immediately
    displayBlogs();
})();



// user interaction 
searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const fetchData = await fetchNewsQuery(query);
            displayFetchBlogs(fetchData); // Pass fetchData to displayFetchBlogs
        } catch (error) {
            console.log("error fetching query data", error);
        }
    }
})

// input he user query
const fetchNewsQuery = async (query) => {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2024-03-15&to=2024-03-15&sortBy=popularity&apiKey=f3666efd6041425e979b3fa5679ca4be&pageSize=22`;
        let response = await fetch(apiUrl);
        let data = await response.json();
        return data
    } catch (error) {
        console.log("Unable to fetch data", error);
        return [];
    }
}



// display api content of user input query
const displayFetchBlogs = async (fetchData) => { // Accept fetchData as a parameter
    try {
        allBlogs.innerHTML = "";
        fetchData.articles.forEach(ele => {
            var blogCard = document.createElement("div");
            blogCard.classList.add("blog-card");
            const img = document.createElement("img");
            img.src = ele.urlToImage;
            img.alt = ele.title;
            const title = document.createElement("h3");
            title.textContent = ele.title;
            const des = document.createElement("p");
            des.textContent = ele.description;

            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(des);
            blogCard.addEventListener("click", () => {
                window.open(ele.url, "_blank");
            })
            allBlogs.appendChild(blogCard);
        });
    } catch (error) {
        console.log("Error displaying blogs", error);
    }
}
