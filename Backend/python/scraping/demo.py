#!/usr/bin/env python
# -*- coding: utf-8 -*-

#個別記入
url = 'https://bangumi.org/talents/233800'

"""
imports
"""
from bs4 import BeautifulSoup
import os
import datetime
import csv
import re
# selenium and drivers
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

"""
local functions
"""

def replace_spaces_with_zeros(text):
  return re.sub(r'(\s|\n)+', ' ', text)

"""
Logic
"""

# 情報取得
print(url)

# headless browser
options = webdriver.ChromeOptions()
options.add_argument('--headless=new')
driver = webdriver.Chrome(options=options)

# set maximum time to load the web page in seconds
driver.implicitly_wait(5)
# load the web page
driver.get(url)

html = driver.page_source.encode('utf-8')
soup = BeautifulSoup(html,'html.parser')
print(soup.title.text)
driver.quit()

# データ取得
tv_programs = soup.select('#left_column .program_list_convertible > li')
# print(len(tv_programs))

# 文字列処理
result = []
for prob in tv_programs:
  tv_title = prob.select_one(".program_title")
  tv_date  = prob.select_one(".program_supplement")
  tv_genre = prob.select_one(".tag p")

  title = replace_spaces_with_zeros(tv_title.text) if tv_title else ""
  date  = replace_spaces_with_zeros(tv_date.text) if tv_date else ""
  genre = replace_spaces_with_zeros(tv_genre.text) if tv_genre else ""
  if(tv_title):
    result.append([title,date,genre])
print(f"合計 {len(result)}件")

# 書き込み
with open('result.csv', 'w', encoding="utf-8", newline='') as myfile:
  writer = csv.writer(myfile)
  writer.writerow(["番組名","放送日","ジャンル"])
  for r in result:
    writer.writerow(r)

print("done")
