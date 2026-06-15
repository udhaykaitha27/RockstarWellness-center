document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const responseDiv = document.getElementById('formResponse');
    
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    const formData = new FormData(this);
    
    // Convert FormData into an URL-encoded string so Google Apps Script handles it naturally
    const searchParams = new URLSearchParams();
    for (const pair of formData) {
        searchParams.append(pair[0], pair[1]);
    }
    
    const scriptURL = 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL';

    // Added mode: 'cors' and proper redirect execution settings
    fetch(scriptURL, { 
        method: 'POST', 
        body: searchParams,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        responseDiv.classList.remove('d-none', 'alert-danger');
        responseDiv.classList.add('alert', 'alert-success');
        responseDiv.innerText = "Thank you! Your information has been successfully received.";
        this.reset();
    })
    .catch(error => {
        responseDiv.classList.remove('d-none', 'alert-success');
        responseDiv.classList.add('alert', 'alert-danger');
        responseDiv.innerText = "An error occurred. Please try again or connect via call.";
        console.error('Error!', error.message);
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit Request";
    });
});