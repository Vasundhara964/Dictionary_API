document.addEventListener("DOMContentLoaded", function() {
    const searchbutton = document.getElementById('searchbutton');
    const Input = document.getElementById('Input');
    const Output = document.getElementById('Output');

    searchbutton.addEventListener('click', function() {
        const word = Input.value.trim();
        if (!word) {
            alert('Please enter a word.');
            return;
        }
        else if(!isValidWord(word)){
            alert('Invalid word.Word should only contain Alphabets.')
        }
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.length > 0) {
                let output = '';
                data.forEach(item => {
                    if (item.meanings && item.meanings.length > 0) {
                        item.meanings.forEach(meaning => {
                            output += `<p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>`;
                            output += `<p><strong>Meaning:</strong> ${meaning.definitions[0].definition}</p>`;
                            output += '<hr>';
                        });
                    }
                });
                Output.innerHTML = output;
            } else {
                Output.innerHTML = '<p>No definitions found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            Output.innerHTML = '<p>Invalid word/Error fetching data.Try again</p>';
            
        });
        function isValidWord(word) {
            return /^[A-Za-z]+$/.test(word);
        }
    });
});
