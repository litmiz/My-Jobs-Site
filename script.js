lastJobNum = 0;
jobs = [];

window.onload = loadNewestJobs;

function loadNewestJobs() {
    const jobsArea = document.getElementById('jobsArea');
    const jobsTitle = document.createElement("h2");
    const jobsContainer = document.createElement("div");
    jobsContainer.id = "jobsContainer";
    jobsTitle.textContent = `Newest Jobs`;
    jobsArea.appendChild(jobsTitle);
    jobsArea.appendChild(jobsContainer);
    loadJobsfromAPI();
}

async function loadJobsfromAPI() {
    const response = await fetch('https://github-jobs-proxy.appspot.com/positions?description=&location');
    const data = await response.json();
    jobs = data;
    addJobsToHTML();
}


function addJobsToHTML() {
    for (var i = lastJobNum; i < lastJobNum + 10; i++) {
        const job = jobs[i];
        const jobsContainer = document.getElementById("jobsContainer");
        const jobDiv = document.createElement("div");
        jobDiv.classList.add('jobDiv');
        const jobFavorite = document.createElement("i");
        jobFavorite.classList.add("far");
        jobFavorite.classList.add("fa-star");
        const jobTitle = document.createElement("h4");
        jobTitle.textContent = `${job.title}`;
        const jobType = document.createElement("p");
        jobType.textContent = `${job.type}`;
        jobType.classList.add('jobAreaP');
        const jobLocation = document.createElement("p");
        jobLocation.textContent = `${job.location}`;
        jobLocation.classList.add('jobAreaP');
        const jobCompany = document.createElement("a");
        jobCompany.textContent = `${job.company}`;
        jobCompany.setAttribute('href', job.company_url);
        jobCompany.setAttribute('target', "_blank");
        jobDiv.appendChild(jobFavorite);
        jobDiv.appendChild(jobTitle);
        jobDiv.appendChild(jobType);
        jobDiv.appendChild(jobLocation);
        jobDiv.appendChild(jobCompany);
        jobsContainer.appendChild(jobDiv);
    };
    lastJobNum = i;
    if (lastJobNum == jobs.length) {
        const loadMoreJobs = document.getElementById("loadBtn");
        loadMoreJobs.id = "noLoadBtn";
        // loadMoreJobs.classList.add("noLoadBtn");
    }
    else {
        // const loadMoreJobs = document.createElement("button");
        // loadMoreJobs.classList.add("loadBtn");
        // loadMoreJobs.textContent = `Load more jobs`;
        // loadMoreJobs.setAttribute('onclick', 'addJobsToHTML()')
        // jobsArea.appendChild(loadMoreJobs);
        const loadMoreJobs = document.getElementById("noLoadBtn");
        loadMoreJobs.id = "loadBtn";
    }
}