# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# ☁️ SkyChat — Cloud-Based Real-Time Chat Application

**SkyChat** is a modern, full-stack **real-time chat web application** built with a **serverless architecture** on AWS and a responsive **React.js frontend**.  
It enables authenticated users to communicate instantly through WebSockets with messages securely stored in DynamoDB — no traditional servers required.

---

## 🚀 Project Overview

SkyChat is designed to demonstrate **real-world cloud engineering**, **scalability**, and **modern app design**.  
It provides a seamless chat experience powered by AWS-managed services, offering high availability, fault tolerance, and near-zero maintenance.

Users can register, verify their emails, log in, and participate in live chat rooms — all in real time.  
The app combines **cloud-native services** with a sleek **React UI**, making it a complete end-to-end product.

---

## 🎯 Key Features

- 🔐 **User Authentication** — Managed through **AWS Cognito** (sign-up, login, email verification).  
- ⚡ **Real-Time Messaging** — Instant message exchange via **WebSockets** using **API Gateway + Lambda**.  
- ☁️ **Serverless Backend** — Entire backend logic built with **AWS Lambda**, no EC2 or manual servers.  
- 💬 **Persistent Storage** — Chat messages and active connections stored in **DynamoDB**.  
- 🧑‍💻 **Modern UI** — Built with **React.js**, responsive across desktop and mobile.  
- 🌍 **Global Access** — Frontend hosted on **S3** and optionally accelerated with **CloudFront CDN**.  
- 🔒 **Security First** — All traffic and credentials managed securely using AWS IAM and Cognito tokens.

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js, HTML, CSS, JavaScript |
| Authentication | AWS Cognito |
| Messaging | AWS API Gateway (WebSocket) |
| Compute Logic | AWS Lambda (Node.js) |
| Database | Amazon DynamoDB |
| Hosting | Amazon S3, CloudFront |
| Permissions | AWS IAM Roles & Policies |
