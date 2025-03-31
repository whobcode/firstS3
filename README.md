# firstS3
utilizing was to store and host static website for a friend's business

# 📦 Static Website with AWS S3 Form Submission (JSON Storage)

This project demonstrates how to build a static website hosted on **Amazon S3** that accepts form submissions and stores the data as `.json` files in the same S3 bucket.

## 🔧 Features

- Collects:
  - Full Name
  - Phone Number
  - Address
  - Description of Services Needed
- Saves each submission as a uniquely named `.json` object in your S3 bucket

---

## 🌐 Tech Stack

- **Frontend**: HTML, JavaScript
- **Backend**: AWS SDK via JavaScript (Lambda or direct browser SDK)
- **Storage**: Amazon S3

---

## 📁 Project Structure

```bash
project-root/
│
├── index.html          # Static form page
├── script.js           # Handles form and uploads JSON to S3
└── style.css           # Optional styling
└── info.json           # uploaded JSON
```
# 🚀 Steps to Deploy

## 1. Create an S3 Bucket

- Log in to **AWS Console**
- Navigate to **S3 → Create bucket**
- **Uncheck** `"Block all public access"` *(for static site hosting)*
- Under **Properties**, enable **Static website hosting**
- Set **Index document** to `index.html`

## 2. Upload Your Site Files

- Upload the following files to your bucket:
  - `index.html`
  - `script.js`
  - *(Optional)* `style.css`

## 3. Add CORS Policy to Your Bucket

- Go to **Permissions → CORS configuration**
- Add the following configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```
## 🔑 IAM Permissions

If you're using **AWS SDK** in the browser or a **Lambda backend**, ensure the IAM user/role has this **S3 policy**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject"],
      "Resource": "arn:aws:s3:::your-bucket-name/form-submissions/*"
    }
  ]
}
```
---

## 🛡️ Optional Enhancements

- 🔒 Add CAPTCHA or field validation  
- 🧠 Use AWS Lambda as a proxy for enhanced security  
- 📩 Notify via **SNS** or **email** on submission  
- 🎨 Add success/failure animations for better UX  

---

## 📬 Support & Troubleshooting

If you run into issues, make sure:

- ✅ Your **S3 bucket policy** allows `s3:PutObject`  
- ✅ **CORS configuration** is correctly set  
- ✅ Your **Cognito Identity Pool** is public or properly authorized  
- ✅ All AWS resources (**S3**, **IAM**, **Cognito**) are in the same **region**
