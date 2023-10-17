const logExerciseButton = document.querySelector(".logExercise");
const messageElement = document.getElementById("message");

function logExercise() {
    const title = document.getElementById("exercise").value;
    const sets = document.getElementById("sets").value;
    const reps = document.getElementById("reps").value;
    const weight = document.getElementById("weight").value;
    const rpe = document.getElementById("rpe").value;
    const comments = document.getElementById("comments").value;


    

    const data = {
        title,
        date: new Date(),
        sets,
        reps,
        weight,
        rpe,
        comments
    };
    console.log(data);

    fetch('/api/exercises', {
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
        messageElement.textContent = 'Great start! You can view your workout on the home page';
        messageElement.style.color = 'green';
        messageElement.style.fontWeight = 'bold';
        console.log('Exercise logged successfully:', data);
    })
    .catch(error => {
        messageElement.textContent = 'Please make sure each field is filled out correctly';
        messageElement.style.color = 'red';
        messageElement.style.fontWeight = 'bold';
        console.error('Error logging exercise:', error);
    });
}

logExerciseButton.addEventListener("click", logExercise);