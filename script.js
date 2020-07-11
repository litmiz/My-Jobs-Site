window.onload = () => {
    const jobsArea = document.getElementById('jobsArea');
    const jobsTitle = document.createElement("h2");
    const jobsContainer = document.createElement("div");
    jobsContainer.classList.add('jobsContainer');
    jobsTitle.textContent = `Newest Jobs`;
    jobsArea.appendChild(jobsTitle);
    jobsArea.appendChild(jobsContainer);
    fetch('https://github-jobs-proxy.appspot.com/positions?description=&location').then(response => {
        response.json().then(data => {
            data.forEach(job => {
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
            }); 
        })
    })
};