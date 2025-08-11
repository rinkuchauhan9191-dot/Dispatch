// app.js
// Main application logic

// Elements
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const tempoForm = document.getElementById('tempoForm');
const temposList = document.getElementById('temposList');

// Open modal
openModalBtn.addEventListener('click', () => {
    modal.classList.remove('modal-hidden');
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.add('modal-hidden');
});

// Add tempo
tempoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('tempoName').value;
    const capacity = document.getElementById('tempoCapacity').value;
    const driver = document.getElementById('tempoDriver').value;
    const file = document.getElementById('tempoFile').files[0];

    try {
        let fileURL = '';
        if (file) {
            const storageRef = storage.ref('tempoFiles/' + file.name);
            await storageRef.put(file);
            fileURL = await storageRef.getDownloadURL();
        }

        const newTempoRef = db.ref('tempos').push();
        await newTempoRef.set({ name, capacity, driver, fileURL });

        tempoForm.reset();
        modal.classList.add('modal-hidden');
    } catch (error) {
        console.error('Error adding tempo:', error);
    }
});

// Load tempos
db.ref('tempos').on('value', (snapshot) => {
    temposList.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        const div = document.createElement('div');
        div.innerHTML = `<strong>${data.name}</strong> - ${data.capacity} - ${data.driver} 
            ${data.fileURL ? `<a href="${data.fileURL}" target="_blank">File</a>` : ''}`;
        temposList.appendChild(div);
    });
});
