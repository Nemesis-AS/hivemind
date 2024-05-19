const listingEl = document.getElementById("listings");

async function fetchJobListings(search) {
    const res = await fetch(`/api/gigs`);
    const json = await res.json();

    console.log(json);

    const html = json.reduce((txt, item) => {
        return txt + createListingCard(item);
    }, "");

    listingEl.innerHTML = html;
}

function createListingCard({ title, description, openings, skills, job_type, price, location, id, created_at }) {
    return `<button class="job-card">
    <img
        src="images/google.png"
        alt="google"
        class="card-icon"
    />
    <div class="card-text">
        <div class="text-left">
            <h3 class="card-title">Google</h3>
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
                    ${created_at}
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
            <p><b>₹${price}</b></p>
        </div>
    </div>
</button>`;
}

function updateListingView({ title, description, openings, skills, job_type, salary, location, id, created_at }) {
    const companyTitleEl = document.getElementById("jobTitle");
    const postEl = document.getElementById("jobPost");
    const locEl = document.getElementById("jobLocation");
    const aboutCompanyEl = document.getElementById("aboutCompany");
    const qualificationsEl = document.getElementById("jobQualifications");
    const applyBtn = document.getElementById("applyBtn");

    // titleEl.textContent = title;
    postEl.textContent = title;
    locEl.textContent = location;
    qualificationsEl.textContent = skills;
    applyBtn.dataset.id = id;
}


function main() {
    const url = new URL(window.location);
    
    fetchJobListings(url.search);
}

main();