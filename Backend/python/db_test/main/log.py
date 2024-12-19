#!/usr/bin/env python
# -*- coding: utf-8 -*-

from logging import (
    DEBUG,
    Formatter,
    BASIC_FORMAT,
    FileHandler,
    Logger,
    StreamHandler,
    getLogger,
    lastResort,
)
import datetime
import os

lastResort.setFormatter(Formatter(BASIC_FORMAT))
lastResort.setLevel(DEBUG)


def initialize_logger(
  log_name:str='test-root',
  console_log:bool=True,
  file_log:bool=False,
  set_label:int=DEBUG,
  formatter:str='- %(name)s - %(levelname)s: %(message)s , date: %(asctime)s'
)->Logger:
  """
  ログ名などを受け取り、新規Loggerを建てます

  Args:
    log_name (str): ログ名
    console_log (bool): CLIに出力するかどうか
    file_log (bool): fileに出力するかどうか。ファイル名はログ名と実行日付で決められる。
    set_label (str): 最低出力ラベルの設定
    formatter (str): 出力ログのフォーマット文字列
  """
  logger = getLogger(log_name)
  logger.setLevel(set_label)
  logger.propagate = False  # ルートロガーへの伝播を断ち切る

  if console_log: # Output CLI log
    con_handler = StreamHandler()
    con_handler.setFormatter(Formatter(formatter))
    logger.addHandler(con_handler)

  if file_log: # Output File log
    os.makedirs('logs', exist_ok=True)
    fl_handler = FileHandler(filename=f"logs/{log_name.replace(' ','_')}-{datetime.datetime.now().strftime('%Y-%M-%d')}.log", encoding="utf-8")
    fl_handler.setLevel(set_label)
    fl_handler.setFormatter(Formatter(formatter))
    logger.addHandler(fl_handler)

  return logger

def delete_log_files(directory):
  """
  指定されたディレクトリとそのサブディレクトリ内の.logファイルを削除します。
  Args:
      directory (str): 対象のディレクトリパス
  """
  for root, _, files in os.walk(directory):
    for file in files:
      if file.endswith('.log'):
        file_path = os.path.join(root, file)
        os.remove(file_path)
        print(f"Deleted: {file_path}")


if __name__ == "__main__":
  test_log = initialize_logger(log_name='log test',file_log=True)
  test_log.info('info')
  test_log.debug('debug')

  # ディレクトリが存在するか確認
  if os.path.exists('logs'):
    delete_log_files('logs')
