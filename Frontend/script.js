const API_URL = "http://localhost:8080/api/employees";

// ---- ADD EMPLOYEE PAGE ----
const addForm = document.getElementById("addEmployeeForm");
if (addForm) {
  addForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const employee = {
      name: document.getElementById("name").value,
      designation: document.getElementById("designation").value,
      department: document.getElementById("department").value,
      salary: parseFloat(document.getElementById("salary").value),
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
      });

      if (response.ok) {
        alert("Employee added successfully!");
        addForm.reset();
      } else {
        alert("Something went wrong while saving.");
      }
    } catch (error) {
      alert("Cannot connect to the server. Is the backend running?");
    }
  });
}

// ---- VIEW EMPLOYEES PAGE ----
const employeeTableBody = document.querySelector("#employeeTable tbody");

async function loadEmployees() {
  if (!employeeTableBody) return;

  try {
    const response = await fetch(API_URL);
    const employees = await response.json();

    employeeTableBody.innerHTML = "";

    employees.forEach(function (emp) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${emp.name}</td>
        <td>${emp.designation}</td>
        <td>${emp.department}</td>
        <td>${emp.salary}</td>
        <td>${emp.email}</td>
        <td>${emp.phone}</td>
        <td>
  <button onclick="editEmployee(${emp.id})">Edit</button>
  <button onclick="deleteEmployee(${emp.id})">Delete</button>
</td>
      `;
      employeeTableBody.appendChild(row);
    });
  } catch (error) {
    alert("Cannot connect to the server. Is the backend running?");
  }
}

async function deleteEmployee(id) {
  try {
    await fetch(API_URL + "/" + id, { method: "DELETE" });
    loadEmployees();
  } catch (error) {
    alert("Cannot connect to the server. Is the backend running?");
  }
}

loadEmployees();

// ---- SEARCH EMPLOYEE PAGE ----
const searchBtn = document.getElementById("searchBtn");
if (searchBtn) {
  searchBtn.addEventListener("click", async function () {
    const keyword = document.getElementById("searchInput").value;
    const searchTableBody = document.querySelector("#searchResultTable tbody");

    try {
      const response = await fetch(API_URL + "/search?name=" + encodeURIComponent(keyword));
      const results = await response.json();

      searchTableBody.innerHTML = "";

      results.forEach(function (emp) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${emp.name}</td>
          <td>${emp.designation}</td>
          <td>${emp.department}</td>
          <td>${emp.salary}</td>
          <td>${emp.email}</td>
          <td>${emp.phone}</td>
        `;
        searchTableBody.appendChild(row);
      });
    } catch (error) {
      alert("Cannot connect to the server. Is the backend running?");
    }
  });
}
// ---- DEPARTMENTS PAGE ----
const DEPT_API_URL = "http://localhost:8080/api/departments";

async function renderDepartments() {
  const deptTableBody = document.querySelector("#deptTable tbody");
  if (!deptTableBody) return;

  try {
    const response = await fetch(DEPT_API_URL);
    const departments = await response.json();

    deptTableBody.innerHTML = "";

    departments.forEach(function (dept) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${dept.name}</td>
        <td><button onclick="deleteDepartment(${dept.id})">Delete</button></td>
      `;
      deptTableBody.appendChild(row);
    });
  } catch (error) {
    alert("Cannot connect to the server. Is the backend running?");
  }
}

async function deleteDepartment(id) {
  try {
    await fetch(DEPT_API_URL + "/" + id, { method: "DELETE" });
    renderDepartments();
  } catch (error) {
    alert("Cannot connect to the server. Is the backend running?");
  }
}

const addDeptForm = document.getElementById("addDeptForm");
if (addDeptForm) {
  addDeptForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const department = {
      name: document.getElementById("deptName").value
    };

    try {
      await fetch(DEPT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(department)
      });

      addDeptForm.reset();
      renderDepartments();
    } catch (error) {
      alert("Cannot connect to the server. Is the backend running?");
    }
  });

  renderDepartments();
}

// ---- EDIT EMPLOYEE ----
async function editEmployee(id) {
  try {
    const response = await fetch(API_URL);
    const employees = await response.json();
    const emp = employees.find(function (e) { return e.id === id; });

    const name = prompt("Name:", emp.name);
    if (name === null) return;
    const designation = prompt("Designation:", emp.designation);
    if (designation === null) return;
    const department = prompt("Department:", emp.department);
    if (department === null) return;
    const salary = prompt("Salary:", emp.salary);
    if (salary === null) return;
    const email = prompt("Email:", emp.email);
    if (email === null) return;
    const phone = prompt("Phone:", emp.phone);
    if (phone === null) return;

    const updatedEmployee = {
      name: name,
      designation: designation,
      department: department,
      salary: parseFloat(salary),
      email: email,
      phone: phone
    };

    await fetch(API_URL + "/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEmployee)
    });

    alert("Employee updated successfully!");
    loadEmployees();
  } catch (error) {
    alert("Cannot connect to the server. Is the backend running?");
  }
}