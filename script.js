// Init Global Vars
lastJobNum = 0;
jobs = [];
/////////////////////////////////

// Load Newest Jobs on windows load
window.onload = loadNewestJobs;
function loadNewestJobs() {
    const jobsArea = document.getElementById('jobsArea');
    const jobsTitle = document.createElement("h2");
    const jobsContainer = document.createElement("div");
    jobsContainer.id = "jobsContainer";
    jobsTitle.id = 'jobsMainTitle';
    jobsTitle.textContent = `Newest Jobs`;
    jobsArea.appendChild(jobsTitle);
    jobsArea.appendChild(jobsContainer);
    loadJobsfromAPI('', '');
}
/////////////////////////////////

// Load Jobs from API
async function loadJobsfromAPI(description, location) {
    const response = await fetch(`https://github-jobs-proxy.appspot.com/positions?description=${description}&location=${location}`);
    const data = await response.json();
    jobs = data;
    addJobsToHTML();
}
/////////////////////////////////

// Add Jobs Details to HTML in Chunks of up to 10 Jobs
function addJobsToHTML() {
    for (var i = lastJobNum; i < lastJobNum + 10 && i < jobs.length; i++) {
        function addJobInfoToDiv(div) {
            div.appendChild(jobFavorite);
            div.appendChild(jobTitle);
            div.appendChild(jobType);
            div.appendChild(jobLocation);
            div.appendChild(jobCompany);
        }
        const job = jobs[i];
        const jobsContainer = document.getElementById("jobsContainer");
        const jobDiv = document.createElement("div");
        jobDiv.classList.add('jobDiv');
        const jobFavorite = document.createElement("i");
        jobFavorite.onclick = () => addOrRemoveFavorites(jobFavorite, job);
        jobFavorite.classList.add(localStorage.getItem(job.id) === null ? "far" : "fas");
        jobFavorite.classList.add("fa-star");
        const jobTitle = document.createElement("h4");
        jobTitle.textContent = `${job.title}`;
        jobTitle.onclick = () => {
            const modal = document.getElementById("myModal");
            const span = document.getElementById("close");
            const detailsDiv = document.getElementById('moreDetailsDiv');
            detailsDiv.innerHTML = ``;
            modal.style.visibility = "visible";
            modal.style.opacity = 1;
            addJobInfoToDiv(detailsDiv);
            detailsDiv.innerHTML += `
            <hr>
            ${job.description}
            <hr>
            <p>How to apply:</p> ${job.how_to_apply}
            `;
            span.onclick = function () {
                modal.style.visibility = "hidden";
                modal.style.opacity = 0;
                addJobInfoToDiv(jobDiv);
            };
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.visibility = "hidden";
                    modal.style.opacity = 0;
                    addJobInfoToDiv(jobDiv);
                }
            };
        };
        const jobType = document.createElement("p");
        jobType.textContent = `${job.type}`;
        jobType.classList.add('jobTypeP');
        const jobLocation = document.createElement("p");
        jobLocation.textContent = `${job.location} | `;
        jobLocation.classList.add('jobAreaP');
        const jobCompany = document.createElement("a");
        jobCompany.textContent = `${job.company}`;
        jobCompany.setAttribute('href', job.company_url);
        jobCompany.setAttribute('target', "_blank");
        addJobInfoToDiv(jobDiv);
        jobsContainer.appendChild(jobDiv);
    };
    lastJobNum = i;
    if (lastJobNum == jobs.length) {
        const loadMoreJobs = document.getElementById("loadBtn");
        if (loadMoreJobs !== null) {
            loadMoreJobs.id = "noLoadBtn";
        }
    }
    else {
        const loadMoreJobs = document.getElementById("noLoadBtn");
        if (loadMoreJobs !== null) {
            loadMoreJobs.id = "loadBtn";
        }
    }
}
/////////////////////////////////

// Load Category Jobs on Click
Array.from(document.getElementsByClassName("dropdown-item")).forEach(dropItem => {
    dropItem.addEventListener("click", function () {
        lastJobNum = 0;
        const loadMoreJobs = document.getElementById("loadBtn");
        if (loadMoreJobs !== null) {
            loadMoreJobs.id = "noLoadBtn";
        }
        const jobsContainer = document.getElementById("jobsContainer");
        jobsContainer.innerHTML = '';
        document.getElementById('jobsMainTitle').textContent = `${dropItem.textContent} Jobs`
        loadJobsfromAPI(dropItem.textContent, '');
    });
});
/////////////////////////////////

// Load Jobs by Search Query
document.getElementById('searchBtn').addEventListener("click", function () {
    lastJobNum = 0;
    const loadMoreJobs = document.getElementById("loadBtn");
    if (loadMoreJobs !== null) {
        loadMoreJobs.id = "noLoadBtn";
    }
    const jobsContainer = document.getElementById("jobsContainer");
    jobsContainer.innerHTML = '';
    document.getElementById('jobsMainTitle').textContent = `Search Results`
    loadJobsfromAPI(document.getElementById('descriptionInput').value, document.getElementById('locationInput').value);
});
/////////////////////////////////

// Add && Remove Jobs to && from Local Storage
function addOrRemoveFavorites(jobI, job) {
    if (localStorage.getItem(job.id) === null) {
        localStorage.setItem(job.id, JSON.stringify(job));
        jobI.classList.remove("far");
        jobI.classList.add("fas");
    }
    else {
        localStorage.removeItem(job.id);
        jobI.classList.remove("fas");
        jobI.classList.add("far");
    }
}
document.getElementById("starredJobs").addEventListener('click', () => {
    lastJobNum = 0;
    const jobsContainer = document.getElementById("jobsContainer");
    jobsContainer.innerHTML = '';
    document.getElementById('jobsMainTitle').textContent = `Starred Jobs`;
    jobs = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        jobs.push(JSON.parse(localStorage.getItem(key)));
    }
    addJobsToHTML();
    if (jobs.length == 0){
        document.getElementById('jobsMainTitle').textContent = `No Starred Jobs`;
    }
});
/////////////////////////////////