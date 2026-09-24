FROM nikolaik/python-nodejs:python3.14-nodejs22-slim

ARG TARGETARCH

ENV PYTHONUNBUFFERED=1
ENV NPM_CONFIG_LEGACY_PEER_DEPS=true

# System + Chrome dependencies
RUN apt-get update && apt-get install -y \
    wget \
    gnupg2 \
    lsof \
    apt-transport-https \
    ca-certificates \
    x11-utils \
    xdg-utils \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

# Chrome
RUN apt-get update && \
    wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb && \
    rm -rf /var/lib/apt/lists/*

ENV CHROME_BIN=/usr/bin/google-chrome

# Kontrola wersji
RUN node --version && npm --version && python --version

COPY requirements.txt .

RUN python -m pip install -r requirements.txt

RUN mkdir -p /app
WORKDIR /app

COPY . /app

# Fix starego frontendu React 17
RUN sed -i 's/"cogo-toast-react-17-fix": "latest"/"cogo-toast-react-17-fix": "4.2.7"/' /app/frontend/package.json

RUN python run.py install

EXPOSE 3000
EXPOSE 8000

CMD ["python", "run.py"]
