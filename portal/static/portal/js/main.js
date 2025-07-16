function getCSRFToken() {
  return window.csrfToken;
}

function clearStudentModalInputs() {
  document.getElementById('sname').value = '';
  document.getElementById('ssubject').value = '';
  document.getElementById('smarks').value = '';
}

function closeModal() {
  const modal = document.getElementById('studentModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
    clearStudentModalInputs();
  }, 30); // matches animation duration
}


function showModal() {
  clearStudentModalInputs();
  document.getElementById('studentModal').style.display = 'block';
}

function submitStudent() {
  const name = document.getElementById('sname').value.trim();
  const subject = document.getElementById('ssubject').value.trim();
  const marksInput = document.getElementById('smarks').value;
  const marks = parseInt(marksInput);

  if (!name || !subject || isNaN(marks)) {
    alert("Please fill out all fields correctly.");
    return;
  }

  fetch("/add_student/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRFToken': getCSRFToken()
    },
    body: new URLSearchParams({ name, subject, marks })
  }).then(() => {
    clearStudentModalInputs();
    window.location.reload();
  });
}


function enableEdit(link) {
  const row = link.closest('tr');
  row.querySelectorAll('td[data-field]').forEach(td => td.contentEditable = "true");

  link.style.display = "none"; // Hide Edit
  row.querySelector('.save-link').style.display = "inline"; // Show Save
}

function saveEdit(link, id) {
  const row = link.closest('tr');
  const data = {};

  row.querySelectorAll('td[data-field]').forEach(cell => {
    const field = cell.getAttribute('data-field');
    const value = field === "marks" ? parseInt(cell.innerText) : cell.innerText;
    data[field] = value;
    cell.contentEditable = "false";
  });

  fetch(`/edit_student/${id}/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRFToken': getCSRFToken()
    },
    body: new URLSearchParams(data)
  }).then(() => window.location.reload());
}


let studentToDeleteId = null;

function deleteStudent(id) {
  studentToDeleteId = id;
  document.getElementById('deleteModal').style.display = 'flex';
}

function closeDeleteModal() {
  studentToDeleteId = null;
  document.getElementById('deleteModal').style.display = 'none';
}

document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
  if (!studentToDeleteId) return;

  fetch(`/delete_student/${studentToDeleteId}/`, {
    method: "POST",
    headers: {
      'X-CSRFToken': getCSRFToken()
    }
  }).then(() => {
    closeDeleteModal();
    window.location.reload();
  });
});
