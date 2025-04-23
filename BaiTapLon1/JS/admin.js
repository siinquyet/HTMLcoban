// Các thông tin xác thực minh họa (không dùng trong môi trường sản xuất)
const ADMIN_USER = "admin";
const ADMIN_PASS = "123";

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value.trim();

  // Kiểm tra thông tin đăng nhập
  if(usernameInput === ADMIN_USER && passwordInput === ADMIN_PASS) {
    // Nếu đăng nhập thành công, chuyển hướng tới trang quản trị
    window.location.href = "dashboard.html";
  } else {
    // Nếu đăng nhập thất bại, hiển thị thông báo lỗi
    document.getElementById("error-message").textContent = "Tên đăng nhập hoặc mật khẩu không đúng!";
  }
});