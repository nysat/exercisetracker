function logExercise() {
    const exercise = document.getElementById("exercise").value;
    const sets = document.getElementById("sets").value;
    const reps = document.getElementById("reps").value;
    const weight = document.getElementById("weight").value;
    const rpe = document.getElementById("rpe").value;
    const comments = document.getElementById("comments").value;

    if (exercise.trim() === "") {
        alert("Please enter an exercise name.");
        return;
    }

    if (isNaN(sets) || sets <= 0) {
        alert("Please enter a valid number of sets.");
        return;
    }

    if (isNaN(reps) || reps <= 0) {
        alert("Please enter a valid number of reps.");
        return;
    }

    if (isNaN(weight) || weight <= 0) {
        alert("Please enter a valid weight.");
        return;
    }

    if (isNaN(rpe) || rpe < 1 || rpe > 10) {
        alert("Please enter a valid RPE between 1 and 10.");
        return;
    }

    console.log({
        exercise,
        sets,
        reps,
        weight,
        rpe,
        comments
    });
}