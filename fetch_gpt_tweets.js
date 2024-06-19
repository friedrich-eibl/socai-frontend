document.getElementById('callFunctionButton').addEventListener('click', function() {
    const keywords = document.getElementById('key-input').value.split(" ")
    const data = { keywords: keywords, tweet_count: '3' };

    fetch('https:/socai.uk:443/call_function', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        const tweetString = data.Tweets;
        const contentMatch = tweetString.match(/content='(.*?)'/);
        let contentValue;
        if (contentMatch && contentMatch[1]) {
            // The content value may still have escaped quotes, so remove them
            contentValue = contentMatch[1].replace(/\\"/g, '');
        }
        console.log(contentValue)
        document.getElementById('generatedTweet').innerText = contentValue;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
