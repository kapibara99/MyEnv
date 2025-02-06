import os
import sys

sys.path.append("../common")
import time
import threading

from multiprocessing import Pool
from typing import Any

import mysql.connector as db
from dotenv import load_dotenv
from log import initialize_logger
from mysql.connector.connection import MySQLConnection

# ----------------------------------
# 共通設定
# ----------------------------------
# setup logger
logger = initialize_logger("MariaDB test")
# .envファイルの内容を読み込見込む
load_dotenv()
# setup connection info
DB_SET_TYPE = dict[str, Any]
DB_DEFAULT_SETTING: DB_SET_TYPE = {
  "host": os.environ["DB_HOST_NAME"],
  "user": os.environ["DB_ACCOUNT_NAME"],
  "password": os.environ["DB_ACCOUNT_PASSWORD"],
  "database": "mysql",
  "charset": "utf8mb4",
  "collation": "utf8mb4_unicode_ci",
}


# ----------------------------------
# Functions
# ----------------------------------
def get_thread_id() -> int:
  return threading.get_ident()


def setup_db_connection(
  db_setting: DB_SET_TYPE = DB_DEFAULT_SETTING, index: int = 0
) -> MySQLConnection:
  """db接続を新規で行う."""
  db_max_retry = 3
  try:
    conn = db.connect(**db_setting)
    conn.thread_id = get_thread_id()
  except Exception as error:
    index += 1
    if index > db_max_retry:
      raise
    logger.error(f"DB Connection Error. time sleep and try again[{index}]... ERROR:{error}")
    time.sleep(3)
    return setup_db_connection(db_setting, index)
  return conn


def sql_execute(
  sql: str, connection: MySQLConnection | None = None, dict_cur: bool = False, log: bool = True
) -> None:
  """SQLを実行する共通関数

  ログ出力やConnectionも引数と関数内で管理する

  sql:
    実行するSQL文
  dict_cur:
    True: dict形式で返却する [{'id': 1, 'text': 'aaa'},...]
    False: list形式で返却する [(1, 'aaa'),...]
  log:
    True: ログ出力する
    False: ログ出力しない
  """
  if not connection:
    connection = setup_db_connection()
  cur = connection.cursor(dictionary=dict_cur)
  if log:
    logger.info(f"SQL実行:[{connection.thread_id}] SQL文 => {sql}")
    start = time.time()
  try:
    cur.execute(sql)
  except Exception as error:
    logger.error(f"SQL実行エラー:{error}")
    raise
  if log:
    logger.info(f"SQL実行完了:[{connection.thread_id}] 実行時間:{time.time() - start}")
  return cur.fetchall()


def multi_sql_execute(data_list: list, do_something: Any, processes: int = 2) -> None:
  """マルチプロセスとして、SQLへアクセスする.

  data_list:
    並列実行されるデータ群
  do_something:
    実行する関数
    data_listの各要素に対してdo_somethingを実行される
  processes:
    マルチプロセスの数
  """
  p = Pool(processes=processes)
  result = p.map(do_something, data_list)
  p.close()
  return result


# ----------------------------------
# main
# ----------------------------------
if __name__ == "__main__":
  cur = sql_execute("select * from learning.test;", log=False)
  print(cur)

# ----------------------------------
# TODO
# ----------------------------------
# make
# setup db
# start mysql ?
# migrate table
