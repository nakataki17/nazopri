import csv
import json

jsonDic = dict()
with open("questions.csv",encoding="UTF-8") as f:
  reader = csv.reader(f)
  for row in reader:
    courseName,imgInd,questionInd,timeLimit,fileName = row
    if courseName=="コース名":continue
    if courseName not in jsonDic:
      jsonDic[courseName] = dict()
    jsonDic[courseName][imgInd] = {"問題番号":questionInd,"制限時間":timeLimit,"ファイル名":fileName,}

enc = json.dumps(jsonDic,indent=2,ensure_ascii=False)
with open("questions.json",encoding="UTF-8",mode="w") as f:
  f.write(enc)
#できるデータ構造:{CourseName:{imgid:{time...}}}