const logExerciseButton = document.querySelector(".logExercise");

function logExercise() {
    const title = document.getElementById("exercise").value;
    const sets = document.getElementById("sets").value;
    const reps = document.getElementById("reps").value;
    const weight = document.getElementById("weight").value;
    const rpe = document.getElementById("rpe").value;
    const comments = document.getElementById("comments").value;
    

    

    const data = {
        title,
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
        console.log('Exercise logged successfully:', data);
    })
    .catch(error => {
        console.error('Error logging exercise:', error);
    });
}

logExerciseButton.addEventListener("click", logExercise);