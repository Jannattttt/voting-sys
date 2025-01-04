// Simulated database for students and candidates
const studentsDB = [
    { id: '1234567890', password: 'school123', name: 'John Doe' }
  ];
  
  const candidatesDB = [
    { id: 1, name: 'Alice', position: 'SRC President', votes: 0, img: 'images/alice.jpg', category: 'president' },
    { id: 2, name: 'Bob', position: 'SRC President', votes: 0, img: 'images/bob.jpg', category: 'president' },
    { id: 3, name: 'Charlie', position: 'SRC Secretary', votes: 0, img: 'images/charlie.jpg', category: 'secretary' },
    { id: 4, name: 'David', position: 'SRC Secretary', votes: 0, img: 'images/david.jpg', category: 'secretary' },
    { id: 5, name: 'Eva', position: 'SRC Treasurer', votes: 0, img: 'images/eva.jpg', category: 'treasurer' },
    { id: 6, name: 'Frank', position: 'SRC Treasurer', votes: 0, img: 'images/frank.jpg', category: 'treasurer' }
  ];
  
  // Handle login
  document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const studentID = document.getElementById('studentID').value;
    const password = document.getElementById('password').value;
  
    const student = studentsDB.find(s => s.id === studentID);
    if (student && student.password === password) {
      localStorage.setItem('studentID', student.id);
      window.location.href = 'vote.html';  // Redirect to voting page
    } else {
      document.getElementById('errorMessage').innerText = 'Invalid credentials!';
    }
  });
  
  // Display categories and candidates for voting
  window.onload = function() {
    const categories = ['president', 'secretary', 'treasurer'];
  
    categories.forEach(category => {
      const categoryContainer = document.getElementById(`${category}Category`);
      const categoryCandidates = candidatesDB.filter(candidate => candidate.category === category);
  
      categoryCandidates.forEach(candidate => {
        const candidateDiv = document.createElement('div');
        candidateDiv.classList.add('candidate');
        candidateDiv.innerHTML = `
          <img src="${candidate.img}" alt="${candidate.name}">
          <h3>${candidate.name}</h3>
          <p>${candidate.position}</p>
          <p>Votes: <span id="voteCount${candidate.id}">${candidate.votes}</span></p>
          <button id="voteButton${candidate.id}" onclick="voteForCandidate(${candidate.id})">Vote</button>
        `;
        categoryContainer.querySelector(`#${category}CandidatesList`).appendChild(candidateDiv);
      });
    });
  }
  
  // Handle voting for a candidate
  function voteForCandidate(candidateId) {
    const candidate = candidatesDB.find(c => c.id === candidateId);
  
    if (candidate) {
      // Ensure only one vote per category
      const categoryVotes = candidatesDB.filter(c => c.category === candidate.category);
      categoryVotes.forEach(c => {
        const voteButton = document.getElementById(`voteButton${c.id}`);
        voteButton.disabled = true; // Disable the vote button after voting
      });
  
      candidate.votes++;
      document.getElementById(`voteCount${candidateId}`).innerText = candidate.votes;
      alert(`You voted for ${candidate.name} as ${candidate.position}`);
    }
  }
  
  // Profile password change (simple)
  document.getElementById('changePasswordForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    // In a real-world scenario, update the password in the database
    alert('Password updated successfully!');
  });
  