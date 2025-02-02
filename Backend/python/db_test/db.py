import os
import sys

sys.path.append("../common")
import time
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
def setup_db_connection(db_setting: DB_SET_TYPE = DB_DEFAULT_SETTING) -> MySQLConnection:
  """db接続を新規で行う."""
  try:
    return db.connect(**db_setting)
  except Exception as error:
    logger.error(f"DB Connection Error. time sleep and try again... ERROR:{error}")
    time.sleep(5)
    return setup_db_connection(db_setting)


def get_thread_id() -> int:
  return os.getpid()


def multi_sql_execute() -> None:
  """マルチプロセスとして処理中に、SQLへアクセスする."""
  id_ary: [Any] = [0, 1, 2, 3, 4, 5, 6, 7]
  p = Pool(processes=2)
  result = p.map(do_something, id_ary)
  p.close()
  print(type(result), result, "".join(map(str, result)))


def do_something(x: Any) -> None:
  print(x)
  return x


# ----------------------------------
# main
# ----------------------------------
if __name__ == "__main__":
  # multi_sql_execute()
  c = setup_db_connection()
  cursor = c.cursor()
  cursor.execute("select * from learning.test;")
  for row in cursor.fetchall():
    print(row)
  cursor.close()
  c.close()


# ----------------------------------
# TODO
# ----------------------------------
# sql_execute new conn or current conn and logging and get objective cur
# multi sql execute


# make
# setup db
# start mysql ?
# migrate table
