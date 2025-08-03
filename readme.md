# this project is a community for muslim people that lives in usa

## base url

https://muslim-community-backend.onrender.com/api/auth

---

```
 POST /signup/step1
```

### Description

Creates a new user account with essential details.

### note

you cannot create two userswith the same email address.

### Request Body

```json
{
  "email": "admin6@gmail.com",
  "password": "admin12345",
  "fullName": "momo elgazar",
  "confirmPassword": "admin12345",
  "phoneNumber": "198279862"
}
```

### success respose

```
{
  "success": true,
  "userId": "688fcb518f34c4eb0a29265f"
}

```

## Step 2: Complete User Profile

```
POST /signup/step2/:userId

```

### Replace :userId with the actual user ID from Step 1.

## request body

```
{
  "skills": ["media"],
  "customSkills": ["video editing", "storyboarding"],
  "bio": "I'm a creative media specialist.",
  "role": "business owner",
  "agreedToTerms": true
}
```

## sucess response

```
{
  "success": true,
  "message": "Profile completed",
  "user": {
    "_id": "688fcb518f34c4eb0a29265f",
    "fullName": "momo elgazar",
    "email": "admin6@gmail.com",
    "password": "$2b$12$u/xz5Lm1bK2yRWT9KVDCruastN7oxdagzGP9IEmNG.r/ZGu1ew4N2",
    "phoneNumber": "198279862",
    "skills": ["media"],
    "customSkills": ["video editing", "storyboarding"],
    "agreedToTerms": true,
    "createdAt": "2025-08-03T20:49:21.412Z",
    "updatedAt": "2025-08-03T20:50:16.159Z",
    "__v": 1,
    "bio": "I'm a creative media specialist.",
    "role": "business owner"
  }
}
```
