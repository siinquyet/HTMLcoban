// Hàm lấy tham số từ URL theo tên key
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Lấy dữ liệu bài báo từ localStorage (dạng mảng đối tượng)
const newsData = JSON.parse(localStorage.getItem("newsData")) || [];

// Lấy id của bài báo chi tiết từ URL (ví dụ: ?id=2)
const idParam = getQueryParam("id");

// Kiểm tra tồn tại bài báo với id này
const articleDetail = newsData[idParam];

if (articleDetail) {
  // Hiển thị bài báo chi tiết
  const newsTitle = document.getElementById("newsTitle");
  newsTitle.textContent = articleDetail.title;
  
  const newsImageContainer = document.getElementById("newsImage");
  if (articleDetail.image) {
    newsImageContainer.innerHTML = `<img src="${articleDetail.image}" alt="${articleDetail.title}" />`;
  }
  
  const newsContent = document.getElementById("newsContent");
  newsContent.textContent = articleDetail.content;
  
  // Lọc các bài báo cùng thể loại (loại trừ bài báo hiện tại)
  const relatedNews = newsData.filter((news, index) => 
    news.category === articleDetail.category && index != idParam
  );
  
  // Hiển thị danh sách bài báo liên quan trong footer
  const articlesList = document.getElementById("articlesList");
  if (articlesList) {
    if (relatedNews.length === 0) {
      articlesList.innerHTML = "<p>Không có bài báo nào cùng thể loại.</p>";
    } else {
      relatedNews.forEach(news => {
        // Lấy chỉ số thực trong mảng để tạo liên kết chính xác
        let actualIndex = newsData.findIndex(n => n === news);
        const imageHtml = news.image 
          ? `<a href="news-detail.html?id=${actualIndex}"><img src="${news.image}" alt="${news.title}" /></a>`
          : "";
        const articleDiv = document.createElement("div");
        articleDiv.className = "article";
        articleDiv.innerHTML = `
          ${imageHtml}
          <div>
            <h2><a href="news-detail.html?id=${actualIndex}">${news.title}</a></h2>
            <p>${news.content.substring(0, 150)}...</p>
          </div>
        `;
        articlesList.appendChild(articleDiv);
      });
    }
  }
} else {
  // Nếu không tìm thấy bài báo, hiển thị thông báo lỗi
  document.querySelector(".container").innerHTML = "<p>Bài báo không tồn tại.</p>";
}
