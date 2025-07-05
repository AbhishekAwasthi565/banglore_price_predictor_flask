document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('prediction-form');
    const resultContainer = document.getElementById('result-container');
    const newPredictionBtn = document.getElementById('new-prediction-btn');
    const locationSelect = document.getElementById('location');
    const spinner = document.createElement('div');
    spinner.className = 'spinner';

    // Fetch locations from server and populate dropdown
    fetchLocations();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading spinner
        form.appendChild(spinner);
        spinner.style.display = 'block';

        // Get form values
        const location = locationSelect.value;
        const total_sqft = document.getElementById('total_sqft').value;
        const bhk = document.getElementById('bhk').value;
        const bath = document.getElementById('bath').value;

        // Prepare form data
        const formData = new FormData();
        formData.append('location', location);
        formData.append('total_sqft', total_sqft);
        formData.append('bhk', bhk);
        formData.append('bath', bath);

        // Send prediction request to server
        fetch('/predict_home_price', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Hide spinner
            spinner.style.display = 'none';

            // Display results
            displayResults(location, total_sqft, bhk, bath, data.estimated_price);
        })
        .catch(error => {
            console.error('Error:', error);
            spinner.style.display = 'none';
            alert('An error occurred while predicting the price. Please try again.');
        });
    });

    newPredictionBtn.addEventListener('click', function() {
        // Reset form and hide results
        form.reset();
        resultContainer.style.display = 'none';
        form.style.display = 'block';
    });

    function fetchLocations() {
        fetch('/get_location_name')
            .then(response => response.json())
            .then(data => {
                // Sort locations alphabetically
                const locations = data.locations.sort();

                // Populate location dropdown
                locations.forEach(location => {
                    const option = document.createElement('option');
                    option.value = location;
                    option.textContent = location;
                    locationSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching locations:', error);
                const option = document.createElement('option');
                option.textContent = 'Error loading locations';
                locationSelect.appendChild(option);
            });
    }

    function displayResults(location, sqft, bhk, bath, price) {
        // Update result elements
        document.getElementById('result-location').textContent = location;
        document.getElementById('result-sqft').textContent = sqft;
        document.getElementById('result-config').textContent = `${bhk} BHK, ${bath} Bath`;

        // Format price with commas
        const formattedPrice = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);

        document.getElementById('estimated-price').textContent = formattedPrice+ " Lakh";

        // Show results and hide form
        form.style.display = 'none';
        resultContainer.style.display = 'block';

        // Scroll to results
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }
});