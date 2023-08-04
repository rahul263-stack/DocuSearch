import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [response, setResponse] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [queryLoading, setQueryLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileProcessing, setFileProcessing] = useState(false);
  const [fileProcessed, setFileProcessed] = useState(false);

  const handleFileUpload = async (event) => {
    event.preventDefault();
    setUploadLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    const uploadResponse = await axios.post('http://10.55.61.41/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      }
    });
  
    console.log(uploadResponse.data);
  
    // Set uploadLoading to false and uploadProgress to 100 when the upload request finishes,
    // regardless of the last value of uploadProgress.
    setUploadLoading(false);
    setUploadProgress(100);
    setFileProcessing(true);
  
    // Checking if filename exists and includes the successful upload message
    if(uploadResponse.data.filename && uploadResponse.data.filename.includes("successfully uploaded and processed")) {
      setFileProcessing(false);
      setFileProcessed(true);
    }
  }
  
  const onSubmit = async (data) => {
    setQueryLoading(true);
    setFileProcessed(false); // clear file processed message
    try {
      const queryResponse = await axios.post(`http://10.55.61.41/query?query=${data.query}`);
      console.log(queryResponse.data);
      setResponse(queryResponse.data.response);
    } catch (error) {
      console.error(error);
    }
    setQueryLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl text-center mb-2">Query your documents with LLMs on Nutanix</h1>
      <h2 className="text-xl text-center mb-6">Powered by Nutanix, Langchain, Milvus, Next.JS and FastAPI</h2>
      <div className="flex justify-between items-center space-x-4 mb-6">
        <img src="/nutanix.png" alt="Nutanix" className="object-cover h-24"/>
        <img src="/langchain.png" alt="Langchain" className="object-cover h-16"/>
        <img src="/milvus.svg" alt="Milvus" className="object-cover h-16"/>
        <img src="/next.svg" alt="Next.js" className="object-cover h-12"/>
        <img src="/fastapi.png" alt="FastAPI" className="object-cover h-16"/>
      </div>
      <div className="p-6 bg-white border-b border-gray-200 flex-grow">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 flex-grow">
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload PDF</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mt-1 block w-full"/>
            <button disabled={!file} onClick={handleFileUpload} className={`mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${file ? 'bg-green-600 hover:bg-green-700' : 'bg-green-200 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}>Upload</button>
            {uploadLoading && <div className="text-lg mt-4">Uploading<span className="dot-ellipsis dot-height">...</span></div>}
            {uploadLoading && 
              <div className="h-2 w-full bg-gray-200 mt-2">
                <div style={{width: `${uploadProgress}%`}} className="h-full bg-blue-500"></div>
              </div>
            }
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Enter your query below:</label>
            <input {...register('query', { required: true })} className="mt-1 block w-full border border-gray-300 rounded-md"/>
            {errors.query && <span className="text-red-500 text-sm">This field is required</span>}
            <button type="submit" disabled={queryLoading} className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${queryLoading ? 'bg-indigo-200 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>Submit</button>
          </div>

          {fileProcessing && <div className="text-lg mt-4">Processing File<span className="dot-ellipsis dot-height">...</span></div>}
          {fileProcessed && <div className="text-lg mt-4">File has been successfully uploaded and processed.</div>}
          {queryLoading && <div className="text-lg mt-4">Thinking<span className="dot-ellipsis dot-height">...</span></div>}
          <div className="mt-4 flex-grow">
            {response && <textarea readOnly value={response.result.split("\\n").join("\n")} className="w-full h-auto min-h-[200px] max-h-150 border border-gray-300 rounded-md overflow-auto" cols="100"/>}
          </div>
        </form>
      </div>

      <style jsx>{`
        .dot-height {
          height: 1em;
          position: relative;
        }
        .dot-ellipsis::before {
          content: '.';
          position: absolute;
          left: 0;
          width: 1em;
          text-align: center;
          animation: ellipsis 1s infinite;
        }
        .dot-ellipsis::after {
          content: '..';
          position: absolute;
          left: 0;
          width: 1em;
          text-align: center;
          animation: ellipsis 1s infinite 0.5s;
        }
        @keyframes ellipsis {
          0% { transform: scale(0); opacity: 0; }
          20% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
