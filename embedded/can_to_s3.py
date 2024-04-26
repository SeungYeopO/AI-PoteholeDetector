import cv2
import boto3
import subprocess
from datetime import datetime
from pathlib import Path
import os
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

# 환경 변수에서 값 읽기
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_DEFAULT_REGION = os.getenv("AWS_DEFAULT_REGION")
BUCKET_NAME = os.getenv("BUCKET_NAME")
FFMPEG_PATH = os.getenv("FFMPEG_PATH")

def capture_video(duration):
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Cannot open camera")
        exit()

    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    print(f"Applied Resolution: {width}x{height}")

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    filename = datetime.now().strftime("%Y%m%d_%H%M%S") + ".mp4"
    out = cv2.VideoWriter(filename, fourcc, 29.0, (width, height))

    start_time = datetime.now()
    while (datetime.now() - start_time).seconds < duration:
        ret, frame = cap.read()
        if not ret:
            break
        out.write(frame)

    cap.release()
    out.release()
    return filename

def convert_to_hls(input_file):
    output_dir = input_file.rsplit('.', 1)[0]
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    subprocess.run([
        FFMPEG_PATH,
        '-i', input_file,
        '-profile:v', 'baseline',
        '-level', '3.0',
        '-s', '1920x1080',
        '-start_number', '0',
        '-hls_time', '10',
        '-hls_list_size', '0',
        '-f', 'hls',
        output_dir + '/index.m3u8'
    ], check=True)
    return output_dir

def upload_to_s3(hls_folder, bucket_name, s3_folder):
    client = boto3.client('s3',
                          aws_access_key_id=AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                          region_name=AWS_DEFAULT_REGION
                          )
    for file_path in Path(hls_folder).glob('**/*'):
        if file_path.is_file():
            s3_key = f"{s3_folder}/{file_path.name}"
            client.upload_file(
                str(file_path), BUCKET_NAME, s3_key,
                ExtraArgs={'ContentType': 'application/x-mpegURL' if file_path.suffix == '.m3u8' else 'video/MP2T'}
            )
    print(f"Files uploaded successfully to folder: {s3_folder}")

if __name__ == "__main__":
    video_file = capture_video(10)
    hls_folder = convert_to_hls(video_file)
    s3_folder = Path(video_file).stem
    upload_to_s3(hls_folder, BUCKET_NAME, s3_folder)
