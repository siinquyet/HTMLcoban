// Lấy dữ liệu bài báo từ localStorage (key: "newsData")
let newsData = JSON.parse(localStorage.getItem("newsData")) || [];

// Hàm lấy giá trị tham số từ URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Render chi tiết bài báo dựa trên id
function renderDetail(newsId) {
  const article = newsData[newsId];
  if (article) {
    // Tiêu đề
    document.getElementById("newsTitle").textContent = article.title;
    // Nội dung: chuyển đổi \n thành <br> để xuống dòng
    document.getElementById("newsContent").innerHTML = article.content.replace(/\n/g, "<br>");
    
    // Hiển thị ảnh nếu có
    if (article.image) {
      document.getElementById("newsImage").innerHTML = `<img src="${article.image}" alt="${article.title}">`;
    } else {
      // Nếu không có ảnh, bạn có thể xóa nội dung cũ (nếu có)
      document.getElementById("newsImage").innerHTML = "";
    }
  } else {
    document.querySelector(".news-detail").innerHTML = "<p>Bài báo không tồn tại hoặc chưa được chọn.</p>";
  }
}

window.addEventListener('DOMContentLoaded', function() {
  const newsId = getQueryParam("id");
  if (newsId !== null) {
    renderDetail(newsId);
  } else {
    document.querySelector(".news-detail").innerHTML = "<p>Không có bài báo nào được chọn.</p>";
  }
});
