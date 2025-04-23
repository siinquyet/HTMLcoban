 // Hàm lấy tham số từ URL theo tên key
 function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Lấy giá trị tham số "cat" từ URL (ví dụ: ?cat=Pháp Luật)
  const categoryParam = getQueryParam("cat");

  // Cập nhật tiêu đề trang dựa trên thể loại
  document.getElementById("categoryTitle").textContent =
    categoryParam ? `Báo thuộc thể loại: ${categoryParam}` : "Thể loại không xác định";

  // Lấy dữ liệu bài báo lưu trong localStorage (định dạng mảng đối tượng)
  const newsData = JSON.parse(localStorage.getItem("newsData")) || [];

  // Lọc các bài báo theo thể loại bằng phép so sánh phân biệt chữ hoa/chữ thường
  const categoryNews = newsData.filter(news => news.category === categoryParam);

  const articlesList = document.getElementById("articlesList");
  if (categoryNews.length === 0) {
    articlesList.innerHTML = "<p>Không có bài báo nào thuộc thể loại này.</p>";
  } else {
    categoryNews.forEach(news => {
      // Tìm chỉ số thực của bài báo trong mảng để có thể tạo liên kết đến trang chi tiết
      let actualIndex = newsData.findIndex(n => n === news);
      const articleDiv = document.createElement("div");
      articleDiv.className = "article";
      const imageHtml = news.image
        ? `<a href="news-detail.html?id=${actualIndex}"><img src="${news.image}" alt="${news.title}"></a>`
        : "";
      articleDiv.innerHTML = `
        ${imageHtml}
        <h2><a href="news-detail.html?id=${actualIndex}">${news.title}</a></h2>
        <p>${news.content.substring(0, 150)}...</p>
      `;
      articlesList.appendChild(articleDiv);
    });
  }