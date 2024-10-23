async function summarizeArticle() {
    const articleUrl = document.getElementById("articleUrl").value;
    const summaryResult = document.getElementById("summaryResult");

    // Show a loading message
    summaryResult.textContent = "Summarizing, please wait...";

    // Ensure that the input field is not empty
    if (!articleUrl) {
        summaryResult.textContent = "Please provide a valid article URL.";
        return;
    }

    // API call details
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // Replace with your actual RapidAPI key
            'X-RapidAPI-Host': 'smmry.p.rapidapi.com' // Replace with the actual API host (check RapidAPI docs)
        }
    };

    try {
        // Use fetch to get the summary from the API
        const response = await fetch(`https://smmry.p.rapidapi.com/?SM_URL=${encodeURIComponent(articleUrl)}`, options);
        
        // Check if response is OK
        if (!response.ok) {
            throw new Error(`API returned status: ${response.status}`);
        }

        const data = await response.json();

        // Check if API returned a summary
        if (data.sm_api_content) {
            summaryResult.innerHTML = `<strong>Summary:</strong><br>${data.sm_api_content}`;
        } else if (data.sm_api_error) {
            // Display API-specific error message
            summaryResult.textContent = `Error: ${data.sm_api_error}`;
        } else {
            summaryResult.textContent = "Failed to summarize the article. Please check the URL and try again.";
        }
    } catch (error) {
        // Display the error to the user
        summaryResult.textContent = `Error: ${error.message}`;
        console.error("Error fetching the summary:", error);
    }
}
