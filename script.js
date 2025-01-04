// Simulated database for students and candidates
const studentsDB = [
  { id: '1234567890', password: 'school123', name: 'John Doe' }
];

let candidatesDB = [
  { id: 1, name: 'Alice', position: 'SRC President', votes: 0, img: 'images/3.jpeg', category: 'president' },
  { id: 2, name: 'Bob', position: 'SRC President', votes: 0, img: 'images/1.jpeg', category: 'president' },
  { id: 3, name: 'Charlie', position: 'SRC Secretary', votes: 0, img: 'images/2.jpeg', category: 'secretary' },
  { id: 4, name: 'David', position: 'SRC Secretary', votes: 0, img: 'images/6.jpeg', category: 'secretary' },
  { id: 5, name: 'Eva', position: 'SRC Treasurer', votes: 0, img: 'images/4.jpeg', category: 'treasurer' },
  { id: 6, name: 'Frank', position: 'SRC Treasurer', votes: 0, img: 'images/5.jpeg', category: 'treasurer' }
];

// Load votes and voting history from localStorage
function loadVotes() {
  const storedVotes = JSON.parse(localStorage.getItem('votes')) || {};
  const storedCandidates = JSON.parse(localStorage.getItem('candidatesDB')) || candidatesDB;

  // Update the candidatesDB with stored votes
  candidatesDB = storedCandidates.map(candidate => ({
      ...candidate,
      votes: storedVotes[candidate.id] || candidate.votes
  }));
}

// Save votes to localStorage
function saveVotes() {
  const votes = candidatesDB.reduce((acc, candidate) => {
      acc[candidate.id] = candidate.votes;
      return acc;
  }, {});
  localStorage.setItem('votes', JSON.stringify(votes));
  localStorage.setItem('candidatesDB', JSON.stringify(candidatesDB));
}

// Handle login
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const studentID = document.getElementById('studentID').value;
  const password = document.getElementById('password').value;

  const student = studentsDB.find(s => s.id === studentID);
  if (student && student.password === password) {
      localStorage.setItem('studentID', student.id);
      window.location.href = 'vote.html'; // Redirect to voting page
  } else {
      document.getElementById('errorMessage').innerText = 'Invalid credentials!';
  }
});

// Display categories and candidates for voting
window.onload = function () {
  loadVotes();
  const categories = ['president', 'secretary', 'treasurer'];
  const studentID = localStorage.getItem('studentID');
  const votedCategories = JSON.parse(localStorage.getItem(`voted_${studentID}`)) || {};

  categories.forEach(category => {
      const categoryContainer = document.getElementById(`${category}Category`);
      const categoryCandidates = candidatesDB.filter(candidate => candidate.category === category);

      categoryCandidates.forEach(candidate => {
          const candidateDiv = document.createElement('div');
          candidateDiv.classList.add('candidate');
          const isVoted = votedCategories[category] === true;
          candidateDiv.innerHTML = `
              <img src="${candidate.img}" alt="${candidate.name}">
              <h3>${candidate.name}</h3>
              <p>${candidate.position}</p>
              <p>Votes: <span id="voteCount${candidate.id}">${candidate.votes}</span></p>
              <button id="voteButton${candidate.id}" 
                      onclick="voteForCandidate(${candidate.id})" 
                      ${isVoted ? 'disabled' : ''}>
                  Vote
              </button>
          `;
          categoryContainer.querySelector(`#${category}CandidatesList`).appendChild(candidateDiv);
      });
  });
};

// Handle voting for a candidate
function voteForCandidate(candidateId) {
  const candidate = candidatesDB.find(c => c.id === candidateId);
  const studentID = localStorage.getItem('studentID');
  const votedCategories = JSON.parse(localStorage.getItem(`voted_${studentID}`)) || {};

  if (candidate && !votedCategories[candidate.category]) {
      candidate.votes++;
      document.getElementById(`voteCount${candidateId}`).innerText = candidate.votes;
      votedCategories[candidate.category] = true;

      // Save voting history and votes
      localStorage.setItem(`voted_${studentID}`, JSON.stringify(votedCategories));
      saveVotes();

      // Disable all vote buttons in the category
      const categoryVotes = candidatesDB.filter(c => c.category === candidate.category);
      categoryVotes.forEach(c => {
          const voteButton = document.getElementById(`voteButton${c.id}`);
          voteButton.disabled = true;
      });

      alert(`You voted for ${candidate.name} as ${candidate.position}`);
  } else {
      alert("You have already voted in this category!");
  }
}

// Profile password change (simple)
document.getElementById('changePasswordForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const newPassword = document.getElementById('newPassword').value;
  // In a real-world scenario, update the password in the database
  alert('Password updated successfully!');
});
