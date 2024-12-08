// Nhận dữ liệu trả về từ API
let studentList = [];

// Khai báo biến currentEditId dùng để lưu lại id sinh viên
// để dùng cho chức năng sửa thông tin sinh viên
let currentEditId = null;

// Hàm lấy dữ liệu
let fetchData = async () => {
  // Gọi API lấy dữ liệu
  let response = await axios.get("http://localhost:3000/students");
  // Lưu dữ liệu vào mảng product
  studentList = response.data;

  displayData(studentList);
};

// Hàm hiển thị dữ liệu
let displayData = async (studentList) => {
  // Khai báo ra biến để truy xuất tới thẻ tBody
  let tBody = document.querySelector("#student-table");

  // Sử dụng innerHTML để tạo thẻ HTML trong body
  tBody.innerHTML = "";

  // sử dụng vòng lặp forEach để hiển thị dữ liệu
  studentList.forEach((student) => {
    // tạo thẻ tr bằng cách sử dụng hàm document.createElement
    let row = document.createElement("tr");

    // tạo thẻ td chứa dữ liệu id trong thẻ tr
    let idCell = document.createElement("td");

    // dùng textContent để ghi dữ liệu vào thẻ td
    idCell.textContent = student.id;
    // <td>1</td>
    // sử dụng hàm appendChild để đưa thẻ td vào trong thẻ tr
    row.appendChild(idCell);

    // tạo thẻ td chứa dữ liệu name trong thẻ tr
    let nameCell = document.createElement("td");

    // dùng textContent để ghi dữ liệu vào thẻ td
    nameCell.textContent = student.name;
    row.appendChild(nameCell);

    // tạo thẻ td chứa dữ liệu age trong thẻ tr
    let ageCell = document.createElement("td");

    // dùng textContent để ghi dữ liệu vào thẻ td
    ageCell.textContent = student.age;
    row.appendChild(ageCell);

    // tạo thẻ td chứa dữ liệu email trong thẻ tr
    let emailCell = document.createElement("td");

    // dùng textContent để ghi dữ liệu vào thẻ td
    emailCell.textContent = student.email;
    row.appendChild(emailCell);

    // đưa thẻ <tr> vào trong <tbody>
    tBody.appendChild(row);

    // Tạo ra thẻ <td> chứa nút xoá
    let actionCell = document.createElement("td");
    // tạo nút xoá
    let deleteButton = document.createElement("button");

    // Đặt tên cho nút xoá
    deleteButton.textContent = "Xoá";

    // sử dụng setAttribute để thêm sự kiện onclick
    deleteButton.setAttribute("onclick", `deleteStudent('${student.id}')`);

    // đưa nút xoá vào thẻ <tr>
    actionCell.appendChild(deleteButton);

    // tạo nút xoá
    let EditButton = document.createElement("button");

    // Đặt tên cho nút xoá
    EditButton.textContent = "Sửa";

    // sử dụng setAttribute để thêm sự kiện onclick
    EditButton.setAttribute("onclick", `detailStudent('${student.id}')`);

    // đưa nút xoá vào thẻ <tr>
    actionCell.appendChild(EditButton);

    row.appendChild(actionCell);
  });
};

// Hàm Xoá
let deleteStudent = async (studentId) => {
  // Xoá có confirm
  let confirmDelete = confirm("Bạn muốn xoá không ?");

  if (!confirmDelete) return;
  //console.log(studentId);
  await axios.delete(`http://localhost:3000/students/${studentId}`);

  fetchData();
};

// Hàm thêm sinh viên
let addStudent = () => {
  let name = document.querySelector("#name").value;
  let age = document.querySelector("#age").value;
  let email = document.querySelector("#email").value;

  let student = {
    name,
    age,
    email,
  };

  // Chuyển đổi object sang dạng json
  let json = JSON.stringify(student);

  axios.post("http://localhost:3000/students/", json);

  alert("Thêm thành công");

  fetchData();
};

let detailStudent = async (studentId) => {
  currentEditId = studentId;
  let student = {};
  let response = await axios.get(`http://localhost:3000/students/${studentId}`);

  student = response.data;
  let { name, age, email } = student;

  //console.log(name, age, email);

  document.querySelector("#name").value = name;
  document.querySelector("#age").value = age;
  document.querySelector("#email").value = email;

  //editStudent(studentId);
};

let editStudent = async (studentId) => {
  //console.log(studentId);
  let nameInput = document.querySelector("#name").value;
  let ageInput = document.querySelector("#age").value;
  let emailInput = document.querySelector("#email").value;

  let student = {
    name: nameInput,
    age: ageInput,
    email: emailInput,
  };

  let studentJson = JSON.stringify(student);

  await axios.put(`http://localhost:3000/students/${studentId}`, studentJson);
};

let btnAdd = document.querySelector("#add-student");
btnAdd.addEventListener("click", () => {
  addStudent();
});

let btnEdit = document.querySelector("#edit-student");
btnEdit.addEventListener("click", async () => {
  if (!currentEditId) {
    alert("Vui lòng chọn một sinh viên để sửa!");
    return;
  }

  let nameInput = document.querySelector("#name").value;
  let ageInput = document.querySelector("#age").value;
  let emailInput = document.querySelector("#email").value;

  let updatedStudent = {
    name: nameInput,
    age: ageInput,
    email: emailInput,
  };

  await axios.put(
    `http://localhost:3000/students/${currentEditId}`,
    updatedStudent
  );

  alert("Cập nhật thành công!");
  currentEditId = null; // Reset ID sau khi cập nhật
  fetchData(); // Load lại dữ liệu
});

fetchData();
