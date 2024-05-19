const listingEl = document.getElementById("listings");

async function fetchJobListings(search) {
    const res = await fetch(`/api/gigs`);
    const json = await res.json();

    console.log(json);

    const html = json.reduce((txt, item) => {
        return txt + createListingCard(item.gig, item.creator);
    }, "");

    listingEl.innerHTML = html;

    document.querySelectorAll(".job-card").forEach(card => {
        card.addEventListener("click", e => {
            getJobByID(card.dataset.id);
        });
    });
}

async function getJobByID(id) {
    const res = await fetch(`/api/gigs/${id}`);
    const json = await res.json();

    updateListingView(json.gig, json.creator);
}

function createListingCard({ title, openings, job_type, price, location, id, created_at }, creator) {
    // return `<button data-id="${id}" class="job-card"><img alt="google" class="card-icon" src="images/google.png"><div class="card-text"><div class="text-left"><h3 class="card-title">Google</h3><p class="card-post">${title}<p class="card-loc"><svg class="icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" stroke-linecap="round" stroke-linejoin="round"/></svg> ${location}<div class="card-sub"><p><svg class="icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" stroke-linecap="round" stroke-linejoin="round"/></svg> ${created_at}<p><svg class="icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke-linecap="round" stroke-linejoin="round"/></svg> ${job_type}<p><svg class="icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" stroke-linecap="round" stroke-linejoin="round"/></svg> ${openings}</div></div><div class="text-right"><p><b>₹${price}</b></div></div></button>`;

    return `<button class="job-card" data-id="${id}"><img alt="google" class="card-icon" src="${creator.profile_image}"><div class="card-text"><div class="text-left"><h3 class="card-title">${creator.username}</h3><p class="card-post">${title}<div class="card-sub"><p><svg class="icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" stroke-linecap="round" stroke-linejoin="round"/></svg> ${formatDate(created_at)}</div></div><div class="text-right"><p><b>₹${price}</b><span>/month</span></div></div></button>`;
}

function updateListingView({ title, description, openings, skills, job_type, price, location, id, created_at }, creator) {
    const html = `<div class="head"><img src="${creator.profile_image}" alt="${creator.username}" /><div class="head-text"><div id="jobTitle" class="title">${creator.username}</div><div id="jobPost" class="post">${title}</div> <div class="location"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon" ><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg><span id="jobLocation">${location}</span></div></div></div><div class="body"><h3 class="title">About Company</h3><p id="aboutCompany" class="about-text">${creator.about}</p><hr class="divider" /><h3 class="title">About Job</h3><p id="jobQualifications" class="qualifications">${description}</p><div class="subtitle"><b>Price: </b> <span>₹${price}</span></div><h3 class="title">Skills Required</h3><div class="skills" id="skills">${generatePills(skills)}</div></div><div class="foot"><button id="applyBtn" data-id=${id}>Apply now!</button></div>`;

    document.getElementById("listingInfo").innerHTML = html;
}

function formatDate(timestamp) {
    const date = new Date(timestamp);

    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

function generatePills(skills) {
    return skills.reduce((txt, skill) => {
        return txt + `<div class="pill">${skill}</div>`
    }, "");
}

function main() {
    const url = new URL(window.location);

    const params = new URLSearchParams(url.search);

    const search = params.get("search");
    const selected = params.get("selected");

    if (search) {
        console.log("Searching for...");
    } else if (selected) {
        getJobByID(selected);
    }
    
    fetchJobListings(url.search);
}

main();