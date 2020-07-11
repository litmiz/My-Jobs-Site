window.onload = () => {
    const jobsArea = document.getElementById('jobsArea');
    const jobsTitle = document.createElement("h2");
    jobsTitle.textContent = `Newest Jobs`;
    jobsArea.appendChild(jobsTitle);
    fetch('https://github-jobs-proxy.appspot.com/positions?description=&location').then(response => {
        response.json().then(data => {
            data.forEach(job => {
               const jobDiv = document.createElement("div");
               const jobTitle = document.createElement("h4");
               jobTitle.textContent = `${job.title}`;
               const jobLocation = document.createElement("p");
               jobLocation.textContent = `${job.location}`;
               jobLocation.classList.add('jobLocation');
               const jobCompany = document.createElement("a");
               jobCompany.textContent = `${job.company}`;
               jobCompany.setAttribute('href', job.company_url);
               jobDiv.appendChild(jobTitle);
               jobDiv.appendChild(jobLocation);
               jobDiv.appendChild(jobCompany);
               jobsArea.appendChild(document.createElement('br'));
               jobsArea.appendChild(jobDiv);
            }); 
        })
    })
};