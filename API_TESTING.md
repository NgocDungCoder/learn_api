# Hướng dẫn Test API Users

## Cách 1: Sử dụng cURL (Command Line)

### 1. Tạo user mới (POST)
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Nguyễn Văn A\",\"email\":\"nguyenvana@example.com\",\"age\":25}"
```

**Response mẫu:**
```json
{
  "id": "uuid-here",
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "age": 25,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 2. Lấy danh sách users (GET)
```bash
# Lấy tất cả users
curl http://localhost:3000/users

# Lấy với pagination
curl "http://localhost:3000/users?page=1&limit=10"

# Tìm kiếm users
curl "http://localhost:3000/users?search=Nguyễn"
```

**Response mẫu:**
```json
{
  "data": [
    {
      "id": "uuid-here",
      "name": "Nguyễn Văn A",
      "email": "nguyenvana@example.com",
      "age": 25,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### 3. Lấy user theo ID (GET)
```bash
curl http://localhost:3000/users/{id}
```
Thay `{id}` bằng ID thực tế của user (lấy từ response khi tạo user)

### 4. Cập nhật user (PATCH)
```bash
curl -X PATCH http://localhost:3000/users/{id} \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Nguyễn Văn B\",\"age\":26}"
```

### 5. Xóa user (DELETE)
```bash
curl -X DELETE http://localhost:3000/users/{id}
```

---

## Cách 2: Sử dụng Postman / Insomnia

### Setup:
1. Mở Postman hoặc Insomnia
2. Tạo collection mới tên "Users API"

### Các requests cần tạo:

#### 1. POST - Create User
- **Method:** POST
- **URL:** `http://localhost:3000/users`
- **Headers:**
  - `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "age": 25
}
```

#### 2. GET - Get All Users
- **Method:** GET
- **URL:** `http://localhost:3000/users?page=1&limit=10&search=`

#### 3. GET - Get User By ID
- **Method:** GET
- **URL:** `http://localhost:3000/users/:id`
- Thay `:id` bằng ID thực tế

#### 4. PATCH - Update User
- **Method:** PATCH
- **URL:** `http://localhost:3000/users/:id`
- **Headers:**
  - `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "name": "Nguyễn Văn B",
  "age": 26
}
```

#### 5. DELETE - Delete User
- **Method:** DELETE
- **URL:** `http://localhost:3000/users/:id`

---

## Cách 3: Sử dụng HTTP Client trong VS Code

1. Cài extension **REST Client** trong VS Code
2. Tạo file `test.http` hoặc `api.http`
3. Viết các requests như sau:

```http
### Tạo user mới
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "age": 25
}

### Lấy danh sách users
GET http://localhost:3000/users?page=1&limit=10

### Lấy user theo ID (thay {id} bằng ID thực tế)
GET http://localhost:3000/users/{id}

### Cập nhật user
PATCH http://localhost:3000/users/{id}
Content-Type: application/json

{
  "name": "Nguyễn Văn B",
  "age": 26
}

### Xóa user
DELETE http://localhost:3000/users/{id}
```

4. Click vào "Send Request" phía trên mỗi request để test

---

## Cách 4: Sử dụng Browser (chỉ cho GET requests)

Mở browser và truy cập:
- `http://localhost:3000/users` - Lấy danh sách users
- `http://localhost:3000/users/{id}` - Lấy user theo ID

---

## Test Cases để kiểm tra

### ✅ Test Cases thành công:

1. **Tạo user hợp lệ:**
   - Name, email hợp lệ
   - Age trong khoảng 0-120

2. **Lấy danh sách:**
   - Pagination hoạt động
   - Search hoạt động

3. **Cập nhật user:**
   - Chỉ cập nhật các field được gửi lên
   - Email không trùng với user khác

### ❌ Test Cases lỗi (để kiểm tra validation):

1. **Tạo user với email trùng:**
```json
{
  "name": "User 2",
  "email": "nguyenvana@example.com"  // Email đã tồn tại
}
```
→ Phải trả về lỗi 409 Conflict

2. **Tạo user thiếu required fields:**
```json
{
  "name": "User 3"
  // Thiếu email
}
```
→ Phải trả về lỗi 400 Bad Request

3. **Tạo user với email không hợp lệ:**
```json
{
  "name": "User 4",
  "email": "invalid-email"
}
```
→ Phải trả về lỗi 400 Bad Request

4. **Lấy user không tồn tại:**
```
GET http://localhost:3000/users/non-existent-id
```
→ Phải trả về lỗi 404 Not Found

5. **Cập nhật user không tồn tại:**
```
PATCH http://localhost:3000/users/non-existent-id
```
→ Phải trả về lỗi 404 Not Found

---

## Lưu ý

- Đảm bảo server đang chạy (`yarn start:dev`)
- Thay `{id}` bằng ID thực tế khi test
- Kiểm tra response status codes:
  - `200` - Success
  - `201` - Created
  - `204` - No Content (DELETE)
  - `400` - Bad Request (validation error)
  - `404` - Not Found
  - `409` - Conflict (email trùng)

