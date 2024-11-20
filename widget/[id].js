async function renderWidget() {
    const widgetId = window.location.pathname.split('/').pop();
    
    try {
        const response = await fetch(`${API_URL}/${widgetId}/latest`, {
            headers: {
                'X-Master-Key': API_KEY
            }
        });
        
        const data = await response.json();
        document.documentElement.innerHTML = data.record.content;
    } catch (error) {
        document.body.innerHTML = '<div style="color: red;">Widget konnte nicht geladen werden</div>';
        console.error(error);
    }
}

renderWidget(); 