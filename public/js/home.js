
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
            fetch(`/api/exercises/${workoutId}`, {
                method: 'DELETE',
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
            })
            .catch((error) => {
                console.error('Error deleting workout:', error);
            });
        }
    });
});

