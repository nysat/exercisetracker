
//This is handling the update button
document.querySelectorAll(".update-workout").forEach((button) => {
    button.addEventListener("click", (event) => {
        const workoutId = event.target.getAttribute("data-workout-id");
        
        // Example: Send an update request
        fetch(`/api/exercises/${workoutId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Updated Title',
                sets: 5,       // Updated number of sets
                reps: 10,      // Updated number of reps
                weight: 50.5,  
                rpe: 7,        
                comments: 'Updated comments',
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            // Update the DOM with the new workout data
            const workoutElement = document.querySelector(`[data-workout-id="${workoutId}"]`);
            workoutElement.querySelector('.workout-title').textContent = data.title;
            workoutElement.querySelector('.workout-sets').textContent = data.sets;
            workoutElement.querySelector('.workout-reps').textContent = data.reps;
            workoutElement.querySelector('.workout-weight').textContent = data.weight;
            workoutElement.querySelector('.workout-rpe').textContent = data.rpe;
            workoutElement.querySelector('.workout-comments').textContent = data.comments;
        })
        .catch((error) => {
            console.error('Error updating workout:', error);
        });
    });
});

//This is handling the delete button
document.querySelectorAll(".delete-workout").forEach((button) => {
    button.addEventListener("click", (event) => {
        const workoutId = event.target.getAttribute("data-workout-id");

        if (confirm("Are you sure you want to delete this workout?")) {
            // Example: Send a delete request
            if (confirm("Are you sure you want to delete this workout?")) {
                fetch(`/api/exercises/${workoutId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    alert('Workout deleted successfully');
                    removeWorkout(workoutId)
                })
                .catch((error) => {
                    console.error('Error deleting workout:', error);
                });
            }
        }
    });
});

function removeWorkout(workoutId){
    const workoutBtn = document.querySelector(`[data-workout-id = '${workoutId}']`);
    console.log(workoutBtn)
}


