class WorkoutTracker {
    static LOCAL_STORAGE_DATA_KEY = "workout-tracker-entries";

    constructor(root) {
        this.root = root;
        this.root.insertAdjacentHTML("afterbegin", home.handlebars());
        this.entries = [];

        this.loadEntries();
        this.updateView();

        this.root.querySelector(".tracker__add").addEventListener("click", () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDay().toString().padStart(2, "0");

            this.addEntry({
                date: `${ year }-${ month }-${ day }`,
                workout: "walking",
                duration: 30
            });
        });
    }

    static html() {
        return `
        <table class="tracker">
        <thread>
          <tr>
            <th>Date</th>
            <th>workout</th>
            <th>weight</th>
            <th>reps</th>
            <th>sets</th>
            <th></th>
          </tr>
        </thread>
        <tbody class="tracker__entries">
              <tr class="tracker__row"></tr>
    
          <tr>
            <td>
              <input type="date" class="tracker__date">
            </td>
             <td>
              <select class="tracker__workout">
                 <option value="benchPress">Bench Press</option>
                  <option value="squats">Squat</option>
                  <option value="deadlift">Deadlift</option>
                  <option value="overHeadPress">Overhead Press</option>
                  <option value="barbellRow">Row</option>
                  <option value="hipThrust">Hip Thrust</option>
                  <option value="snatch">Snatch</option>
                  <option value="cleanAndJerk">Clean and Jerk</option>
                  <option value="dbPress">DB Press</option>
                  <option value="dbLunge">DB Lunge</option>
                  <option value="dbRow">DB Row</option>
                  <option value="dbCurl">DB Curl</option>
                  <option value="bulgarianSquat">Bulgarian Squat</option>
                  <option value="dbFly">DB Fly</option>
                  <option value="lateralRaise">Lateral Raise</option>
                  <option value="legPress">Leg Press</option>
                  <option value="legCurl">Leg Curl</option>
                  <option value="legExtension">Leg Extension</option>
                  <option value="hackSquat">Hack Squat</option>
                  <option value="machineRow">Machine Row</option>
                  <option value="machinePress">Machine Press</option>
                  <option value="machineShoulderPress">Machine Shoulder Press</option>
                  <option value="smithSquat">Smith Machine Squat</option>
                   <option value="singleArmPulldown">Single Arm Pulldown</option>
                  <option value="singleArmRow">Single Arm Row</option>
                  <option value="cablePulldown">Cable Pulldown</option>
                  <option value="cableRow">Cable Row</option>
                  <option value="cableFly">Cable Fly</option>
                  <option value="cableLateralDeltoidRaise">Cable Lateral Deltoid Raise</option>
                  <option value="cableTricepExtension">Cable Tricep Extension</option>
                  <option value="cableTricepSkullcrusher">Cable Tricep Skullcrusher</option>
                  <option value="pushUp">Push Up</option>
                  <option value="pullUp">Pull Up</option>
                  <option value="chinUp">Chin Up</option>
                  <option value="dip">Dip</option>
                  <option value="bodyweightSquat">Bodyweight Squat</option>
                  <option value="bodyweightLunge">Bodyweight Lunge</option>
                  <option value="bodyweightRow">Bodyweight Row</option>
                  <option value="bodyweightHipThrust">Bodyweight Hip Thrust</option>
            </td>
                  <td>
              <input type="number" class="tracker__sets">
              <span class="tracker__text">sets</span>
            </td>
                  <td>
              <input type="number" class="tracker__reps">
               <span class="tracker__text">reps</span>
            </td>
                  <td>
              <input type="number" class="tracker__weight">
               <span class="tracker__text">weight</span>
            </td>
                  <td>
              <input type="type" class="tracker__comments">
               <span class="tracker__text">comments</span>
            </td>
             <td>
              <button type="button" class="tracker__button">&times;</button>
             </td>
          </tr>
        </tbody>
        <tr class="tracker__row tracker__row--add">
          <td colspan="6">
            <button class="tracker__add">Add Entry &plus;</button>
          </td>
        </tr>
        </tbody>t
      </table>
        `;
    }

    static rowHtml() {
        return `
            <tr class="tracker__row">
                <td>
                    <input type="date" class="tracker__date">
                </td>
                <td>
                    <select class="tracker__workout">
                    <option value="benchPress">Bench Press</option>
                    <option value="squats">Squat</option>
                    <option value="deadlift">Deadlift</option>
                    <option value="overHeadPress">Overhead Press</option>
                    <option value="barbellRow">Row</option>
                    <option value="hipThrust">Hip Thrust</option>
                    <option value="snatch">Snatch</option>
                    <option value="cleanAndJerk">Clean and Jerk</option>
                    <option value="dbPress">DB Press</option>
                    <option value="dbLunge">DB Lunge</option>
                    <option value="dbRow">DB Row</option>
                    <option value="dbCurl">DB Curl</option>
                    <option value="bulgarianSquat">Bulgarian Squat</option>
                    <option value="dbFly">DB Fly</option>
                    <option value="lateralRaise">Lateral Raise</option>
                    <option value="legPress">Leg Press</option>
                    <option value="legCurl">Leg Curl</option>
                    <option value="legExtension">Leg Extension</option>
                    <option value="hackSquat">Hack Squat</option>
                    <option value="machineRow">Machine Row</option>
                    <option value="machinePress">Machine Press</option>
                    <option value="machineShoulderPress">Machine Shoulder Press</option>
                    <option value="smithSquat">Smith Machine Squat</option>
                     <option value="singleArmPulldown">Single Arm Pulldown</option>
                    <option value="singleArmRow">Single Arm Row</option>
                    <option value="cablePulldown">Cable Pulldown</option>
                    <option value="cableRow">Cable Row</option>
                    <option value="cableFly">Cable Fly</option>
                    <option value="cableLateralDeltoidRaise">Cable Lateral Deltoid Raise</option>
                    <option value="cableTricepExtension">Cable Tricep Extension</option>
                    <option value="cableTricepSkullcrusher">Cable Tricep Skullcrusher</option>
                    <option value="pushUp">Push Up</option>
                    <option value="pullUp">Pull Up</option>
                    <option value="chinUp">Chin Up</option>
                    <option value="dip">Dip</option>
                    <option value="bodyweightSquat">Bodyweight Squat</option>
                    <option value="bodyweightLunge">Bodyweight Lunge</option>
                    <option value="bodyweightRow">Bodyweight Row</option>
                    <option value="bodyweightHipThrust">Bodyweight Hip Thrust</option>
                </td>
                <td>
                    <input type="number" class="tracker__sets">
                    <span class="tracker__text"></span>
                </td>
                <td>
                    <button type="button" class="tracker__button tracker__delete">&times;</button>
                </td>
            </tr>
        `;
    }
    // will need to replace with databse pull
    loadEntries() {
        this.entries = JSON.parse(localStorage.getItem("workout-tracker-entries") || "[]");
    }
    // same as ^^
    saveEntries() {
        localStorage.setItem("workout-tracker-entries", JSON.stringify(this.entries));
    }

    updateView() {
        const tableBody = this.root.querySelector(".tracker__entries");
        const addRow = data => {
            const template = document.createElement("template");
            let row = null;

            template.innerHTML = WorkoutTracker.rowHtml().trim();
            row = template.content.firstElementChild;

            row.querySelector(".tracker__date").value = data.date;
            row.querySelector(".tracker__workout").value = data.workout;
            row.querySelector(".tracker__weight").value = data.weight;
            row.querySelector(".tracker__reps").value = data.reps;
            row.querySelector(".tracker__sets").value = data.sets;

  row.querySelector(".tracker__date").addEventListener("change", ({ target }) => {
                data.date = target.value;
                this.saveEntries();
            });

            row.querySelector(".tracker__workout").addEventListener("change", ({ target }) => {
                data.workout = target.value;
                this.saveEntries();
            });

            row.querySelector(".tracker__weight").addEventListener("change", ({ target }) => {
                data.duration = target.value;
                this.saveEntries();
            });
            row.querySelector(".tracker__reps").addEventListener("change", ({ target }) => {
                data.duration = target.value;
                this.saveEntries();
            });
            row.querySelector(".tracker__sets").addEventListener("change", ({ target }) => {
                data.duration = target.value;
                this.saveEntries();
            });


            row.querySelector(".tracker__delete").addEventListener("click", () => {
                this.deleteEntry(data);
            });

            tableBody.appendChild(row);
        };

        tableBody.querySelectorAll(".tracker__row").forEach(row => {
            row.remove();
        });

        this.entries.forEach(data => addRow(data));
    }

    addEntry(data) {
        this.entries.push(data);
        this.saveEntries();
        this.updateView();
    }

    deleteEntry(dataToDelete) {
        this.entries = this.entries.filter(data => data !== dataToDelete);
        this.saveEntries();
        this.updateView();
    }
}

const app = document.getElementById("history");

const wt = new WorkoutTracker(history);

window.wt = wt;

          