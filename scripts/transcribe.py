import os
import openai
import requests
import sys
openai.api_key = ("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")
# audio_file_path = sys.argv[1]

# audio_file = open(audio_file_path, "rb")
# transcript = openai.Audio.transcribe(
#   file=audio_file,
#   model="whisper-1",
#   response_format='srt',
#   prompt=(
#       "hello"
#   )
# )
# print(transcript)
audio_url = "http://hackathon.ambity.ru/hackathon/public/audio/zapis418.mp3"

# Получите аудиофайл по URL
response = requests.get(audio_url)

# Проверьте успешность запроса
if response.status_code == 200:
    # Сохраните аудиофайл на диск
    audio_file_path = "http://hackathon.ambity.ru/hackathon/public/audio/zapis418.mp3"
    with open(audio_file_path, "wb") as audio_file:
        audio_file.write(response.content)

    # Транскрибируйте аудиофайл с использованием OpenAI API
    with open(audio_file_path, "rb") as audio_file:
        transcript = openai.Audio.transcribe(
            file=audio_file,
            model="whisper-1",
            response_format='srt',
            prompt=(
                'I am a programmer. My name is Takuya. '
                'This is a vlog about my app development, tech review, lifehacks, etc. '
                'I have my own product called Inkdrop.'
                'My YouTube channel is called devaslife. '
            )
        )

    print(transcript)

else:
    print(f"Ошибка при получении аудиофайла. Код ответа: {response.status_code}")