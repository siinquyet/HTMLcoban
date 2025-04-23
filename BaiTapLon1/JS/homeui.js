// Lấy dữ liệu bài báo từ localStorage (key: "newsData")
let newsData = JSON.parse(localStorage.getItem("newsData")) || [];

// Hàm lấy giá trị tham số từ URL (nếu cần sử dụng cho các liên kết khác)
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// --- Các hàm Render cho Trang Chủ ---

// Hiển thị bài báo nổi bật có thuộc tính featured == 1
function renderFeaturedNews() {
  const featuredContainer = document.getElementById('featuredNews');
  const featuredIndex = newsData.findIndex(news => news.featured == 1);
  const featured = newsData[featuredIndex];
  if (featured) {
    featuredContainer.innerHTML = `
      <div class="anhnoibat">
          ${featured.image ? `<a href="../HTML/chitiet.html?id=${featuredIndex}"><img src="${featured.image}" alt="${featured.title}"></a>` : ''}
      </div>
      <div class="featured-content">
          <a href="../HTML/chitiet.html?id=${featuredIndex}">
              <h1>${featured.title}</h1>
              <p>${featured.content.substring(0, 150)}...</p>
          </a>
      </div>
    `;
  } else {
    featuredContainer.innerHTML = `<p>Không có tin nổi bật.</p>`;
  }
}

// Hiển thị mục Hot Trending (3 bài không phải tin nổi bật)
function renderHotTrending() {
  const trendingContainer = document.getElementById('hotTrendingList');
  trendingContainer.innerHTML = "";
  let trending = newsData.filter(news => news.featured != 1).slice(0, 3);
  trending.forEach(news => {
    let actualIndex = newsData.findIndex(n => n === news);
    const article = document.createElement('div');
    article.className = 'baiviet';
    article.innerHTML = `
      <a href="../HTML/chitiet.html?id=${actualIndex}">
        ${news.image ? `<img src="${news.image}" alt="${news.title}">` : ''}
        <h3>${news.title}</h3>
      </a>
    `;
    trendingContainer.appendChild(article);
  });
}

// Hiển thị cột bên trái: Danh sách tin mới nhất (sắp xếp theo ngày xuất bản)
function renderLeftColumn() {
  const leftColumn = document.getElementById('leftColumn');
  leftColumn.innerHTML = `<a href="#"><h2>Mới nhất</h2></a>`;
  let latestNews = [...newsData].sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)).slice(0, 3);
  latestNews.forEach(news => {
    let actualIndex = newsData.findIndex(n => n === news);
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    newsItem.innerHTML = `
      <a href="../HTML/chitiet.html?id=${actualIndex}">
          ${news.image ? `<img src="${news.image}" alt="${news.title}">` : ''}
          <h3>${news.title}</h3>
          <p>${news.content.substring(0, 100)}...</p>
      </a>
    `;
    leftColumn.appendChild(newsItem);
  });
}

// Hiển thị cột bên phải: Các chuyên mục và bài báo tương ứng
function renderRightColumnMultiple() {
  const rightColumn = document.getElementById('rightColumn');
  rightColumn.innerHTML = "";
  const categoriesArray = ["Pháp Luật", "Chính trị", "Giáo dục", "Đời sống", "Thể thao", "Nước ngoài"];
  categoriesArray.forEach(category => {
    const categoryNews = newsData.filter(news => news.category === category);
    if (categoryNews.length > 0) {
      const catSection = document.createElement('div');
      catSection.innerHTML =
        `<a href="category.html?cat=${encodeURIComponent(category)}"><h2>${category}</h2></a>`;
      categoryNews.forEach(news => {
        let actualIndex = newsData.findIndex(n => n === news);
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item luat-news';
        newsItem.innerHTML = `
          <div class="news-text">
              <a href="../HTML/chitiet.html?id=${actualIndex}">
                  <h3>${news.title}</h3>
                  <p>${news.content.substring(0, 50)}...</p>
              </a>
          </div>
          <div class="news-image">
              ${news.image ? `<a href="../HTML/chitiet.html?id=${actualIndex}"><img src="${news.image}" alt="${news.title}"></a>` : ''}
          </div>
        `;
        catSection.appendChild(newsItem);
      });
      rightColumn.appendChild(catSection);
    }
  });
}

// Render toàn bộ giao diện trang chủ
function renderNewsPage() {
  renderFeaturedNews();
  renderHotTrending();
  renderLeftColumn();
  renderRightColumnMultiple();
}

window.addEventListener('DOMContentLoaded', function() {
  renderNewsPage();
});
