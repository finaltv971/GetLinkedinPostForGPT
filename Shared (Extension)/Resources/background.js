browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.action === 'analyzePost') {
        fetch('http://192.168.1.21:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(request.data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Données stockées avec succès :', data);
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi des données :', error);
        });
    }

    sendResponse({ status: true });

    return true;
});
