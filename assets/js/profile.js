async function fetchProfile() {
    const res = await fetch("/api/developers/User1");
    const json = await res.json();
    populateProfile(json);
}

async function fetchReviews() {
    const res = await fetch("/api/reviews/User1");
    const json = await res.json();

    console.log(json);
    populateReviews(json);
}

async function fetchApplications() {
    const res = await fetch("/api/applications/User1");
    const json = await res.json();

    console.log(json);
    populateApplications(json);
}

function populateProfile({ id, profile_image, skills, username }) {
    // console.log(id);
    const imgEl = document.getElementById("viewImg");
    const usernameEl = document.getAnimations("viewUsername");
    const skillEl = document.getElementById("viewSkills");

    imgEl.src = profile_image;
    usernameEl.textContent = username;
    skillEl.innerHTML = skills.reduce((html, skill) => html+`<div class="pill">${skill}</div>`, "");
}

function populateApplications(json) {
    const applicationEl = document.getElementById("applicationListings");

    // @todo!
    applicationEl.innerHTML = json.reduce((html, app) => html+`<div class="listing">
    <img src="images/google.png" alt="" />
    <div class="text">
        <div class="text-right">
            <div class="company-title">Google</div>
            <div class="job-title">Software Engineer</div>
            <div class="job-type">Full time</div>
        </div>
        <div class="text-left">
            <div class="salary">
                <b>Salary: </b>20000/month
            </div>
            <div class="status"><b>Status: </b>Pending</div>
        </div>
    </div>
</div>`, "");
}

function populateReviews(json) {
    const reviewEl = document.getElementById("reviewListings");

    reviewEl.innerHTML = json.reduce((html, review) => html+`<div class="review"><img src="images/google.png" alt="" /><div class="text"><div class="review-text">${review.text}</div><div class="review-foot">- HR, Google</div></div></div>`, "");
}

fetchProfile();
// fetchApplications();
// fetchReviews();