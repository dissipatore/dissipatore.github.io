function generateUrl() {
    const knowunityUrlInput = document.getElementById('knowunity_url').value;

    const match = knowunityUrlInput.match(/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/);
    const extractedId = match ? match[0] : null;

    if (extractedId) {
        const apiUrl = 'https://apiedge-eu-central-1.knowunity.com/knows/' + extractedId;

        fetch(apiUrl)
            .then(response => response.json())
            .then(jsonResponse => {
                const contentUrl = jsonResponse.documents[0].contentUrl;
                const generatedUrlDiv = document.getElementById('generatedUrl');
                generatedUrlDiv.innerHTML = 'File: <span id="contentUrl" onclick="openContentUrl(\'' + contentUrl + '\')">' + contentUrl + '</span>';
            })
            .catch(error => {
                console.error('Errore (fetching):', error);
                alert('Errore');
            });
    } else {
        alert('Link non valido');
    }
}

function openContentUrl(url) {
    window.open(url, '_blank');
}
