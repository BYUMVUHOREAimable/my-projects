# 🗣️ Hands-on with Automatic Speech Recognition (ASR)

This repository contains code and resources for a hands-on session exploring **Automatic Speech Recognition (ASR)** using state-of-the-art models like OpenAI Whisper and Faster-Whisper.

## 📌 What You'll Learn
- How ASR works: from audio input to transcribed text
- The role of preprocessing, tokenization, and decoding
- Running ASR models locally on audio files
- Understanding model files (e.g., tokenizer, config, model.bin)
- Introduction to Hugging Face and language-specific fine-tuning

## 📂 Contents
| File | Description |
|------|-------------|
| `01_audio_to_text_file.py` | Transcribes an audio file to a `.txt` file using Whisper or Faster-Whisper |
| `requirements.txt` | Python dependencies for setting up your environment |
| `sample1.mp3` | Sample audio file (replace with your own to test) |

## ⚙️ Setup

### Create Virtual Environment
```bash
python -m venv whisper-env
source whisper-env/bin/activate  # On Windows: whisper-env\Scripts\activate# asr
pip freeze > requirements.txt
pip install -r requirements.txt
pip install faster-whisper  # OR whisper via OpenAI
pip install ffmpeg-python
(Optional) Install FFmpeg
	•	macOS: brew install ffmpeg
	•	Linux: sudo apt install ffmpeg
	•	Windows: Download from ffmpeg.org and add to PATH

python 01_audio_to_text_file.py
```
