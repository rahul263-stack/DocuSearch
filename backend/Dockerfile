FROM nvidia/cuda:12.1.1-devel-rockylinux9
RUN dnf -y update
RUN dnf -y install python3 python3-devel.x86_64 python3-pip git gcc which g++
WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
COPY ./download_model.py /app/download_model.py
COPY ./download_instructor.py /app/download_instructor.py
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu121
RUN git clone https://github.com/PanQiWei/AutoGPTQ
RUN pip install /app/AutoGPTQ
RUN mkdir models
RUN python3 /app/download_model.py TheBloke/Manticore-13B-GPTQ
COPY ./.env /app/.env
RUN python3 /app/download_instructor.py
ADD . /app
CMD ["uvicorn", "backend:app", "--host", "0.0.0.0", "--port", "80"]
