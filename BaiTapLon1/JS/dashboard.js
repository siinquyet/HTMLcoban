// Khôi phục dữ liệu báo từ localStorage nếu có, hoặc tạo mảng rỗng
let newsData = JSON.parse(localStorage.getItem("newsData")) || [];
// Biến lưu chỉ số bài báo đang được chỉnh sửa (-1 nếu không chỉnh sửa)
let editIndex = -1;

// Hàm cập nhật localStorage
function updateLocalStorage() {
    localStorage.setItem("newsData", JSON.stringify(newsData));
}

// Hàm render bảng danh sách báo
function renderNewsList() {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = "";
    newsData.forEach((news, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${news.title}</td>
            <td>${news.category}</td>
            <td>${news.featured == 1 ? 'Có' : 'Không'}</td>
            <td>
                <button class="btn btn-warning" onclick="editNews(${index})">Sửa</button>
                <button class="btn btn-danger" onclick="deleteNews(${index})">Xóa</button>
            </td>
        `;
        newsList.appendChild(row);
    });
}

// Xử lý form thêm/sửa báo
const newsForm = document.getElementById('newsForm');
newsForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Lấy giá trị từ form
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const category = document.getElementById('category').value;
    const featured = document.getElementById('featured').value;
    // Xử lý file upload ảnh
    const imageInput = document.getElementById('imageUpload');
    const imageFile = imageInput.files[0];

    

    // Hàm lưu báo, nhận vào chuỗi Base64 của ảnh (hoặc rỗng nếu không có)
    function saveNews(imageData) {
        const news = {
            title: title,
            content: content,
            category: category,
            featured: featured,
            image: imageData,  // Chuỗi Base64 nếu có, hoặc "" nếu không có
            publishedDate: new Date()  // Lưu ngày đăng của bài mới
        };

        if(editIndex >= 0) {
            // Nếu đang chỉnh sửa, cập nhật lại báo
            newsData[editIndex] = news;
            editIndex = -1;
        } else {
            // Thêm báo mới
            newsData.push(news);
        }
        updateLocalStorage();
        renderNewsList();
        newsForm.reset();
    }

    // Nếu có file upload ảnh, chuyển đổi sang Base64
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            saveNews(imageData);
        };
        reader.readAsDataURL(imageFile);
    } else {
        // Nếu không có ảnh, gọi hàm saveNews với chuỗi rỗng
        saveNews("");
    }
});

// Hàm chỉnh sửa báo: điền dữ liệu đã lưu vào form
function editNews(index) {
    const news = newsData[index];
    document.getElementById('title').value = news.title;
    document.getElementById('content').value = news.content;
    document.getElementById('category').value = news.category;
    document.getElementById('featured').value = news.featured;
    // Lưu ý: Input file không thể được đặt giá trị bằng JS vì lý do bảo mật.
    editIndex = index;
}

// Hàm xóa báo
function deleteNews(index) {
    if(confirm("Bạn có chắc muốn xóa bài báo này?")) {
        newsData.splice(index, 1);
        updateLocalStorage();
        renderNewsList();
    }
}

// Render danh sách báo khi load trang
renderNewsList();