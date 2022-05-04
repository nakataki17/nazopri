import csv
import json

jsonDic = dict()
with open("questions.csv",encoding="UTF-8") as f:
  reader = csv.reader(f)
  for n,row in enumerate(reader):
    if n == 0:
      continue
    courseName,imgInd,questionInd,time,fileName = row
    if "コース名" in courseName:continue
    if courseName not in jsonDic:
      jsonDic[courseName] = dict()
    if imgInd not in jsonDic[courseName]:
      jsonDic[courseName][imgInd] = dict()
    jsonDic[courseName][imgInd] = {"問題番号":questionInd, "制限時間":time, "ファイル名":fileName,}
    print(fileName)

enc = json.dumps(jsonDic,indent=2,ensure_ascii=False)
with open("questions.json",encoding="UTF-8",mode="w") as f:
  f.write(enc)
#できるデータ構造:{CourseName:{imgid:{time...}}}
