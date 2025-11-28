# Hướng dẫn Setup và Chạy Project

## 📋 Bước 1: Cài đặt MongoDB Local

### Option 1: Sử dụng Docker (Khuyến nghị - Dễ nhất)

```bash
# Chạy MongoDB container
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Kiểm tra container đã chạy chưa
docker ps

# Nếu cần xem logs
docker logs mongodb
```

### Option 2: Cài đặt MongoDB trực tiếp

1. Download MongoDB Community Edition từ: https://www.mongodb.com/try/download/community
2. Cài đặt và start MongoDB service
3. MongoDB sẽ chạy mặc định tại port `27017`

### Option 3: Sử dụng MongoDB Atlas (Cloud - Free)

1. Đăng ký tại: https://www.mongodb.com/cloud/atlas
2. Tạo cluster miễn phí
3. Lấy connection string và cập nhật vào file `.env`

---

## 📋 Bước 2: Cấu hình Environment Variables

File `.env` đã được tạo với cấu hình mặc định:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/learnapi
```

**Lưu ý quan trọng về Database:**
- MongoDB **tự động tạo database** khi bạn kết nối lần đầu tiên
- Tên database được lấy từ phần cuối của URI: `learnapi`
- Nếu muốn tạo database với tên khác, chỉ cần thay đổi tên trong URI:
  - `mongodb://localhost:27017/mynewdb` → Tạo database `mynewdb`
  - `mongodb://localhost:27017/testdb` → Tạo database `testdb`

---

## 📋 Bước 3: Cài đặt Dependencies

```bash
# Di chuyển vào thư mục project
cd learnapi

# Cài đặt dependencies (nếu chưa cài)
yarn install
```

---

## 📋 Bước 4: Chạy Server

```bash
# Development mode (tự động reload khi code thay đổi)
yarn start:dev
```

Sau khi server chạy thành công, bạn sẽ thấy:
```
🚀 Server đang chạy tại http://localhost:3000
📚 Swagger API Documentation: http://localhost:3000/api
```

---

## 📋 Bước 5: Truy cập Swagger UI

1. Mở browser và truy cập: **http://localhost:3000/api**
2. Bạn sẽ thấy Swagger UI với tất cả các API endpoints
3. Có thể test API trực tiếp từ Swagger UI

---

## 📋 Bước 6: Kiểm tra Database đã được tạo

### Cách 1: Sử dụng MongoDB Compass (GUI Tool)

1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Kết nối với: `mongodb://localhost:27017`
3. Bạn sẽ thấy database `learnapi` đã được tạo tự động
4. Collection `users` sẽ được tạo khi bạn tạo user đầu tiên qua API

### Cách 2: Sử dụng MongoDB Shell (mongosh)

```bash
# Kết nối MongoDB
mongosh

# Hoặc nếu dùng Docker
docker exec -it mongodb mongosh

# Liệt kê tất cả databases
show dbs

# Chuyển sang database learnapi
use learnapi

# Xem các collections
show collections

# Xem dữ liệu trong collection users
db.users.find().pretty()
```

### Cách 3: Kiểm tra qua API

1. Mở Swagger UI: http://localhost:3000/api
2. Test endpoint `POST /users` để tạo user đầu tiên
3. Database và collection sẽ được tạo tự động

---

## 🔧 Troubleshooting

### Lỗi: Cannot connect to MongoDB

**Nguyên nhân:** MongoDB chưa chạy hoặc connection string sai

**Giải pháp:**
```bash
# Kiểm tra MongoDB đã chạy chưa (Docker)
docker ps | grep mongodb

# Nếu chưa chạy, start lại
docker start mongodb

# Hoặc kiểm tra MongoDB service (nếu cài trực tiếp)
# Windows: Services → MongoDB
# Linux/Mac: sudo systemctl status mongod
```

### Lỗi: Port 3000 đã được sử dụng

**Giải pháp:**
- Thay đổi PORT trong file `.env`: `PORT=3001`
- Hoặc kill process đang dùng port 3000:
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -ti:3000 | xargs kill -9
  ```

### Swagger không hiển thị

**Nguyên nhân:** Server chưa start hoặc có lỗi

**Giải pháp:**
- Kiểm tra console logs để xem lỗi
- Đảm bảo đã cài đủ dependencies: `yarn install`
- Kiểm tra port có bị chiếm không

---

## 📝 Tạo Database mới trong MongoDB

### Cách 1: Thay đổi trong file .env (Khuyến nghị)

Chỉ cần thay đổi tên database trong URI:

```env
# Tạo database mới tên "myapp"
MONGODB_URI=mongodb://localhost:27017/myapp

# Tạo database mới tên "production"
MONGODB_URI=mongodb://localhost:27017/production
```

Sau đó restart server, database sẽ được tạo tự động khi kết nối.

### Cách 2: Tạo thủ công qua MongoDB Shell

```bash
# Kết nối MongoDB
mongosh

# Tạo database mới (chỉ cần use là đủ, MongoDB tự tạo khi có dữ liệu)
use mynewdb

# Tạo collection và insert document để database thực sự được tạo
db.test.insertOne({ name: "test" })

# Kiểm tra database đã được tạo
show dbs
```

---

## ✅ Checklist

- [ ] MongoDB đã được cài đặt và chạy
- [ ] File `.env` đã được tạo với cấu hình đúng
- [ ] Dependencies đã được cài đặt (`yarn install`)
- [ ] Server đã chạy thành công (`yarn start:dev`)
- [ ] Swagger UI có thể truy cập tại http://localhost:3000/api
- [ ] Database đã được tạo tự động khi kết nối

---

## 🎯 Test API nhanh

1. Mở Swagger UI: http://localhost:3000/api
2. Tìm endpoint `POST /users`
3. Click "Try it out"
4. Điền thông tin:
   ```json
   {
     "name": "Nguyễn Văn A",
     "email": "nguyenvana@example.com",
     "age": 25
   }
   ```
5. Click "Execute"
6. Nếu thành công, database và collection đã được tạo!

