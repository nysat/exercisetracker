

// New Workout Page
function logExercise() {
    let exercise = document.getElementById("exercise").value;
    let sets = document.getElementById("sets").value;
    let reps = document.getElementById("reps").value;
    let weight = document.getElementById("weight").value;
    console.log(`Exercise: ${exercise} Sets: ${sets} Reps: ${reps} Weight: ${weight}`)
}