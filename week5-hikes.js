//create an array of hikes
const hikeList = [
    {
        name: "Bechler Falls",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "3 miles",
        difficulty: "Easy",
        description:
            "Beautiful short hike along the Bechler river to Bechler Falls",
        directions:
            "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
    },
    {
        name: "Teton Canyon",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "3 miles",
        difficulty: "Easy",
        description: "Beautiful short (or long) hike through Teton Canyon.",
        directions:
            "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Stateline Road for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
    },
    {
        name: "Denanda Falls",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "7 miles",
        difficulty: "Moderate",
        description:
            "Beautiful hike through Bechler meadows river to Denanda Falls",
        directions:
            "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
    }
];

const imgBasePath = "/Web-Frontend-Dev-II/img/";

export default class Hikes {
    constructor(elementId) {
        this.parentElement = document.getElementById(elementId);
        this.backButton = this.buildBackButton();
    }

    //get list of all hikes
    getAllHikes() {
        return hikeList;
    }

    //get just one hike by name (used for showOneHike() function)
    getHikeByName(hikeName) {
        return this.getAllHikes().find(hike => hike.name === hikeName);
    }

    //show a list of hikes in the parentElement
    showHikeList() {
        renderHikeList(this.parentElement, hikeList);
        this.addHikeListener();
    }

    //show one hike with full details in the parentElement
    showOneHike(hikeName) {
        this.parentElement.innerHTML = "";
        this.parentElement.appendChild(renderOneHikeFull(this.getHikeByName(hikeName)));
        this.parentElement.appendChild(this.buildBackButton());
    }

    //add click listener on the list element
    addHikeListener() {
        // document.getElementById("Bechler Falls").addEventListener("click", this.showOneHike("Bechler Falls"));
        let list = Array.from(this.parentElement);
        list.forEach(listItem => {
            listItem.addEventListener("click", this.showOneHike(listItem.id));
        });
    }

    buildBackButton() {
        const backButton = document.createElement("button");
        backButton.addEventListener("click", this.showHikeList());
        return backButton;
    }
}

function renderHikeList(parent, hikes) {
    parent.innerHTML = "";
    hikes.forEach(hike => {
        parent.appendChild(renderOneHikeLight(hike));
    });
}

function renderOneHikeLight(hike) {
    const item = document.createElement("li");
    item.setAttribute("id", hike.name);
    item.classList.add('light');
    item.innerHTML = `
        <h2>${hike.name}</h2>
        <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
        <div>
            <div>
                <h3>Distance</h3>
                <p>${hike.distance}</p>
            </div>
            <div>
                <h3>Difficulty</h3>
                <p>${hike.difficulty}</p>
            </div>
        </div>`;
    return item;
}

function renderOneHikeFull(hike) {
    const item = document.createElement("li");
    item.innerHTML = `<h2>${hike.name}</h2>
        <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
        <div>
            <div>
                <h3>Distance</h3>
                <p>${hike.distance}</p>
            </div>
            <div>
                <h3>Difficulty</h3>
                <p>${hike.difficulty}</p>
            </div>
            <div>
                <h3>Description</h3>
                <p>${hike.description}</p>
            </div>
            <div>
                <h3>Directions</h3>
                <p>${hike.directions}</p>
            </div>
        </div>`;
    return item;
}