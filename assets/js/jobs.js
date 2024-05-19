const listingEl = document.getElementById("listings");

async function fetchJobListings(search) {
    const res = await fetch(`/api/jobs${search}`);
    const json = await res.json();

    console.log(json);

    const html = json.reduce((txt, item) => {
        return txt + createListingCard(item.job, item.creator);
    }, "");

    listingEl.innerHTML = html;

    document.querySelectorAll(".job-card").forEach(btn => {
        btn.addEventListener("click", e => {
            getJobByID(btn.dataset.id);
        });
    });
}

async function getJobByID(id) {
    const res = await fetch(`/api/jobs/${id}`);
    const json = await res.json();

    updateListingView(json.job, json.creator);
}

function createListingCard({ title, openings, job_type, salary, location, id, created_at }, creator) {
    return `<button class="job-card" data-id="${id}">
    <img
        src="${creator.profile_image}"
        alt="google"
        class="card-icon"
    />
    <div class="card-text">
        <div class="text-left">
            <h3 class="card-title">${creator.username}</h3>
            <p class="card-post">
                ${title}
            </p>
            <p class="card-loc">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="icon"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                </svg>
                ${location}
            </p>
            <div class="card-sub">
                <p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="icon"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                    </svg>
                    ${formatDate(created_at)}
                </p>
                <p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="icon"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    ${job_type}
                </p>
                <p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="icon"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                    </svg>
                    ${openings}
                </p>
            </div>
        </div>

        <div class="text-right">
            <p><b>₹${salary}</b><span>/month</span></p>
        </div>
    </div>
</button>`;
}

function updateListingView({ title, description, openings, skills, job_type, salary, location, id, created_at }, creator) {
    const companyImg = document.getElementById("companyImg");
    const companyTitleEl = document.getElementById("jobTitle");
    const postEl = document.getElementById("jobPost");
    const locEl = document.getElementById("jobLocation");
    const aboutCompanyEl = document.getElementById("aboutCompany");
    const qualificationsEl = document.getElementById("jobQualifications");
    const applyBtn = document.getElementById("applyBtn");
    const openingsEl = document.getElementById("openings");
    const jobTypeEl = document.getElementById("jobType");
    const salaryEl = document.getElementById("salary");
    const skillEl = document.getElementById("skills");

    companyImg.src = creator.profile_image;
    companyTitleEl.textContent = creator.username;
    aboutCompanyEl.textContent = creator.about;
    postEl.textContent = title;
    locEl.textContent = location;
    applyBtn.dataset.id = id;
    qualificationsEl.textContent = description;
    openingsEl.textContent = openings;
    jobTypeEl.textContent = job_type;
    salaryEl.textContent = salary;

    console.log(creator);

    const skillHTML = skills.reduce((txt, skill) => {
        return txt + `<div class="pill">${skill}</div>`
    }, "");

    skillEl.innerHTML = skillHTML;
}

function formatDate(timestamp) {
    const date = new Date(timestamp);

    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}


function main() {
    const url = new URL(window.location);
    
    fetchJobListings(url.search);
}

main();