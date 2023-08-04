# DocuSearch - AI-Driven Document Search and Retrieval System
 DocuSearch is an AI-powered document search and retrieval system that allows users to efficiently search for and retrieve relevant document chunks based on their queries. The system leverages pre-trained NLP models and similarity search techniques to provide accurate and fast retrieval of information from a large collection of documents.

# Features
User-friendly web interface for submitting document retrieval queries.
AI-powered processing of user queries using HuggingFace Transformers.
Efficient document retrieval using Milvus, an open-source vector database.
Support for chunking large documents to optimize retrieval performance.
Scalable deployment with GPU acceleration on Nutanix Kubernetes Engine (NKE) Cluster.

# Tech Stack
Frontend: Next Js, Axios
Backend API: Flask, Hugging Face Transformers, PyTorch
Document Retrieval Engine: Milvus, Python SDK for Milvus
Container Orchestration: Kubernetes, Docker
GPU Acceleration: Nvidia P40 GPUs
Database: PostgreSQL or MongoDB
Load Balancer: Nginx or HAProxy
Cloud Platform: Nutanix Cloud Platform (NCP), AWS/GCP/Azure (optional)
Monitoring and Logging: Prometheus, Grafana, ELK Stack
Testing: PyTest or unit test
Documentation: Sphinx or MkDocs

# Prerequisites
Docker is installed on the system for containerization.
NVIDIA GPU drivers and CUDA toolkit for GPU acceleration (if using Nvidia P40 GPUs).
